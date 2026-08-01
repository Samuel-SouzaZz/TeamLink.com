-- ============================================================================
-- TeamLink — pipeline de ativação, vínculo de conta e processamento de webhook
--
-- Este arquivo resolve três problemas que o desenho anterior deixava abertos:
--
--   1. A aluna acessa `/ativar` **antes** de existir conta. Não há sessão, não
--      há papel, não há `auth.uid()`. Qualquer coisa que o navegador enviar
--      nesse momento é palpite do cliente, incluindo o e-mail. O convite passa
--      a ser um token opaco que só o servidor consegue emitir e consumir.
--
--   2. Conflito em `unique (provider, provider_event_id)` era tratado como
--      "evento já processado". Não é: o evento pode ter sido gravado e a
--      execução morrer antes de tocar a assinatura. Quem responde isso agora é
--      `processing_status`.
--
--   3. Falha no envio do convite não pode deixar a assinatura inconsistente. O
--      convite virou item de fila (`account_invitation_jobs`), gravado na mesma
--      transação que ativa a assinatura e reprocessável quantas vezes precisar.
--
-- ── Por que um schema `internal` ────────────────────────────────────────────
--
-- `supabase/config.toml` expõe apenas `public` na Data API. Um schema fora
-- dessa lista é inalcançável pelo PostgREST **mesmo com a secret key**, o que
-- torna a exposição acidental dessas tabelas impossível por configuração, e não
-- por lembrança de quem escreve o GRANT.
--
-- O acesso do servidor é por funções `public.srv_*` — `security definer`, com
-- `EXECUTE` concedido só a `service_role`. É uma superfície nomeada e pequena
-- no lugar de acesso direto a tabela.
--
-- `public.user_roles` continua em `public` de propósito: o Auth Hook do Supabase
-- roda como `supabase_auth_admin` e a compatibilidade com schema alternativo não
-- está verificada aqui. Ela é uma tabela restrita no schema public, protegida
-- por GRANT e RLS — não uma tabela em schema privado.
-- ============================================================================

create schema if not exists internal;

comment on schema internal is
  'Tabelas e funções que nunca devem ser alcançadas pela Data API. Não consta '
  'em [api] schemas do config.toml, portanto o PostgREST não a enxerga.';

-- Nenhum papel da API entra aqui. Sem `usage` no schema, o nome das tabelas
-- não é sequer resolvível.
revoke all on schema internal from public;
revoke usage on schema internal from anon, authenticated, service_role;

-- ─────────────────────────────────────────────────────────────────────────────
-- Tipos
-- ─────────────────────────────────────────────────────────────────────────────

create type internal.activation_token_status as enum (
  'active', 'used', 'revoked', 'expired'
);

-- Resultado da tentativa de consumo. É devolvido como valor, e não levantado
-- como exceção, por dois motivos: exceção desfaria o incremento de
-- `attempt_count` que queremos persistir, e um código de retorno deixa o
-- servidor traduzir tudo para uma única mensagem genérica na tela.
create type internal.activation_token_outcome as enum (
  'valid', 'not_found', 'expired', 'revoked', 'already_used'
);

create type internal.invitation_job_status as enum (
  'pending', 'processing', 'sent', 'failed'
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Convites de ativação
--
-- O token original nunca é gravado. O que fica na tabela é `sha256` dele, então
-- um dump do banco não permite ativar conta nenhuma. Consultar é por hash: o
-- servidor recebe o token, calcula o hash e procura.
-- ─────────────────────────────────────────────────────────────────────────────

create table internal.student_activation_tokens (
  id                    uuid primary key default gen_random_uuid(),
  student_id            uuid not null references public.students (id) on delete restrict,
  subscription_plan_id  uuid not null references public.subscription_plans (id) on delete restrict,
  -- 32 bytes de digest. `unique` porque colisão de hash aqui significaria dois
  -- convites indistinguíveis.
  token_hash            bytea not null unique,
  status                internal.activation_token_status not null default 'active',
  expires_at            timestamptz not null,
  used_at               timestamptz,
  revoked_at            timestamptz,
  -- Conta tentativas de consumo, incluindo as que falharam. Um número alto num
  -- convite ainda ativo é sinal de alguém tentando adivinhar.
  attempt_count         integer not null default 0 check (attempt_count >= 0),
  created_by            uuid not null references public.profiles (id) on delete restrict,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),

  constraint activation_tokens_expiry_after_creation check (expires_at > created_at),
  constraint activation_tokens_used_at_matches_status check (
    (status = 'used' and used_at is not null)
    or (status <> 'used' and used_at is null)
  ),
  constraint activation_tokens_revoked_at_matches_status check (
    (status = 'revoked' and revoked_at is not null)
    or (status <> 'revoked' and revoked_at is null)
  )
);

