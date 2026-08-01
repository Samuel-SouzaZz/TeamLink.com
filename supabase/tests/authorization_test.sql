-- ============================================================================
-- TeamLink — autorização, privilégios e regras de agendamento
--
-- Rodar com:  npm run db:test        (equivale a `supabase test db`)
-- Exige Docker e a Supabase CLI, contra a instância LOCAL. Nunca aponte estes
-- testes para produção: eles criam e alteram dados.
--
-- Duas camadas são verificadas aqui, e é importante não confundi-las:
--
--   * **GRANT** decide se o papel alcança a tabela ou a coluna. Falta de
--     privilégio dá `42501` antes de qualquer política ser avaliada.
--   * **RLS** decide quais linhas o papel vê. Com privilégio e sem política, o
--     resultado é zero linhas — não erro.
--
-- Por isso um teste espera exceção e o outro espera contagem zero. Onde o
-- esperado é `42501`, a garantia é mais forte: a tabela não existe para aquele
-- papel.
-- ============================================================================

begin;

create extension if not exists pgtap;

-- A migration de privilégios revoga o `execute` padrão de funções novas em
-- `public`, e o pgTAP é criado aqui dentro — depois dela. Sem estes grants,
-- `set local role anon` não conseguiria chamar nem `throws_ok`, e o teste
-- falharia por falta de privilégio na ferramenta em vez de no que ela mede.
--
-- Descobrimos o schema em tempo de execução porque o Supabase pode instalar a
-- extensão em `extensions` ou em `public`. O `rollback` no fim descarta tudo.
do $$
declare
  v_schema text;
begin
  select n.nspname into v_schema
  from pg_extension e
  join pg_namespace n on n.oid = e.extnamespace
  where e.extname = 'pgtap';

  execute format('grant usage on schema %I to anon, authenticated', v_schema);
  execute format(
    'grant execute on all functions in schema %I to anon, authenticated', v_schema
  );
end;
$$;

-- `no_plan` em vez de `plan(n)`: a contagem manual é uma fonte de falha que não
-- diz nada sobre o sistema. `finish()` confere que todos os testes rodaram.
select * from no_plan();

-- ─────────────────────────────────────────────────────────────────────────────
-- Fixtures (criadas como dona do schema, fora do RLS)
-- ─────────────────────────────────────────────────────────────────────────────

\set karol_uid   '11111111-1111-1111-1111-111111111111'
\set ana_uid     '22222222-2222-2222-2222-222222222222'
\set bruna_uid   '33333333-3333-3333-3333-333333333333'

\set ana_id      'aaaaaaaa-0000-0000-0000-000000000001'
\set bruna_id    'aaaaaaaa-0000-0000-0000-000000000002'
\set service_id  'bbbbbbbb-0000-0000-0000-000000000001'
\set plan_id     'cccccccc-0000-0000-0000-000000000001'
\set slot_id     'dddddddd-0000-0000-0000-000000000001'

insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data
)
values
  (:'karol_uid', '00000000-0000-0000-0000-000000000000', 'authenticated',
   'authenticated', 'karol@teste.local', '', now(), now(), now(), '{}', '{}'),
  (:'ana_uid', '00000000-0000-0000-0000-000000000000', 'authenticated',
   'authenticated', 'ana@teste.local', '', now(), now(), now(), '{}', '{}'),
  (:'bruna_uid', '00000000-0000-0000-0000-000000000000', 'authenticated',
   'authenticated', 'bruna@teste.local', '', now(), now(), now(), '{}', '{}');

-- O trigger de conta nova cria todo mundo como aluna; promovemos a Karol.
update public.user_roles set role = 'admin' where user_id = :'karol_uid';

-- Vínculo feito direto na fixture: o caminho real é
-- `internal.link_student_account`, exercitada em invitation_and_payments_test.sql.
insert into public.students (id, profile_id, full_name, email, phone, status)
values
  (:'ana_id',   :'ana_uid',   'Ana Teste',   'ana@teste.local',   '(32) 91111-1111', 'active'),
  (:'bruna_id', :'bruna_uid', 'Bruna Teste', 'bruna@teste.local', '(32) 92222-2222', 'active');

