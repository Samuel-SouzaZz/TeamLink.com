-- ============================================================================
-- TeamLink — convites de ativação, vínculo de conta e idempotência do webhook
--
-- Rodar com:  npm run db:test        (equivale a `supabase test db`)
-- Exige Docker e a Supabase CLI, contra a instância LOCAL.
--
-- Este arquivo exercita o caminho que acontece **antes** de a aluna ter conta, e
-- por isso não há sessão para simular: quem chama é o servidor. Os testes rodam
-- como dona do schema e atacam as funções de `internal` diretamente, porque é o
-- comportamento delas que precisa estar certo — os privilégios que impedem o
-- navegador de alcançá-las estão verificados em `authorization_test.sql`.
-- ============================================================================

begin;

create extension if not exists pgtap;

select * from no_plan();

-- ─────────────────────────────────────────────────────────────────────────────
-- Fixtures
-- ─────────────────────────────────────────────────────────────────────────────

\set karol_uid  '11111111-1111-1111-1111-111111111111'
\set ana_uid    '22222222-2222-2222-2222-222222222222'
\set extra_uid  '44444444-4444-4444-4444-444444444444'

\set carla_id   'aaaaaaaa-0000-0000-0000-00000000000a'
\set diana_id   'aaaaaaaa-0000-0000-0000-00000000000b'
\set elis_id    'aaaaaaaa-0000-0000-0000-00000000000c'
\set fabi_id    'aaaaaaaa-0000-0000-0000-00000000000d'
\set plan_id    'cccccccc-0000-0000-0000-000000000001'

insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data
)
values
  (:'karol_uid', '00000000-0000-0000-0000-000000000000', 'authenticated',
   'authenticated', 'karol@teste.local', '', now(), now(), now(), '{}', '{}'),
  -- A conta que o Supabase criaria ao aceitar o convite da Carla.
  (:'ana_uid', '00000000-0000-0000-0000-000000000000', 'authenticated',
   'authenticated', 'carla@teste.local', '', now(), now(), now(), '{}', '{}'),
  -- Uma segunda conta, com e-mail que não corresponde a cadastro nenhum.
  (:'extra_uid', '00000000-0000-0000-0000-000000000000', 'authenticated',
   'authenticated', 'ninguem@teste.local', '', now(), now(), now(), '{}', '{}');

update public.user_roles set role = 'admin' where user_id = :'karol_uid';

insert into public.subscription_plans (id, name, price_cents)
values (:'plan_id', 'Mensal', 10000);

-- Cadastros sem conta: é esse o estado de quem vai receber convite.
insert into public.students (id, full_name, email, status)
values
  (:'carla_id', 'Carla Teste', 'carla@teste.local', 'active'),
  (:'diana_id', 'Diana Teste', 'diana@teste.local', 'active'),
  (:'elis_id',  'Elis Teste',  'elis@teste.local',  'active'),
  (:'fabi_id',  'Fabi Teste',  'fabi@teste.local',  'active');

-- ============================================================================
-- Parte 1 — Emissão do convite
-- ============================================================================

select ok(
  (select raw_token from internal.issue_activation_token(
     :'carla_id', :'plan_id', :'karol_uid')) is not null,
  'a administradora emite convite e recebe o token de volta'
);

-- O token devolvido tem 32 bytes em base64url, sem preenchimento: 43 caracteres.
-- Menos que isso significaria entropia menor do que a pretendida.
select ok(
  (select length(raw_token) >= 43 from internal.issue_activation_token(
     :'diana_id', :'plan_id', :'karol_uid')),
  'o token tem pelo menos 43 caracteres, equivalentes a 256 bits'
);

-- Dois convites emitidos em sequência não podem coincidir.
select isnt(
  (select token_hash from internal.student_activation_tokens
   where student_id = :'carla_id'),
  (select token_hash from internal.student_activation_tokens
   where student_id = :'diana_id'),
  'convites diferentes produzem hashes diferentes'
);