comment on table internal.student_activation_tokens is
  'Convites de ativação. Guarda o hash do token, nunca o token. Uso único, '
  'com validade e revogação. Inalcançável pela Data API.';

create index activation_tokens_student_id_idx
  on internal.student_activation_tokens (student_id);
create index activation_tokens_plan_id_idx
  on internal.student_activation_tokens (subscription_plan_id);
create index activation_tokens_created_by_idx
  on internal.student_activation_tokens (created_by);

-- Um convite ativo por aluna, e não um por aluna e plano. Se a Karol precisar
-- trocar o plano do convite, o caminho é revogar e emitir de novo — deixar dois
-- convites válidos conviverem tornaria ambíguo qual plano a aluna contratou.
create unique index activation_tokens_one_active_per_student_idx
  on internal.student_activation_tokens (student_id)
  where status = 'active';

-- Fila de expiração: só o que ainda pode virar `expired` entra no índice.
create index activation_tokens_expiring_idx
  on internal.student_activation_tokens (expires_at)
  where status = 'active';

create trigger activation_tokens_set_updated_at
  before update on internal.student_activation_tokens
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- Fila de convites (outbox)
--
-- Ativar a assinatura e enviar o e-mail são operações com garantias diferentes:
-- a primeira é transacional no nosso banco, a segunda depende de um serviço
-- externo que pode estar fora do ar. Juntá-las obrigaria a escolher entre
-- perder o pagamento confirmado ou cobrar duas vezes.
--
-- A linha desta tabela é gravada na mesma transação que ativa a assinatura.
-- Depois disso, o envio pode falhar e ser repetido à vontade sem que a
-- assinatura seja tocada de novo.
-- ─────────────────────────────────────────────────────────────────────────────

create table internal.account_invitation_jobs (
  id                uuid primary key default gen_random_uuid(),
  student_id        uuid not null references public.students (id) on delete restrict,
  payment_event_id  uuid references public.payment_events (id) on delete restrict,
  status            internal.invitation_job_status not null default 'pending',
  attempt_count     integer not null default 0 check (attempt_count >= 0),
  last_error_code   text check (last_error_code is null or length(last_error_code) <= 64),
  next_attempt_at   timestamptz not null default now(),
  processed_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  constraint invitation_jobs_processed_at_matches_status check (
    (status = 'sent' and processed_at is not null)
    or (status <> 'sent' and processed_at is null)
  )
);

comment on table internal.account_invitation_jobs is
  'Outbox do convite de criação de conta. Existe para que falha no envio do '
  'e-mail não desfaça nem duplique a assinatura já confirmada.';

create index invitation_jobs_student_id_idx
  on internal.account_invitation_jobs (student_id);
create index invitation_jobs_payment_event_id_idx
  on internal.account_invitation_jobs (payment_event_id);

-- Índice parcial da fila: o worker só olha o que está pendente.
create index invitation_jobs_runnable_idx
  on internal.account_invitation_jobs (next_attempt_at)
  where status in ('pending', 'failed');