insert into public.services (id, name, kind, duration_minutes, capacity)
values (:'service_id', 'Turma Feminina', 'group_class', 60, 2);

insert into public.subscription_plans (id, name, price_cents)
values (:'plan_id', 'Mensal', 10000);

-- Ana tem assinatura ativa; Bruna está pendente.
insert into public.subscriptions (student_id, plan_id, status)
values
  (:'ana_id',   :'plan_id', 'active'),
  (:'bruna_id', :'plan_id', 'pending');

-- Turma com duas vagas apenas, para exercitar o limite de capacidade.
insert into public.schedule_slots (id, service_id, starts_at, ends_at, capacity)
values (
  :'slot_id', :'service_id',
  now() + interval '2 days',
  now() + interval '2 days 1 hour',
  2
);

insert into public.private_notes (student_id, author_id, body)
values (:'ana_id', :'karol_uid', 'Anotação reservada da Karol.');

insert into public.payment_events (provider, provider_event_id, event_type)
values ('pagbank', 'evt-fixture-0001', 'CHECKOUT.PAID');

-- ============================================================================
-- Parte 1 — Estrutura: RLS ligado, nenhum DELETE em lugar nenhum
-- ============================================================================

select is(
  (select count(*)::int from pg_tables
   where schemaname = 'public' and not rowsecurity),
  0,
  'toda tabela em public tem RLS habilitado'
);

select is(
  (select count(*)::int from pg_tables
   where schemaname = 'internal' and not rowsecurity),
  0,
  'toda tabela em internal tem RLS habilitado, mesmo sendo inalcançável'
);

select is(
  (select count(*)::int from pg_policies
   where schemaname = 'public' and cmd = 'DELETE'),
  0,
  'nenhuma tabela expõe política de DELETE'
);

-- A ausência de política já barraria o DELETE. Este teste é sobre o privilégio:
-- garante que nem mesmo uma política futura, adicionada por descuido, teria
-- efeito — porque o comando não está concedido.
select is(
  (select count(*)::int
   from information_schema.role_table_grants
   where table_schema = 'public'
     and privilege_type = 'DELETE'
     and grantee in ('anon', 'authenticated', 'service_role')),
  0,
  'nenhum papel da API tem privilégio DELETE em tabela alguma'
);

select is(
  (select count(*)::int
   from information_schema.role_table_grants
   where table_schema = 'public'
     and grantee = 'anon'),
  0,
  'anon não tem privilégio nenhum em nenhuma tabela'
);

-- ============================================================================
-- Parte 2 — GRANTs de tabela e de coluna
-- ============================================================================

select ok(
  has_table_privilege('authenticated', 'public.students', 'SELECT'),
  'authenticated alcança students para leitura'
);

select ok(
  not has_table_privilege('authenticated', 'public.appointments', 'INSERT'),
  'aluna não tem INSERT direto em appointments: reservar é só por função'
);

select ok(
  not has_table_privilege('authenticated', 'public.subscriptions', 'INSERT'),
  'nenhum cliente cria assinatura'
);

select ok(
  not has_table_privilege('authenticated', 'public.subscriptions', 'UPDATE'),
  'nenhum cliente altera assinatura: quem faz isso é o webhook'
);

select ok(
  not has_table_privilege('authenticated', 'public.payment_events', 'INSERT'),
  'nenhum cliente registra evento de pagamento'
);

select ok(
  not has_table_privilege('authenticated', 'public.audit_logs', 'INSERT'),
  'nenhum cliente escreve em audit_logs'
);

select ok(
  not has_table_privilege('authenticated', 'public.user_roles', 'SELECT'),
  'authenticated não lê a origem dos papéis'
);

select ok(
  not has_table_privilege('authenticated', 'public.user_roles', 'UPDATE'),
  'authenticated não escreve na origem dos papéis'
);

select ok(
  has_table_privilege('supabase_auth_admin', 'public.user_roles', 'SELECT'),
  'o servidor de autenticação lê os papéis para montar o token'
);

