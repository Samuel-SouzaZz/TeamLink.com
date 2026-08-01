-- ============================================================================
-- TeamLink — esquema inicial do sistema de agendamento
--
-- Convenções adotadas em todo o arquivo:
--   * Todo instante é `timestamptz` e fica gravado em UTC. A conversão para
--     America/Sao_Paulo acontece só na exibição.
--   * Nada é apagado. O ciclo de vida é controlado por `status`, `archived_at`
--     e `cancelled_at`; nenhuma chave estrangeira usa `on delete cascade` nem
--     `on delete set null` — todas são `restrict`, para que apagar algo exija
--     uma decisão deliberada em vez de acontecer em silêncio.
--   * Toda chave estrangeira tem índice — o Postgres não cria sozinho.
--   * Valor financeiro é inteiro em centavos. Nunca `float`, nunca `numeric`
--     com casas decimais implícitas.
-- ============================================================================

-- pgcrypto fica em `extensions`, o schema que o Supabase reserva para isso, e
-- não em `public`. As funções privilegiadas rodam com `search_path = ''` e
-- referenciam `extensions.gen_random_bytes` pelo nome completo; deixar a
-- extensão em `public` tornaria essa qualificação mentirosa.
create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

-- ─────────────────────────────────────────────────────────────────────────────
-- Tipos
-- ─────────────────────────────────────────────────────────────────────────────

create type public.app_role as enum ('admin', 'student');
create type public.student_status as enum ('active', 'archived');
create type public.service_kind as enum ('group_class', 'personal');
create type public.appointment_status as enum (
  'scheduled', 'confirmed', 'cancelled', 'completed', 'no_show'
);
create type public.attendance_status as enum ('present', 'absent', 'excused');
create type public.subscription_status as enum (
  'pending', 'active', 'past_due', 'cancelled'
);