-- Uma aluna não pode ter dois convites em voo. Se o webhook for reentregue
-- depois de a assinatura já estar ativa, o `on conflict` desta chave é o que
-- impede o segundo e-mail.
create unique index invitation_jobs_one_open_per_student_idx
  on internal.account_invitation_jobs (student_id)
  where status in ('pending', 'processing', 'failed');

create trigger invitation_jobs_set_updated_at
  before update on internal.account_invitation_jobs
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- Verificação de papel sem token
--
-- `public.is_admin()` lê o claim da requisição, e o servidor chamando com a
-- secret key não tem claim nenhum. Estas funções conferem o papel na tabela,
-- que é a fonte de verdade — mais forte que confiar na Edge Function.
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function internal.is_admin_user(p_user_id uuid)
returns boolean
language sql
stable
set search_path = ''
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = p_user_id
      and role = 'admin'
  );
$$;

comment on function internal.is_admin_user(uuid) is
  'Confere o papel na tabela, não no token. Usada pelas operações que o '
  'servidor executa em nome da administradora.';

-- ─────────────────────────────────────────────────────────────────────────────
-- Emissão de convite
--
-- Devolve o token original **uma única vez**, para quem chamou. Ele não é
-- gravado, não vai para `audit_logs` e não deve ser registrado em log nenhum:
-- a auditoria recebe o `id` do convite, que identifica sem permitir usar.
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function internal.issue_activation_token(
  p_student_id           uuid,
  p_subscription_plan_id uuid,
  p_admin_user_id        uuid,
  p_ttl                  interval default interval '7 days'
)
returns table (token_id uuid, raw_token text)
language plpgsql
set search_path = ''
as $$
declare
  v_student   public.students;
  v_raw       text;
  v_token_id  uuid;
begin
  if not internal.is_admin_user(p_admin_user_id) then
    raise exception 'Operação restrita à administradora.' using errcode = '42501';
  end if;

  select * into v_student
  from public.students
  where id = p_student_id
  for update;

  if not found then
    raise exception 'Cadastro não encontrado.' using errcode = 'P0002';
  end if;

  if v_student.status <> 'active' then
    raise exception 'Cadastro arquivado não recebe convite.' using errcode = 'P0006';
  end if;

  -- Convite serve para criar conta. Quem já tem conta não precisa de um, e
  -- emitir mesmo assim abriria um caminho para assumir cadastro já vinculado.
  if v_student.profile_id is not null then
    raise exception 'Cadastro já possui conta vinculada.' using errcode = 'P0007';
  end if;

  if not exists (
    select 1 from public.subscription_plans
    where id = p_subscription_plan_id and active
  ) then
    raise exception 'Plano indisponível.' using errcode = 'P0002';
  end if;

  -- 32 bytes de fonte criptográfica = 256 bits de entropia, muito acima do que
  -- um ataque de força bruta alcança dentro da validade do convite. Codificado
  -- em base64url para caber numa URL sem escape: `translate` troca `+` e `/` e
  -- descarta o `=` do preenchimento.
  v_raw := translate(encode(extensions.gen_random_bytes(32), 'base64'), '+/=', '-_');

  begin
    insert into internal.student_activation_tokens (
      student_id, subscription_plan_id, token_hash, expires_at, created_by
    )
    values (
      p_student_id,
      p_subscription_plan_id,
      sha256(convert_to(v_raw, 'UTF8')),
      now() + p_ttl,
      p_admin_user_id
    )
    returning id into v_token_id;
  exception
    when unique_violation then
      raise exception 'Já existe convite ativo para este cadastro.'
        using errcode = 'P0008';
  end;

  insert into public.audit_logs (actor_id, action, entity_table, entity_id, metadata)
  values (
    p_admin_user_id,
    'activation_token.issued',
    'internal.student_activation_tokens',
    v_token_id::text,
    -- Sem o token e sem o e-mail. `student_id` já identifica o suficiente.
    jsonb_build_object(
      'student_id', p_student_id,
      'subscription_plan_id', p_subscription_plan_id
    )
  );

  return query select v_token_id, v_raw;
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- Consumo de convite
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function internal.consume_activation_token(p_token text)
returns table (
  outcome              internal.activation_token_outcome,
  token_id             uuid,
  student_id           uuid,
  subscription_plan_id uuid
)
language plpgsql
set search_path = ''
as $$
declare
  v_row internal.student_activation_tokens;