-- O recorte por coluna em students. É ele que impede a aluna de se
-- desarquivar, de trocar o próprio e-mail ou de apontar o cadastro para outra
-- conta — coisas que o RLS não conseguiria barrar, porque a linha é dela.
select ok(
  has_column_privilege('authenticated', 'public.students', 'full_name', 'UPDATE'),
  'aluna pode corrigir o próprio nome'
);

select ok(
  has_column_privilege('authenticated', 'public.students', 'phone', 'UPDATE'),
  'aluna pode corrigir o próprio telefone'
);

select ok(
  not has_column_privilege('authenticated', 'public.students', 'status', 'UPDATE'),
  'aluna não alcança students.status'
);

select ok(
  not has_column_privilege('authenticated', 'public.students', 'archived_at', 'UPDATE'),
  'aluna não alcança students.archived_at'
);

select ok(
  not has_column_privilege('authenticated', 'public.students', 'profile_id', 'UPDATE'),
  'aluna não alcança students.profile_id: o vínculo não é escolha dela'
);

select ok(
  not has_column_privilege('authenticated', 'public.students', 'email', 'UPDATE'),
  'aluna não alcança students.email'
);

-- O contador de vagas não é escrevível por ninguém pela API, nem pela Karol.
select ok(
  not has_column_privilege('authenticated', 'public.schedule_slots', 'booked_count', 'UPDATE'),
  'booked_count não é escrevível por cliente algum'
);

select ok(
  has_column_privilege('authenticated', 'public.schedule_slots', 'capacity', 'UPDATE'),
  'a Karol ajusta a capacidade da turma'
);

-- Cancelar por UPDATE direto é impossível: `status` está concedido, mas
-- `cancelled_at` não, e a constraint exige os dois juntos.
select ok(
  has_column_privilege('authenticated', 'public.appointments', 'status', 'UPDATE'),
  'a Karol marca presença, conclusão e falta'
);

select ok(
  not has_column_privilege('authenticated', 'public.appointments', 'cancelled_at', 'UPDATE'),
  'cancelar exige a função, que devolve a vaga'
);

-- ============================================================================
-- Parte 3 — Schema internal e GRANTs de função
-- ============================================================================

select ok(
  not has_schema_privilege('anon', 'internal', 'USAGE'),
  'anon não tem usage no schema internal'
);

select ok(
  not has_schema_privilege('authenticated', 'internal', 'USAGE'),
  'authenticated não tem usage no schema internal'
);

select ok(
  not has_schema_privilege('service_role', 'internal', 'USAGE'),
  'nem o servidor alcança internal direto: a superfície são as funções srv_*'
);

select ok(
  not has_function_privilege('anon', 'public.book_appointment(uuid)', 'EXECUTE'),
  'visitante não executa função de negócio'
);

select ok(
  not has_function_privilege('anon', 'public.cancel_appointment(uuid, text)', 'EXECUTE'),
  'visitante não cancela agendamento'
);

select ok(
  not has_function_privilege('anon', 'public.archive_student(uuid)', 'EXECUTE'),
  'visitante não arquiva cadastro'
);

select ok(
  not has_function_privilege('anon', 'public.current_student_id()', 'EXECUTE'),
  'visitante não resolve identidade de aluna'
);

select ok(
  has_function_privilege('authenticated', 'public.book_appointment(uuid)', 'EXECUTE'),
  'aluna autenticada executa book_appointment'
);

select ok(
  has_function_privilege('authenticated', 'public.cancel_appointment(uuid, text)', 'EXECUTE'),
  'aluna autenticada executa cancel_appointment'
);

-- O contrato do servidor é fechado para o navegador. Nenhuma sessão de aluna
-- consegue emitir convite, consumir convite ou vincular conta.
select ok(
  not has_function_privilege(
    'authenticated', 'public.srv_issue_activation_token(uuid, uuid, uuid, interval)', 'EXECUTE'
  ),
  'authenticated não emite convite de ativação'
);

select ok(
  not has_function_privilege(
    'authenticated', 'public.srv_consume_activation_token(text)', 'EXECUTE'
  ),
  'authenticated não consome convite de ativação'
);