-- Estado do processamento de um webhook. Distinguir "recebido" de "processado"
-- é o que impede que uma reentrega seja descartada como duplicada quando a
-- primeira tentativa morreu no meio do caminho.
create type public.payment_event_processing_status as enum (
  'received', 'processing', 'processed', 'failed'
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Papéis
--
-- Tabela separada, e não uma coluna em `profiles`, porque o acesso a ela é
-- diferente de todo o resto: ninguém autenticado pode ler nem escrever aqui.
-- Só o servidor de autenticação a consulta, ao emitir o token.
--
-- `unique (user_id)` — e não `(user_id, role)`. Permitir os dois papéis para a
-- mesma pessoa obrigaria o hook a escolher um deles com `limit 1`, e essa
-- escolha arbitrária seria uma decisão de autorização tomada por ordem de
-- inserção. Uma pessoa tem exatamente um papel.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.user_roles (
  user_id     uuid primary key references auth.users (id) on delete restrict,
  role        public.app_role not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.user_roles is
  'Fonte de verdade dos papéis. Tabela restrita no schema public: sem GRANT '
  'para anon ou authenticated e com RLS que só libera supabase_auth_admin. '
  'Lida exclusivamente pelo custom_access_token_hook.';

-- ─────────────────────────────────────────────────────────────────────────────
-- Perfis
-- ─────────────────────────────────────────────────────────────────────────────

create table public.profiles (
  id          uuid primary key references auth.users (id) on delete restrict,
  full_name   text,
  phone       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Alunas
--
-- `profile_id` é nulo enquanto a aluna ainda não criou a conta: a Karol cadastra
-- primeiro, o convite sai depois. É o que permite existir cadastro sem login.
--
-- O vínculo é `unique` e `on delete restrict`. `set null` desfaria o vínculo em
-- silêncio se alguém apagasse o perfil, e uma aluna sem `profile_id` volta a
-- ser candidata a um convite novo — ou seja, o descuido viraria brecha.
--
-- `email` é `text` normalizado por constraint, não `citext`. A normalização
-- explícita garante que o valor gravado é exatamente o que o servidor vai
-- comparar ao convidar alguém: sem espaço nas pontas e sem maiúsculas. `citext`
-- resolveria o caso das maiúsculas e deixaria passar `" ana@x.com"`.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.students (
  id           uuid primary key default gen_random_uuid(),
  profile_id   uuid unique references public.profiles (id) on delete restrict,
  full_name    text not null check (length(trim(full_name)) > 0),
  email        text not null unique
                 constraint students_email_normalized
                 check (email = lower(btrim(email)) and position('@' in email) > 1),
  phone        text,
  status       public.student_status not null default 'active',
  joined_at    timestamptz not null default now(),
  archived_at  timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  -- Arquivada exige data, ativa não pode ter. Impede o par incoerente.
  constraint students_archived_at_matches_status check (
    (status = 'archived' and archived_at is not null)
    or (status = 'active' and archived_at is null)
  )
);

create index students_profile_id_idx on public.students (profile_id);
create index students_status_idx on public.students (status);
create index students_full_name_idx on public.students (full_name);

-- ─────────────────────────────────────────────────────────────────────────────
-- Serviços e disponibilidade
-- ─────────────────────────────────────────────────────────────────────────────

create table public.services (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  kind              public.service_kind not null,
  duration_minutes  integer not null check (duration_minutes between 15 and 240),
  capacity          integer not null check (capacity > 0),
  active            boolean not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Regra recorrente ("toda terça 19h"), usada para gerar os horários concretos.
create table public.availability_rules (
  id          uuid primary key default gen_random_uuid(),
  service_id  uuid not null references public.services (id),
  weekday     smallint not null check (weekday between 0 and 6),
  start_time  time not null,
  end_time    time not null,
  capacity    integer not null check (capacity > 0),
  active      boolean not null default true,
  created_at  timestamptz not null default now(),

  constraint availability_rules_time_order check (end_time > start_time)
);

create index availability_rules_service_id_idx on public.availability_rules (service_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- Horários concretos
--
-- `booked_count` é denormalizado de propósito: contar agendamentos a cada
-- consulta de vaga sairia caro, e o contador é mantido exclusivamente pelas
-- funções transacionais abaixo, sob trava de linha.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.schedule_slots (
  id            uuid primary key default gen_random_uuid(),
  service_id    uuid not null references public.services (id),
  starts_at     timestamptz not null,
  ends_at       timestamptz not null,
  capacity      integer not null check (capacity > 0),
  booked_count  integer not null default 0 check (booked_count >= 0),
  cancelled_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  constraint schedule_slots_time_order check (ends_at > starts_at),
  -- Rede de segurança final: mesmo que uma função tenha bug, o banco recusa
  -- passar da capacidade.
  constraint schedule_slots_capacity_not_exceeded check (booked_count <= capacity),
  -- Impede duas turmas idênticas do mesmo serviço no mesmo instante.
  unique (service_id, starts_at)
);

create index schedule_slots_service_id_idx on public.schedule_slots (service_id);
create index schedule_slots_starts_at_idx on public.schedule_slots (starts_at);
create index schedule_slots_open_idx
  on public.schedule_slots (starts_at)
  where cancelled_at is null;

-- ─────────────────────────────────────────────────────────────────────────────
-- Agendamentos
-- ─────────────────────────────────────────────────────────────────────────────

create table public.appointments (
  id                   uuid primary key default gen_random_uuid(),
  slot_id              uuid not null references public.schedule_slots (id),
  student_id           uuid not null references public.students (id),
  service_id           uuid not null references public.services (id),
  status               public.appointment_status not null default 'scheduled',
  starts_at            timestamptz not null,
  ends_at              timestamptz not null,
  cancelled_at         timestamptz,
  cancellation_reason  text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),

  constraint appointments_time_order check (ends_at > starts_at),
  constraint appointments_cancelled_at_matches_status check (
    (status = 'cancelled' and cancelled_at is not null)
    or (status <> 'cancelled' and cancelled_at is null)
  )
);

create index appointments_student_id_idx on public.appointments (student_id);
create index appointments_slot_id_idx on public.appointments (slot_id);
create index appointments_service_id_idx on public.appointments (service_id);
create index appointments_starts_at_idx on public.appointments (starts_at desc);
create index appointments_student_history_idx
  on public.appointments (student_id, starts_at desc);

-- A mesma aluna não entra duas vezes no mesmo horário. Parcial, porque depois
-- de cancelar ela pode reservar de novo.
create unique index appointments_one_active_per_slot_idx
  on public.appointments (slot_id, student_id)
  where status <> 'cancelled';

-- ─────────────────────────────────────────────────────────────────────────────
-- Presenças
-- ─────────────────────────────────────────────────────────────────────────────

create table public.attendance_records (
  id              uuid primary key default gen_random_uuid(),
  appointment_id  uuid not null unique references public.appointments (id),
  student_id      uuid not null references public.students (id),
  status          public.attendance_status not null,
  recorded_by     uuid references public.profiles (id),
  recorded_at     timestamptz not null default now()
);

create index attendance_records_student_id_idx on public.attendance_records (student_id);
create index attendance_records_recorded_by_idx on public.attendance_records (recorded_by);

-- ─────────────────────────────────────────────────────────────────────────────
-- Planos e assinaturas
-- ─────────────────────────────────────────────────────────────────────────────

create table public.subscription_plans (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  description      text,
  price_cents      integer not null check (price_cents >= 0),
  billing_period   text not null default 'monthly' check (billing_period in ('monthly')),
  classes_per_week smallint check (classes_per_week > 0),
  active           boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table public.subscriptions (
  id                        uuid primary key default gen_random_uuid(),
  student_id                uuid not null references public.students (id),
  plan_id                   uuid not null references public.subscription_plans (id),
  status                    public.subscription_status not null default 'pending',
  current_period_start      timestamptz,
  current_period_end        timestamptz,
  cancelled_at              timestamptz,
  -- Identificadores do provedor. Guardamos o mínimo para reconciliar; nenhum
  -- dado de cartão trafega ou é armazenado aqui.
  provider                  text check (provider in ('pagbank')),
  provider_subscription_id  text,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now(),

  constraint subscriptions_period_order check (
    current_period_end is null
    or current_period_start is null
    or current_period_end > current_period_start
  ),
  constraint subscriptions_cancelled_at_matches_status check (
    (status = 'cancelled' and cancelled_at is not null)
    or (status <> 'cancelled' and cancelled_at is null)
  ),
  -- Ou os dois campos do provedor estão preenchidos, ou nenhum está. Meio
  -- vínculo é pior que vínculo nenhum: não dá para reconciliar.
  constraint subscriptions_provider_pair check (
    (provider is null and provider_subscription_id is null)
    or (provider is not null and provider_subscription_id is not null)
  )
);

create index subscriptions_student_id_idx on public.subscriptions (student_id);
create index subscriptions_plan_id_idx on public.subscriptions (plan_id);
create index subscriptions_status_idx on public.subscriptions (status);

-- Índice único parcial, e não constraint de tabela: como `unique` trata cada
-- NULL como distinto, a constraint deixaria conviver quantas assinaturas sem
-- provedor quisessem — o que é correto — mas o índice parcial diz isso de
-- forma explícita e cobre apenas as linhas que realmente têm identificador.
create unique index subscriptions_provider_ref_idx
  on public.subscriptions (provider, provider_subscription_id)
  where provider is not null and provider_subscription_id is not null;

-- Uma aluna só pode ter uma assinatura vigente por vez; as encerradas ficam.
create unique index subscriptions_one_open_per_student_idx
  on public.subscriptions (student_id)
  where status in ('pending', 'active', 'past_due');

-- ─────────────────────────────────────────────────────────────────────────────
-- Eventos de pagamento
--
-- Log dos webhooks, com máquina de estados própria.
--
-- `unique (provider, provider_event_id)` continua existindo, mas conflito nessa
-- chave **não** significa "já processado". Um evento pode ter sido inserido e a
-- execução morrer antes de tocar a assinatura — nesse caso a linha existe com
-- `processing_status = 'received'` e a reentrega precisa poder tentar de novo.
-- Quem decide isso é `processing_status`, nunca a existência da linha.
--
-- Transições válidas:
--   received   → processing → processed        (caminho feliz)
--   received   → processing → failed → processing → …   (nova tentativa)
--   processed  → (terminal, nada mais acontece)
-- ─────────────────────────────────────────────────────────────────────────────

create table public.payment_events (
  id                    uuid primary key default gen_random_uuid(),
  subscription_id       uuid references public.subscriptions (id),
  provider              text not null check (provider in ('pagbank')),
  provider_event_id     text not null,
  event_type            text not null,
  processing_status     public.payment_event_processing_status not null default 'received',
  attempt_count         integer not null default 0 check (attempt_count >= 0),
  -- Código curto e estável ('signature_invalid', 'provider_unreachable'…).
  -- Nunca mensagem do provedor: ela pode carregar dado do cartão ou da pessoa.
  last_error_code       text check (last_error_code is null or length(last_error_code) <= 64),
  -- Resumo já filtrado. Payload cru do provedor não entra aqui: ele pode
  -- conter dado sensível e este registro é permanente.
  payload_summary       jsonb not null default '{}'::jsonb,
  received_at           timestamptz not null default now(),
  processing_started_at timestamptz,
  processed_at          timestamptz,
  next_retry_at         timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),

  unique (provider, provider_event_id),

  -- `processed` sem data de conclusão seria um estado que mente. E qualquer
  -- estado diferente de `processed` com `processed_at` preenchido também.
  constraint payment_events_processed_at_matches_status check (
    (processing_status = 'processed' and processed_at is not null)
    or (processing_status <> 'processed' and processed_at is null)
  ),
  constraint payment_events_processing_started check (
    processing_status = 'received' or processing_started_at is not null
  )
);

create index payment_events_subscription_id_idx on public.payment_events (subscription_id);
create index payment_events_received_at_idx on public.payment_events (received_at desc);

-- Fila de retentativa: só as linhas que ainda dão trabalho entram no índice.
create index payment_events_pending_idx
  on public.payment_events (next_retry_at)
  where processing_status in ('received', 'failed');

-- ─────────────────────────────────────────────────────────────────────────────
-- Lista de espera
-- ─────────────────────────────────────────────────────────────────────────────

create table public.waitlist_entries (
  id          uuid primary key default gen_random_uuid(),
  slot_id     uuid not null references public.schedule_slots (id),
  student_id  uuid not null references public.students (id),
  created_at  timestamptz not null default now(),
  removed_at  timestamptz,

  unique (slot_id, student_id)
);

create index waitlist_entries_slot_id_idx on public.waitlist_entries (slot_id);
create index waitlist_entries_student_id_idx on public.waitlist_entries (student_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- Anotações privadas
--
-- Conteúdo exclusivo da Karol. Nenhuma política dá acesso à aluna, e é por isso
-- que estas anotações moram numa tabela própria em vez de uma coluna em
-- `students`: separar a tabela torna impossível vazá-las por descuido num
-- `select *`.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.private_notes (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid not null references public.students (id),
  author_id   uuid not null references public.profiles (id),
  body        text not null check (length(trim(body)) > 0),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index private_notes_student_id_idx on public.private_notes (student_id);
create index private_notes_author_id_idx on public.private_notes (author_id);
create index private_notes_created_at_idx on public.private_notes (created_at desc);

-- ─────────────────────────────────────────────────────────────────────────────
-- Auditoria
-- ─────────────────────────────────────────────────────────────────────────────

create table public.audit_logs (
  id            bigint generated always as identity primary key,
  actor_id      uuid references public.profiles (id),
  action        text not null,
  entity_table  text not null,
  entity_id     text,
  metadata      jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now()
);

create index audit_logs_actor_id_idx on public.audit_logs (actor_id);
create index audit_logs_entity_idx on public.audit_logs (entity_table, entity_id);
create index audit_logs_created_at_idx on public.audit_logs (created_at desc);

-- ─────────────────────────────────────────────────────────────────────────────
-- updated_at automático
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger user_roles_set_updated_at
  before update on public.user_roles
  for each row execute function public.set_updated_at();

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger students_set_updated_at
  before update on public.students
  for each row execute function public.set_updated_at();

create trigger services_set_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

create trigger schedule_slots_set_updated_at
  before update on public.schedule_slots
  for each row execute function public.set_updated_at();

create trigger appointments_set_updated_at
  before update on public.appointments
  for each row execute function public.set_updated_at();

create trigger subscription_plans_set_updated_at
  before update on public.subscription_plans
  for each row execute function public.set_updated_at();

create trigger subscriptions_set_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

create trigger payment_events_set_updated_at
  before update on public.payment_events
  for each row execute function public.set_updated_at();

create trigger private_notes_set_updated_at
  before update on public.private_notes
  for each row execute function public.set_updated_at();