begin
  select * into v_row
  from internal.student_activation_tokens
  where token_hash = sha256(convert_to(p_token, 'UTF8'))
  for update;

  if not found then
    return query select 'not_found'::internal.activation_token_outcome,
                        null::uuid, null::uuid, null::uuid;
    return;
  end if;

  -- Toda tentativa conta, inclusive as recusadas. Como o resultado sai por
  -- valor de retorno, este incremento sobrevive.
  update internal.student_activation_tokens
  set attempt_count = attempt_count + 1
  where id = v_row.id;

  if v_row.status = 'revoked' then
    return query select 'revoked'::internal.activation_token_outcome,
                        v_row.id, v_row.student_id, v_row.subscription_plan_id;
    return;
  end if;

  if v_row.status = 'used' then
    return query select 'already_used'::internal.activation_token_outcome,
                        v_row.id, v_row.student_id, v_row.subscription_plan_id;
    return;
  end if;

  -- A validade é conferida pelo relógio, não pelo `status`. Marcar como
  -- `expired` é tarefa de manutenção que pode atrasar; a expiração real não.
  if v_row.status = 'expired' or v_row.expires_at <= now() then
    update internal.student_activation_tokens
    set status = 'expired'
    where id = v_row.id
      and status = 'active';

    return query select 'expired'::internal.activation_token_outcome,
                        v_row.id, v_row.student_id, v_row.subscription_plan_id;
    return;
  end if;

  update internal.student_activation_tokens
  set status = 'used', used_at = now()
  where id = v_row.id;

  return query select 'valid'::internal.activation_token_outcome,
                      v_row.id, v_row.student_id, v_row.subscription_plan_id;
end;
$$;

create or replace function internal.revoke_activation_token(
  p_token_id      uuid,
  p_admin_user_id uuid
)
returns boolean
language plpgsql
set search_path = ''
as $$
declare
  v_affected integer;
begin
  if not internal.is_admin_user(p_admin_user_id) then
    raise exception 'Operação restrita à administradora.' using errcode = '42501';
  end if;

  update internal.student_activation_tokens
  set status = 'revoked', revoked_at = now()
  where id = p_token_id
    and status = 'active';

  get diagnostics v_affected = row_count;

  if v_affected > 0 then
    insert into public.audit_logs (actor_id, action, entity_table, entity_id)
    values (
      p_admin_user_id, 'activation_token.revoked',
      'internal.student_activation_tokens', p_token_id::text
    );
  end if;

  return v_affected > 0;
end;
$$;

-- Manutenção. Idempotente e sem parâmetro: pode rodar em cron sem coordenação.
create or replace function internal.expire_activation_tokens()
returns integer
language plpgsql
set search_path = ''
as $$
declare
  v_affected integer;
begin
  update internal.student_activation_tokens
  set status = 'expired'
  where status = 'active'
    and expires_at <= now();

  get diagnostics v_affected = row_count;
  return v_affected;
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- Vínculo entre conta e cadastro
--
-- Substitui a busca por e-mail do `handle_new_user`. Aqui o `student_id` vem do
-- convite que originou a conta, não de coincidência de campo.
--
-- A comparação de e-mail continua existindo, mas como **asserção**: se o UUID
-- que o Supabase criou não corresponder ao e-mail do cadastro que pediu o
-- convite, alguma etapa do servidor errou e a operação precisa parar. É uma
-- verificação de coerência, não o mecanismo de vínculo.
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function internal.link_student_account(
  p_student_id   uuid,
  p_auth_user_id uuid,
  p_actor        text
)
returns void
language plpgsql
set search_path = ''
as $$
declare
  v_student    public.students;
  v_auth_email text;