select ok(
  not has_function_privilege(
    'anon', 'public.srv_consume_activation_token(text)', 'EXECUTE'
  ),
  'anon não consome convite de ativação'
);

select ok(
  not has_function_privilege(
    'authenticated', 'public.srv_link_student_account(uuid, uuid, text)', 'EXECUTE'
  ),
  'aluna não escolhe a qual cadastro sua conta será vinculada'
);

select ok(
  not has_function_privilege(
    'authenticated',
    'public.srv_record_payment_event(text, text, text, jsonb, uuid)',
    'EXECUTE'
  ),
  'aluna não confirma pagamento'
);

select ok(
  has_function_privilege(
    'service_role', 'public.srv_consume_activation_token(text)', 'EXECUTE'
  ),
  'o servidor consome convite pelo contrato srv_*'
);

select ok(
  has_function_privilege(
    'service_role', 'public.srv_link_student_account(uuid, uuid, text)', 'EXECUTE'
  ),
  'o servidor vincula conta pelo contrato srv_*'
);

select ok(
  not has_function_privilege(
    'authenticated', 'public.custom_access_token_hook(jsonb)', 'EXECUTE'
  ),
  'ninguém além do servidor de autenticação executa o hook de token'
);

-- ============================================================================
-- Parte 4 — Endurecimento das funções privilegiadas
-- ============================================================================

-- `search_path` mutável numa função `security definer` permite que a chamadora
-- aponte um schema próprio e faça a função executar código dela, com privilégio
-- elevado. Todas precisam fixar o caminho.
select is(
  (select count(*)::int
   from pg_proc p
   join pg_namespace n on n.oid = p.pronamespace
   where n.nspname in ('public', 'internal')
     and p.prosecdef
     and not exists (
       select 1 from unnest(coalesce(p.proconfig, array[]::text[])) cfg
       where cfg like 'search\_path=%'
     )),
  0,
  'toda função security definer fixa o search_path'
);

-- `PUBLIC` não é um papel de verdade, então `has_function_privilege('public',…)`
-- daria erro de papel inexistente. A leitura tem de ser na ACL, onde o grantee
-- `0` representa PUBLIC. E `proacl` nulo é o caso mais perigoso: significa
-- "privilégios padrão", e o padrão do Postgres para função é EXECUTE a PUBLIC.
select is(
  (select count(*)::int
   from pg_proc p
   join pg_namespace n on n.oid = p.pronamespace
   where n.nspname in ('public', 'internal')
     and p.prosecdef
     and (
       p.proacl is null
       or exists (
         select 1 from aclexplode(p.proacl) a
         where a.grantee = 0 and a.privilege_type = 'EXECUTE'
       )
       or has_function_privilege('anon', p.oid, 'EXECUTE')
     )),
  0,
  'nenhuma função security definer é executável por PUBLIC ou anon'
);

-- ============================================================================
-- Parte 5 — Visitante: a tabela não existe para quem não tem sessão
-- ============================================================================

set local role anon;
set local request.jwt.claims to '{"role":"anon"}';

select throws_ok(
  $$ select count(*) from public.students $$,
  '42501', null,
  'visitante não lê alunas'
);

select throws_ok(
  $$ select count(*) from public.appointments $$,
  '42501', null,
  'visitante não lê agendamentos'
);

select throws_ok(
  $$ select count(*) from public.private_notes $$,
  '42501', null,
  'visitante não lê anotações privadas'
);

select throws_ok(
  $$ select count(*) from public.subscriptions $$,
  '42501', null,
  'visitante não lê assinaturas'
);

select throws_ok(
  $$ select count(*) from public.payment_events $$,
  '42501', null,
  'visitante não lê eventos de pagamento'
);

select throws_ok(
  $$ select count(*) from public.user_roles $$,
  '42501', null,
  'visitante não lê papéis'
);

select throws_ok(
  $$ select public.book_appointment('dddddddd-0000-0000-0000-000000000001') $$,
  '42501', null,
  'visitante não executa função de negócio'
);

reset role;

-- ============================================================================
-- Parte 6 — Aluna A não alcança Aluna B
-- ============================================================================