-- Nenhuma coluna guarda o token em claro. Este é o teste que garante que um
-- dump do banco não permite ativar conta nenhuma.
select is(
  (select count(*)::int
   from information_schema.columns
   where table_schema = 'internal'
     and table_name = 'student_activation_tokens'
     and column_name in ('token', 'raw_token', 'token_plain')),
  0,
  'a tabela não tem coluna para o token em claro, apenas para o hash'
);

-- O que vai para a auditoria é o id do convite, nunca o token.
select is(
  (select count(*)::int from public.audit_logs
   where action = 'activation_token.issued'),
  2,
  'a emissão é registrada em audit_logs'
);

select ok(
  (select not (metadata ? 'token') and not (metadata ? 'raw_token')
   from public.audit_logs
   where action = 'activation_token.issued'
   limit 1),
  'e o registro de auditoria não carrega o token'
);

-- Um convite ativo por cadastro. Trocar o plano exige revogar antes.
select throws_ok(
  format(
    $$ select internal.issue_activation_token(%L, %L, %L) $$,
    :'carla_id', :'plan_id', :'karol_uid'
  ),
  'P0008', null,
  'não existe segundo convite ativo para o mesmo cadastro'
);

-- Quem não é administradora não emite convite, mesmo chamando a função interna.
select throws_ok(
  format(
    $$ select internal.issue_activation_token(%L, %L, %L) $$,
    :'elis_id', :'plan_id', :'ana_uid'
  ),
  '42501', null,
  'a verificação de papel é feita na tabela, não no token da requisição'
);

-- Cadastro que já tem conta não recebe convite: seria um caminho para assumir
-- cadastro alheio.
update public.students set profile_id = :'extra_uid' where id = :'elis_id';

select throws_ok(
  format(
    $$ select internal.issue_activation_token(%L, %L, %L) $$,
    :'elis_id', :'plan_id', :'karol_uid'
  ),
  'P0007', null,
  'cadastro já vinculado não recebe novo convite'
);

update public.students set profile_id = null where id = :'elis_id';

-- ============================================================================
-- Parte 2 — Consumo do convite
-- ============================================================================

-- Emitimos um convite conhecido para a Elis e guardamos o token em claro numa
-- tabela temporária, que é o mais próximo que o teste chega de "o servidor
-- recebeu o token pela URL".
create temporary table t_token (student_id uuid, raw text);

insert into t_token
select :'elis_id', raw_token
from internal.issue_activation_token(:'elis_id', :'plan_id', :'karol_uid');

select is(
  (select outcome::text from internal.consume_activation_token(
     (select raw from t_token))),
  'valid',
  'o convite recém-emitido é aceito'
);

select is(
  (select status::text from internal.student_activation_tokens
   where student_id = :'elis_id'),
  'used',
  'e passa a constar como consumido'
);

-- Uso único: a segunda tentativa com o mesmo token é recusada.
select is(
  (select outcome::text from internal.consume_activation_token(
     (select raw from t_token))),
  'already_used',
  'convite consumido não pode ser reutilizado'
);

select is(
  (select attempt_count from internal.student_activation_tokens
   where student_id = :'elis_id'),
  2,
  'e a tentativa recusada é contada, não descartada'
);

-- Token inexistente. A resposta é um código, não uma exceção: o servidor traduz
-- tudo para a mesma mensagem na tela, sem revelar se o convite existe.
select is(
  (select outcome::text from internal.consume_activation_token('token-que-nunca-existiu')),
  'not_found',
  'token desconhecido é recusado sem revelar nada'
);

-- Convite revogado.
select ok(
  (select internal.revoke_activation_token(
     (select id from internal.student_activation_tokens where student_id = :'diana_id'),
     :'karol_uid')),
  'a administradora revoga um convite ativo'
);

select is(
  (select status::text from internal.student_activation_tokens
   where student_id = :'diana_id'),
  'revoked',
  'e ele passa a constar como revogado'
);