begin
  if p_actor is null or length(btrim(p_actor)) = 0 then
    raise exception 'Identidade do processo autorizado é obrigatória.'
      using errcode = '22023';
  end if;

  select * into v_student
  from public.students
  where id = p_student_id
  for update;

  if not found then
    raise exception 'Cadastro não encontrado.' using errcode = 'P0002';
  end if;

  -- Falha explícita, e não `update ... where profile_id is null`, que teria
  -- afetado zero linhas e devolvido sucesso.
  if v_student.profile_id is not null then
    raise exception 'Cadastro já possui conta vinculada.' using errcode = 'P0007';
  end if;

  -- A mesma conta não serve para duas alunas. `students.profile_id` é único, o
  -- que já garantiria isso, mas a mensagem do índice não diz nada de útil.
  if exists (
    select 1 from public.students
    where profile_id = p_auth_user_id
  ) then
    raise exception 'Esta conta já está vinculada a outro cadastro.'
      using errcode = 'P0009';
  end if;

  select lower(btrim(u.email)) into v_auth_email
  from auth.users u
  where u.id = p_auth_user_id;

  if v_auth_email is null then
    raise exception 'Conta inexistente.' using errcode = 'P0002';
  end if;

  if v_auth_email <> v_student.email then
    raise exception 'Conta e cadastro não correspondem.' using errcode = 'P0010';
  end if;

  -- O trigger `on_auth_user_created` já criou o perfil; a garantia aqui existe
  -- para o caso de a conta ter sido criada por caminho que não passou por ele.
  insert into public.profiles (id, full_name)
  values (p_auth_user_id, v_student.full_name)
  on conflict (id) do nothing;

  insert into public.user_roles (user_id, role)
  values (p_auth_user_id, 'student')
  on conflict (user_id) do nothing;

  update public.students
  set profile_id = p_auth_user_id
  where id = p_student_id;

  insert into public.audit_logs (actor_id, action, entity_table, entity_id, metadata)
  values (
    null,
    'student.account_linked',
    'students',
    p_student_id::text,
    jsonb_build_object('auth_user_id', p_auth_user_id, 'actor', p_actor)
  );
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- Webhook: registro do evento
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function internal.record_payment_event(
  p_provider          text,
  p_provider_event_id text,
  p_event_type        text,
  p_payload_summary   jsonb default '{}'::jsonb,
  p_subscription_id   uuid default null
)
returns table (
  event_id          uuid,
  processing_status public.payment_event_processing_status,
  is_replay         boolean
)
language plpgsql
set search_path = ''
as $$
declare
  v_id     uuid;
  v_status public.payment_event_processing_status;
begin
  insert into public.payment_events (
    provider, provider_event_id, event_type, payload_summary, subscription_id
  )
  values (
    p_provider, p_provider_event_id, p_event_type, p_payload_summary, p_subscription_id
  )
  on conflict (provider, provider_event_id) do nothing
  -- Qualificado pelo nome da tabela porque `processing_status` também é uma das
  -- colunas de saída desta função, e PL/pgSQL trataria a referência nua como
  -- ambígua.
  returning payment_events.id, payment_events.processing_status
  into v_id, v_status;

  if v_id is not null then
    return query select v_id, v_status, false;
    return;
  end if;

  -- A linha já existia. Isso **não** quer dizer que foi processada: quem
  -- responde isso é `processing_status`, devolvido aqui para o servidor decidir.
  select pe.id, pe.processing_status into v_id, v_status
  from public.payment_events pe
  where pe.provider = p_provider
    and pe.provider_event_id = p_provider_event_id;

  return query select v_id, v_status, true;
end;
$$;

-- Reserva o evento para processamento. Devolve falso quando não há o que fazer:
-- já concluído, ou já tomado por outra execução dentro da janela do lease.
create or replace function internal.begin_payment_event_processing(
  p_event_id uuid,
  p_lease    interval default interval '5 minutes'
)
returns boolean
language plpgsql
set search_path = ''
as $$
declare
  v_row public.payment_events;