set local role authenticated;
set local request.jwt.claims to
  '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated","user_role":"student"}';

select is((select count(*)::int from public.students), 1,
  'aluna enxerga apenas o próprio cadastro');

select is((select full_name from public.students), 'Ana Teste',
  'e o cadastro que ela enxerga é o dela');

select is((select public.is_admin()), false,
  'claim de aluna não passa por administradora');

select is((select count(*)::int from public.private_notes), 0,
  'aluna tem privilégio na tabela mas o RLS devolve zero anotações');

select is((select count(*)::int from public.payment_events), 0,
  'aluna tem privilégio na tabela mas o RLS devolve zero eventos');

select is((select count(*)::int from public.subscriptions), 1,
  'aluna enxerga apenas a própria assinatura');

select throws_ok(
  $$ select count(*) from public.user_roles $$,
  '42501', null,
  'aluna não lê user_roles: falta o privilégio, não só a política'
);

select throws_ok(
  $$ select count(*) from internal.student_activation_tokens $$,
  '42501', null,
  'aluna não lê tokens de ativação'
);

select throws_ok(
  $$ select count(*) from internal.account_invitation_jobs $$,
  '42501', null,
  'aluna não lê a fila de convites'
);

select throws_ok(
  $$ insert into public.subscriptions (student_id, plan_id, status)
     values ('aaaaaaaa-0000-0000-0000-000000000001',
             'cccccccc-0000-0000-0000-000000000001', 'active') $$,
  '42501', null,
  'aluna não cria assinatura'
);

select throws_ok(
  $$ update public.subscriptions set status = 'active' $$,
  '42501', null,
  'aluna não ativa a própria assinatura'
);

select throws_ok(
  $$ insert into public.payment_events (provider, provider_event_id, event_type)
     values ('pagbank', 'forjado-0001', 'CHECKOUT.PAID') $$,
  '42501', null,
  'aluna não confirma pagamento'
);

select throws_ok(
  $$ update public.students set status = 'archived' $$,
  '42501', null,
  'aluna não arquiva nem reativa o próprio cadastro'
);

select throws_ok(
  $$ update public.students set email = 'outra@teste.local' $$,
  '42501', null,
  'aluna não troca o próprio e-mail'
);

select throws_ok(
  $$ update public.students
     set profile_id = '11111111-1111-1111-1111-111111111111' $$,
  '42501', null,
  'aluna não redireciona o próprio vínculo'
);

select throws_ok(
  $$ update public.schedule_slots set booked_count = 0 $$,
  '42501', null,
  'aluna não mexe no contador de vagas'
);

select throws_ok(
  $$ insert into public.private_notes (student_id, author_id, body)
     values ('aaaaaaaa-0000-0000-0000-000000000001',
             '22222222-2222-2222-2222-222222222222', 'tentativa') $$,
  '42501', null,
  'aluna não cria anotação privada'
);

-- Funções administrativas são chamáveis por qualquer sessão autenticada, porque
-- `authenticated` é o mesmo papel de banco para as duas. Quem separa é o
-- `is_admin()` na primeira linha do corpo.
select throws_ok(
  $$ select public.archive_student('aaaaaaaa-0000-0000-0000-000000000002') $$,
  '42501', null,
  'aluna não arquiva cadastro de outra'
);

select throws_ok(
  $$ select public.admin_create_student('Invasora', 'invasora@teste.local') $$,
  '42501', null,
  'aluna não cadastra aluna'
);

select throws_ok(
  $$ select public.admin_update_student('aaaaaaaa-0000-0000-0000-000000000002',
                                        'Nome Trocado') $$,
  '42501', null,
  'aluna não edita cadastro de outra'
);

select throws_ok(
  $$ select public.admin_book_appointment('aaaaaaaa-0000-0000-0000-000000000002',
                                          'dddddddd-0000-0000-0000-000000000001') $$,
  '42501', null,
  'aluna não agenda em nome de outra'
);

select throws_ok(
  $$ select public.reconcile_slot_counts() $$,
  '42501', null,
  'aluna não reconcilia contadores'
);