-- Convite expirado. Inserido à mão porque `issue_activation_token` só produz
-- datas futuras — a constraint `expires_at > created_at` impede o contrário.
--
-- Vai para a Fabi, e não para quem já apareceu acima: o índice
-- `activation_tokens_one_active_per_student_idx` recusaria um segundo convite
-- ativo, e é justamente esse comportamento que testamos na Parte 1.
insert into internal.student_activation_tokens (
  student_id, subscription_plan_id, token_hash, expires_at, created_by, created_at
)
values (
  :'fabi_id', :'plan_id',
  sha256(convert_to('token-vencido', 'UTF8')),
  now() - interval '1 day',
  :'karol_uid',
  now() - interval '10 days'
);

select is(
  (select outcome::text from internal.consume_activation_token('token-vencido')),
  'expired',
  'convite vencido não pode ser usado'
);

select is(
  (select status::text from internal.student_activation_tokens
   where token_hash = sha256(convert_to('token-vencido', 'UTF8'))),
  'expired',
  'e o consumo recusado marca o convite como vencido'
);

-- A revogação só age sobre convite ativo.
select ok(
  not (select internal.revoke_activation_token(
     (select id from internal.student_activation_tokens where student_id = :'elis_id'),
     :'karol_uid')),
  'revogar convite já consumido não tem efeito'
);

-- ============================================================================
-- Parte 3 — Vínculo entre conta e cadastro
-- ============================================================================

-- Caminho feliz: a conta `carla@teste.local` é vinculada ao cadastro da Carla,
-- que foi quem originou o convite.
select lives_ok(
  format(
    $$ select internal.link_student_account(%L, %L, %L) $$,
    :'carla_id', :'ana_uid', 'edge:invite-student'
  ),
  'o servidor vincula a conta ao cadastro que originou o convite'
);

select is(
  (select profile_id from public.students where id = :'carla_id'),
  :'ana_uid'::uuid,
  'e o vínculo aponta exatamente para o UUID criado pelo Supabase'
);

select is(
  (select count(*)::int from public.audit_logs
   where action = 'student.account_linked'
     and entity_id = :'carla_id'),
  1,
  'o vínculo é registrado em audit_logs'
);

select ok(
  (select metadata ->> 'actor' = 'edge:invite-student'
   from public.audit_logs
   where action = 'student.account_linked' and entity_id = :'carla_id'),
  'e o registro identifica qual processo autorizado executou'
);

-- Cadastro já vinculado falha de forma explícita, e não em silêncio.
select throws_ok(
  format(
    $$ select internal.link_student_account(%L, %L, %L) $$,
    :'carla_id', :'extra_uid', 'edge:invite-student'
  ),
  'P0007', null,
  'cadastro já vinculado recusa novo vínculo'
);

-- A mesma conta não serve para duas alunas.
select throws_ok(
  format(
    $$ select internal.link_student_account(%L, %L, %L) $$,
    :'diana_id', :'ana_uid', 'edge:invite-student'
  ),
  'P0009', null,
  'uma conta não pode ser vinculada a dois cadastros'
);

-- Coerência de e-mail como asserção: se o servidor apontar a conta errada, a
-- operação para. Não é o mecanismo de vínculo, é a rede que pega o erro dele.
select throws_ok(
  format(
    $$ select internal.link_student_account(%L, %L, %L) $$,
    :'diana_id', :'extra_uid', 'edge:invite-student'
  ),
  'P0010', null,
  'conta e cadastro com e-mails diferentes não são vinculados'
);

-- Identidade do processo é obrigatória: um vínculo sem responsável registrado
-- não é auditável.
select throws_ok(
  format(
    $$ select internal.link_student_account(%L, %L, %L) $$,
    :'diana_id', :'extra_uid', '   '
  ),
  '22023', null,
  'vínculo sem identidade do processo autorizado é recusado'
);

-- E a garantia estrutural por baixo de tudo: `profile_id` é único.
select ok(
  (select count(*)::int > 0
   from pg_indexes
   where schemaname = 'public'
     and tablename = 'students'
     and indexdef ilike '%unique%'
     and indexdef ilike '%profile_id%'),
  'students.profile_id tem índice único'
);