begin
  select * into v_row
  from public.payment_events
  where id = p_event_id
  for update;

  if not found then
    raise exception 'Evento não encontrado.' using errcode = 'P0002';
  end if;

  if v_row.processing_status = 'processed' then
    return false;
  end if;

  if v_row.processing_status = 'processing'
     and v_row.processing_started_at > now() - p_lease then
    return false;
  end if;

  update public.payment_events
  set processing_status = 'processing',
      processing_started_at = now(),
      attempt_count = attempt_count + 1,
      next_retry_at = null
  where id = p_event_id;

  return true;
end;
$$;

-- Conclusão: atualiza a assinatura, marca o evento e enfileira o convite numa
-- só transação. Se qualquer parte falhar, nada aconteceu — e o webhook pode ser
-- reentregue sem risco de cobrar ou ativar duas vezes.
create or replace function internal.complete_payment_event(
  p_event_id                 uuid,
  p_subscription_id          uuid,
  p_subscription_status      public.subscription_status,
  p_current_period_start     timestamptz default null,
  p_current_period_end       timestamptz default null,
  p_provider                 text default null,
  p_provider_subscription_id text default null,
  p_enqueue_invitation       boolean default true
)
returns void
language plpgsql
set search_path = ''
as $$
declare
  v_event      public.payment_events;
  v_student_id uuid;
  v_has_account boolean;
begin
  select * into v_event
  from public.payment_events
  where id = p_event_id
  for update;

  if not found then
    raise exception 'Evento não encontrado.' using errcode = 'P0002';
  end if;

  if v_event.processing_status = 'processed' then
    -- Reentrega de evento já concluído não toca a assinatura de novo. Sair em
    -- silêncio é o comportamento correto: o efeito desejado já existe.
    return;
  end if;

  if v_event.processing_status <> 'processing' then
    raise exception 'Evento não está reservado para processamento.'
      using errcode = 'P0011';
  end if;

  select s.student_id into v_student_id
  from public.subscriptions s
  where s.id = p_subscription_id
  for update;

  if v_student_id is null then
    raise exception 'Assinatura não encontrada.' using errcode = 'P0002';
  end if;

  update public.subscriptions
  set status = p_subscription_status,
      current_period_start = coalesce(p_current_period_start, current_period_start),
      current_period_end = coalesce(p_current_period_end, current_period_end),
      provider = coalesce(p_provider, provider),
      provider_subscription_id = coalesce(
        p_provider_subscription_id, provider_subscription_id
      ),
      cancelled_at = case
        when p_subscription_status = 'cancelled' then coalesce(cancelled_at, now())
        else null
      end
  where id = p_subscription_id;

  update public.payment_events
  set processing_status = 'processed',
      processed_at = now(),
      subscription_id = coalesce(subscription_id, p_subscription_id),
      last_error_code = null,
      next_retry_at = null
  where id = p_event_id;

  if p_enqueue_invitation and p_subscription_status = 'active' then
    select profile_id is not null into v_has_account
    from public.students
    where id = v_student_id;

    -- Só enfileira quem ainda não tem conta. O `on conflict` do índice parcial
    -- absorve a reentrega: uma aluna nunca recebe dois convites em voo.
    if not v_has_account then
      insert into internal.account_invitation_jobs (student_id, payment_event_id)
      values (v_student_id, p_event_id)
      on conflict do nothing;
    end if;
  end if;

  insert into public.audit_logs (action, entity_table, entity_id, metadata)
  values (
    'subscription.updated_by_payment_event',
    'subscriptions',
    p_subscription_id::text,
    jsonb_build_object(
      'payment_event_id', p_event_id,
      'status', p_subscription_status
    )
  );
end;
$$;