-- Contato próprio, esse sim, é editável.
select lives_ok(
  $$ update public.students set full_name = 'Ana Corrigida',
                                phone = '(32) 90000-0000' $$,
  'aluna atualiza o próprio nome e telefone'
);

-- Tentativa de escrever na linha de outra aluna: o RLS não deixa a linha ser
-- alcançada, então a operação afeta zero linhas em silêncio. A verificação real
-- é o valor da Bruna depois disso.
select lives_ok(
  $$ update public.students set phone = '(00) 00000-0000'
     where id = 'aaaaaaaa-0000-0000-0000-000000000002' $$,
  'update na linha de outra aluna não levanta erro, apenas não alcança nada'
);

reset role;

select is(
  (select phone from public.students where id = :'bruna_id'),
  '(32) 92222-2222',
  'e o telefone da outra aluna continua intacto'
);

-- ============================================================================
-- Parte 7 — Agendamento: assinatura, duplicidade, capacidade e contador
-- ============================================================================

set local role authenticated;
set local request.jwt.claims to
  '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated","user_role":"student"}';

select lives_ok(
  $$ select public.book_appointment('dddddddd-0000-0000-0000-000000000001') $$,
  'aluna com assinatura ativa consegue agendar'
);

select throws_ok(
  $$ select public.book_appointment('dddddddd-0000-0000-0000-000000000001') $$,
  'P0004', null,
  'a mesma aluna não reserva duas vezes o mesmo horário'
);

reset role;

select is(
  (select booked_count from public.schedule_slots where id = :'slot_id'),
  1,
  'a reserva incrementou o contador exatamente uma vez'
);

-- Bruna, com assinatura pendente, é recusada.
set local role authenticated;
set local request.jwt.claims to
  '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","user_role":"student"}';

select throws_ok(
  $$ select public.book_appointment('dddddddd-0000-0000-0000-000000000001') $$,
  'P0001', null,
  'assinatura inativa bloqueia novo agendamento'
);

select is((select count(*)::int from public.appointments), 0,
  'uma aluna não enxerga o agendamento de outra');

reset role;

-- Cadastro arquivado também não agenda, mesmo com assinatura vigente.
update public.students set status = 'archived', archived_at = now()
where id = :'bruna_id';
update public.subscriptions set status = 'active' where student_id = :'bruna_id';

set local role authenticated;
set local request.jwt.claims to
  '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","user_role":"student"}';

select throws_ok(
  $$ select public.book_appointment('dddddddd-0000-0000-0000-000000000001') $$,
  'P0006', null,
  'cadastro arquivado não agenda nem com assinatura ativa'
);

reset role;

update public.students set status = 'active', archived_at = null
where id = :'bruna_id';

-- Turma cheia: capacidade 2, uma vaga da Ana e outra ocupada à mão.
update public.schedule_slots set booked_count = 2 where id = :'slot_id';

set local role authenticated;
set local request.jwt.claims to
  '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","user_role":"student"}';

select throws_ok(
  $$ select public.book_appointment('dddddddd-0000-0000-0000-000000000001') $$,
  'P0003', null,
  'turma cheia recusa nova reserva'
);

reset role;

-- A constraint é a rede final: nem com privilégio de dona o contador passa da
-- capacidade nem fica negativo.
select throws_ok(
  $$ update public.schedule_slots set booked_count = 3
     where id = 'dddddddd-0000-0000-0000-000000000001' $$,
  '23514',
  null,
  'o banco recusa contador acima da capacidade'
);

select throws_ok(
  $$ update public.schedule_slots set booked_count = -1
     where id = 'dddddddd-0000-0000-0000-000000000001' $$,
  '23514',
  null,
  'o banco recusa contador negativo'
);

-- Cancelamento devolve a vaga.
update public.schedule_slots set booked_count = 1 where id = :'slot_id';

set local role authenticated;
set local request.jwt.claims to
  '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated","user_role":"student"}';

select lives_ok(
  $$ select public.cancel_appointment(
       (select id from public.appointments
        where student_id = 'aaaaaaaa-0000-0000-0000-000000000001'
        limit 1)) $$,
  'aluna cancela o próprio agendamento'
);

reset role;