-- ============================================================================
-- Parte 4 — Idempotência do webhook
-- ============================================================================

insert into public.subscriptions (id, student_id, plan_id, status)
values (
  'eeeeeeee-0000-0000-0000-000000000001',
  :'diana_id', :'plan_id', 'pending'
);

\set sub_id 'eeeeeeee-0000-0000-0000-000000000001'

-- Primeiro recebimento: linha nova, ainda não processada.
create temporary table t_event (id uuid, status text, replay boolean);

insert into t_event
select event_id, processing_status::text, is_replay
from internal.record_payment_event(
  'pagbank', 'evt-0001', 'CHECKOUT.PAID', '{"amount_cents":10000}'::jsonb
);

select is(
  (select status from t_event),
  'received',
  'o primeiro recebimento do evento entra como received'
);

select is(
  (select replay from t_event),
  false,
  'e não é marcado como reentrega'
);

-- Reentrega antes de qualquer processamento. O ponto central do requisito: a
-- linha já existe, mas isso **não** quer dizer que foi processada.
select is(
  (select processing_status::text from internal.record_payment_event(
     'pagbank', 'evt-0001', 'CHECKOUT.PAID')),
  'received',
  'reentrega de evento não processado continua como received'
);

select is(
  (select is_replay from internal.record_payment_event(
     'pagbank', 'evt-0001', 'CHECKOUT.PAID')),
  true,
  'e é sinalizada como reentrega, para o servidor decidir'
);

select is(
  (select count(*)::int from public.payment_events
   where provider_event_id = 'evt-0001'),
  1,
  'sem criar segunda linha: a chave única segue valendo'
);

-- Uma tentativa que falha antes de tocar a assinatura.
select ok(
  (select internal.begin_payment_event_processing((select id from t_event))),
  'o evento pode ser reservado para processamento'
);

select lives_ok(
  format(
    $$ select internal.fail_payment_event(%L, 'provider_unreachable') $$,
    (select id from t_event)
  ),
  'e a falha é registrada'
);

select is(
  (select processing_status::text from public.payment_events
   where id = (select id from t_event)),
  'failed',
  'o evento fica como failed'
);

select is(
  (select status::text from public.subscriptions where id = :'sub_id'),
  'pending',
  'e a assinatura não foi tocada — era esse o risco'
);

select ok(
  (select next_retry_at is not null from public.payment_events
   where id = (select id from t_event)),
  'com data de nova tentativa marcada'
);

select ok(
  (select last_error_code = 'provider_unreachable' from public.payment_events
   where id = (select id from t_event)),
  'e o código do erro guardado, sem mensagem do provedor'
);

-- Evento que falhou antes pode ser tentado de novo.
select ok(
  (select internal.begin_payment_event_processing((select id from t_event))),
  'evento previamente falho pode ser tentado novamente'
);

select is(
  (select attempt_count from public.payment_events
   where id = (select id from t_event)),
  2,
  'e a contagem de tentativas acompanha'
);

-- Conclusão: assinatura, evento e convite numa transação só.
select lives_ok(
  format(
    $$ select internal.complete_payment_event(
         %L, %L, 'active', now(), now() + interval '30 days',
         'pagbank', 'SUB_XYZ') $$,
    (select id from t_event), :'sub_id'
  ),
  'a conclusão atualiza assinatura e evento juntos'
);

select is(
  (select status::text from public.subscriptions where id = :'sub_id'),
  'active',
  'a assinatura fica ativa'
);

select is(
  (select processing_status::text from public.payment_events
   where id = (select id from t_event)),
  'processed',
  'o evento fica como processed'
);

select ok(
  (select processed_at is not null and last_error_code is null
   from public.payment_events where id = (select id from t_event)),
  'com data de conclusão e sem código de erro residual'
);

select is(
  (select count(*)::int from internal.account_invitation_jobs
   where student_id = :'diana_id'),
  1,
  'e o convite é enfileirado como etapa separada'
);