create or replace function internal.fail_payment_event(
  p_event_id    uuid,
  p_error_code  text,
  p_retry_after interval default interval '15 minutes'
)
returns void
language plpgsql
set search_path = ''
as $$
begin
  update public.payment_events
  set processing_status = 'failed',
      last_error_code = left(coalesce(p_error_code, 'unknown'), 64),
      next_retry_at = now() + p_retry_after
  where id = p_event_id
    and processing_status <> 'processed';
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- Fila de convites
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function internal.claim_invitation_job(
  p_lease interval default interval '5 minutes'
)
returns table (job_id uuid, student_id uuid, attempt_count integer)
language plpgsql
set search_path = ''
as $$
declare
  v_id uuid;
begin
  -- `skip locked` permite mais de um worker sem que eles disputem a mesma
  -- linha nem se bloqueiem.
  select j.id into v_id
  from internal.account_invitation_jobs j
  where j.status in ('pending', 'failed')
    and j.next_attempt_at <= now()
  order by j.next_attempt_at
  for update skip locked
  limit 1;

  if v_id is null then
    return;
  end if;

  update internal.account_invitation_jobs
  set status = 'processing',
      attempt_count = account_invitation_jobs.attempt_count + 1,
      next_attempt_at = now() + p_lease
  where id = v_id;

  return query
    select j.id, j.student_id, j.attempt_count
    from internal.account_invitation_jobs j
    where j.id = v_id;
end;
$$;

create or replace function internal.complete_invitation_job(p_job_id uuid)
returns void
language plpgsql
set search_path = ''
as $$
begin
  update internal.account_invitation_jobs
  set status = 'sent',
      processed_at = now(),
      last_error_code = null
  where id = p_job_id
    and status <> 'sent';
end;
$$;

create or replace function internal.fail_invitation_job(
  p_job_id      uuid,
  p_error_code  text,
  p_retry_after interval default interval '10 minutes'
)
returns void
language plpgsql
set search_path = ''
as $$
begin
  update internal.account_invitation_jobs
  set status = 'failed',
      last_error_code = left(coalesce(p_error_code, 'unknown'), 64),
      next_attempt_at = now() + p_retry_after
  where id = p_job_id
    and status <> 'sent';
end;
$$;

-- ============================================================================
-- Contrato do servidor: `public.srv_*`
--
-- As Edge Functions falam com o banco pela Data API, que só vê `public`. Estas
-- funções são a ponte: `security definer` para alcançar `internal`, e com
-- `EXECUTE` exclusivo de `service_role`.
--
-- Nenhuma delas é chamável por `anon` ou por `authenticated`. Em particular,
-- nenhuma aluna consegue emitir, consumir ou revogar convite, nem escolher a
-- qual cadastro sua conta será vinculada.
-- ============================================================================

create or replace function public.srv_issue_activation_token(
  p_student_id           uuid,
  p_subscription_plan_id uuid,
  p_admin_user_id        uuid,
  p_ttl                  interval default interval '7 days'
)
returns table (token_id uuid, raw_token text)
language sql
security definer
set search_path = ''
as $$
  select t.token_id, t.raw_token
  from internal.issue_activation_token(
    p_student_id, p_subscription_plan_id, p_admin_user_id, p_ttl
  ) t;
$$;

-- `outcome` sai como `text`, e não como o enum de `internal`: usar o tipo exigiria
-- que `service_role` tivesse `usage` no schema, que é exatamente o que estamos
-- negando. Os valores possíveis estão em `internal.activation_token_outcome`.
create or replace function public.srv_consume_activation_token(p_token text)
returns table (
  outcome              text,
  token_id             uuid,
  student_id           uuid,
  subscription_plan_id uuid
)
language sql
security definer
set search_path = ''
as $$
  select t.outcome::text, t.token_id, t.student_id, t.subscription_plan_id
  from internal.consume_activation_token(p_token) t;
$$;

create or replace function public.srv_revoke_activation_token(
  p_token_id      uuid,
  p_admin_user_id uuid
)
returns boolean
language sql
security definer
set search_path = ''
as $$
  select internal.revoke_activation_token(p_token_id, p_admin_user_id);
$$;