select is(
  (select booked_count from public.schedule_slots where id = :'slot_id'),
  0,
  'o cancelamento devolveu a vaga'
);

select is(
  (select status::text from public.appointments
   where student_id = :'ana_id' limit 1),
  'cancelled',
  'e o agendamento continua no histórico, apenas cancelado'
);

-- Cancelar de novo não decrementa outra vez: a função sai em silêncio quando o
-- agendamento já está cancelado. Sem isso, o contador iria a negativo.
set local role authenticated;
set local request.jwt.claims to
  '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated","user_role":"student"}';

select lives_ok(
  $$ select public.cancel_appointment(
       (select id from public.appointments
        where student_id = 'aaaaaaaa-0000-0000-0000-000000000001'
        limit 1)) $$,
  'cancelar duas vezes não levanta erro'
);

reset role;

select is(
  (select booked_count from public.schedule_slots where id = :'slot_id'),
  0,
  'e o contador não fica negativo'
);

-- ============================================================================
-- Parte 8 — Administradora
-- ============================================================================

set local role authenticated;
set local request.jwt.claims to
  '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated","user_role":"admin"}';

select is((select public.is_admin()), true,
  'claim de admin é reconhecido');

select is((select count(*)::int from public.students), 2,
  'Karol enxerga todas as alunas');

select is((select count(*)::int from public.private_notes), 1,
  'Karol lê as próprias anotações privadas');

select is((select count(*)::int from public.subscriptions), 2,
  'Karol acompanha todas as assinaturas');

select is((select count(*)::int from public.payment_events), 1,
  'Karol acompanha os eventos de pagamento');

select throws_ok(
  $$ select count(*) from public.user_roles $$,
  '42501', null,
  'nem a Karol lê a tabela de papéis pela API'
);

select throws_ok(
  $$ delete from public.students
     where id = 'aaaaaaaa-0000-0000-0000-000000000001' $$,
  '42501', null,
  'nem a administradora consegue apagar cadastro'
);

select throws_ok(
  $$ update public.schedule_slots set booked_count = 0 $$,
  '42501', null,
  'nem a administradora escreve no contador de vagas'
);

select throws_ok(
  $$ update public.subscriptions set status = 'active'
     where student_id = 'aaaaaaaa-0000-0000-0000-000000000002' $$,
  '42501', null,
  'nem a administradora confirma pagamento pela interface'
);

select lives_ok(
  $$ select public.admin_create_student('  Carla Teste  ', ' Carla@Teste.Local ') $$,
  'Karol cadastra aluna por função validada'
);

reset role;

select is(
  (select email from public.students where full_name = 'Carla Teste'),
  'carla@teste.local',
  'e o e-mail é normalizado com lower e trim antes de ser gravado'
);

set local role authenticated;
set local request.jwt.claims to
  '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated","user_role":"admin"}';

select throws_ok(
  $$ select public.admin_create_student('Repetida', 'carla@teste.local') $$,
  'P0012', null,
  'e-mail repetido é recusado sem repetir o endereço na mensagem'
);

select lives_ok(
  $$ select public.admin_book_appointment(
       'aaaaaaaa-0000-0000-0000-000000000002',
       'dddddddd-0000-0000-0000-000000000001') $$,
  'Karol agenda em nome da aluna, mesmo sem assinatura ativa dela'
);

reset role;

select is(
  (select booked_count from public.schedule_slots where id = :'slot_id'),
  1,
  'e o agendamento feito pela Karol também mexe no contador'
);

-- Reconciliação: estragamos o contador de propósito e conferimos a correção.
update public.schedule_slots set booked_count = 0 where id = :'slot_id';

set local role authenticated;
set local request.jwt.claims to
  '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated","user_role":"admin"}';

select is(
  (select corrected_count from public.reconcile_slot_counts(
     'dddddddd-0000-0000-0000-000000000001')),
  1,
  'reconcile_slot_counts recalcula o contador a partir dos agendamentos ativos'
);

select is(
  (select count(*)::int from public.reconcile_slot_counts()),
  0,
  'e não devolve nada quando não há divergência'
);

reset role;

select * from finish();

rollback;