-- Reentrega depois de concluído não pode alterar a assinatura outra vez. É o
-- que impede uma reentrega do PagBank de estender o período pago de graça.
update public.subscriptions
set current_period_end = '2030-01-01T00:00:00Z'
where id = :'sub_id';

select is(
  (select processing_status::text from internal.record_payment_event(
     'pagbank', 'evt-0001', 'CHECKOUT.PAID')),
  'processed',
  'reentrega de evento concluído se identifica como processed'
);

select ok(
  not (select internal.begin_payment_event_processing((select id from t_event))),
  'e não consegue ser reservado de novo'
);

select lives_ok(
  format(
    $$ select internal.complete_payment_event(
         %L, %L, 'active', now(), now() + interval '30 days') $$,
    (select id from t_event), :'sub_id'
  ),
  'chamar a conclusão de novo não levanta erro'
);

select is(
  (select current_period_end from public.subscriptions where id = :'sub_id'),
  '2030-01-01T00:00:00Z'::timestamptz,
  'mas também não altera a assinatura pela segunda vez'
);

select is(
  (select count(*)::int from internal.account_invitation_jobs
   where student_id = :'diana_id'),
  1,
  'nem enfileira um segundo convite'
);

-- ============================================================================
-- Parte 5 — A fila de convites absorve a falha de envio
-- ============================================================================

create temporary table t_job (id uuid, student_id uuid, attempts integer);

insert into t_job
select job_id, student_id, attempt_count from internal.claim_invitation_job();

select is(
  (select student_id from t_job),
  :'diana_id'::uuid,
  'o worker reserva o convite pendente'
);

select lives_ok(
  format(
    $$ select internal.fail_invitation_job(%L, 'smtp_timeout') $$,
    (select id from t_job)
  ),
  'e uma falha no envio é registrada'
);

select is(
  (select status::text from internal.account_invitation_jobs
   where id = (select id from t_job)),
  'failed',
  'o job fica como failed'
);

-- O ponto do outbox: a assinatura confirmada não é desfeita nem duplicada
-- porque o e-mail não saiu.
select is(
  (select status::text from public.subscriptions where id = :'sub_id'),
  'active',
  'a assinatura continua ativa apesar da falha no convite'
);

select is(
  (select count(*)::int from internal.account_invitation_jobs
   where student_id = :'diana_id'),
  1,
  'e continua existindo um único convite, não dois'
);

-- Nova tentativa depois da janela de espera.
update internal.account_invitation_jobs
set next_attempt_at = now() - interval '1 minute'
where id = (select id from t_job);

select is(
  (select count(*)::int from internal.claim_invitation_job()),
  1,
  'o convite falho é reservado de novo quando a espera passa'
);

select lives_ok(
  format($$ select internal.complete_invitation_job(%L) $$, (select id from t_job)),
  'e o envio bem-sucedido encerra o job'
);

select is(
  (select status::text from internal.account_invitation_jobs
   where id = (select id from t_job)),
  'sent',
  'com status sent'
);

select ok(
  (select processed_at is not null and last_error_code is null
   from internal.account_invitation_jobs where id = (select id from t_job)),
  'data de conclusão preenchida e erro anterior limpo'
);

select is(
  (select count(*)::int from internal.claim_invitation_job()),
  0,
  'e a fila fica vazia'
);

-- ============================================================================
-- Parte 6 — Manutenção
-- ============================================================================

insert into internal.student_activation_tokens (
  student_id, subscription_plan_id, token_hash, expires_at, created_by, created_at
)
values (
  :'diana_id', :'plan_id',
  sha256(convert_to('outro-vencido', 'UTF8')),
  now() - interval '1 hour',
  :'karol_uid',
  now() - interval '8 days'
);

select is(
  (select internal.expire_activation_tokens()),
  1,
  'a rotina de manutenção marca os convites vencidos'
);

select is(
  (select internal.expire_activation_tokens()),
  0,
  'e rodar de novo não faz nada: é idempotente'
);

select * from finish();

rollback;