create or replace function public.srv_link_student_account(
  p_student_id   uuid,
  p_auth_user_id uuid,
  p_actor        text
)
returns void
language sql
security definer
set search_path = ''
as $$
  select internal.link_student_account(p_student_id, p_auth_user_id, p_actor);
$$;

create or replace function public.srv_record_payment_event(
  p_provider          text,
  p_provider_event_id text,
  p_event_type        text,
  p_payload_summary   jsonb default '{}'::jsonb,
  p_subscription_id   uuid default null
)
returns table (
  event_id          uuid,
  processing_status public.payment_event_processing_status,
  is_replay         boolean
)
language sql
security definer
set search_path = ''
as $$
  select e.event_id, e.processing_status, e.is_replay
  from internal.record_payment_event(
    p_provider, p_provider_event_id, p_event_type, p_payload_summary, p_subscription_id
  ) e;
$$;

create or replace function public.srv_begin_payment_event_processing(
  p_event_id uuid,
  p_lease    interval default interval '5 minutes'
)
returns boolean
language sql
security definer
set search_path = ''
as $$
  select internal.begin_payment_event_processing(p_event_id, p_lease);
$$;

create or replace function public.srv_complete_payment_event(
  p_event_id                 uuid,
  p_subscription_id          uuid,
  p_subscription_status      public.subscription_status,
  p_current_period_start     timestamptz default null,
  p_current_period_end       timestamptz default null,
  p_provider                 text default null,
  p_provider_subscription_id text default null,
  p_enqueue_invitation       boolean default true
)
returns void
language sql
security definer
set search_path = ''
as $$
  select internal.complete_payment_event(
    p_event_id, p_subscription_id, p_subscription_status,
    p_current_period_start, p_current_period_end,
    p_provider, p_provider_subscription_id, p_enqueue_invitation
  );
$$;

create or replace function public.srv_fail_payment_event(
  p_event_id    uuid,
  p_error_code  text,
  p_retry_after interval default interval '15 minutes'
)
returns void
language sql
security definer
set search_path = ''
as $$
  select internal.fail_payment_event(p_event_id, p_error_code, p_retry_after);
$$;

create or replace function public.srv_claim_invitation_job(
  p_lease interval default interval '5 minutes'
)
returns table (job_id uuid, student_id uuid, attempt_count integer)
language sql
security definer
set search_path = ''
as $$
  select j.job_id, j.student_id, j.attempt_count
  from internal.claim_invitation_job(p_lease) j;
$$;

create or replace function public.srv_complete_invitation_job(p_job_id uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  select internal.complete_invitation_job(p_job_id);
$$;

create or replace function public.srv_fail_invitation_job(
  p_job_id      uuid,
  p_error_code  text,
  p_retry_after interval default interval '10 minutes'
)
returns void
language sql
security definer
set search_path = ''
as $$
  select internal.fail_invitation_job(p_job_id, p_error_code, p_retry_after);
$$;

create or replace function public.srv_expire_activation_tokens()
returns integer
language sql
security definer
set search_path = ''
as $$
  select internal.expire_activation_tokens();
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- RLS nas tabelas internas
--
-- Redundante hoje: sem `usage` no schema e sem constar em `[api] schemas`, estas
-- tabelas já são inalcançáveis. Está aqui para o caso de alguém, no futuro,
-- adicionar `internal` à lista de schemas expostos ou conceder `usage` por
-- engano. Com RLS ligado e nenhuma política, o resultado dessa mudança seria
-- zero linhas em vez de vazamento.
--
-- As funções acima não são afetadas: `enable row level security` não se aplica
-- ao dono da tabela, e elas rodam como o dono. Deliberadamente **não** usamos
-- `force row level security`, que sujeitaria o dono às políticas e, sem nenhuma
-- política definida, quebraria todo o pipeline.
-- ─────────────────────────────────────────────────────────────────────────────

alter table internal.student_activation_tokens enable row level security;
alter table internal.account_invitation_jobs   enable row level security;
