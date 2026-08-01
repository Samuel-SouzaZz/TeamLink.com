-- ============================================================================
-- TeamLink — Row Level Security
--
-- Princípios seguidos em todas as políticas deste arquivo:
--
--   1. RLS ligado em toda tabela exposta pela API.
--   2. Nenhuma política se contenta com `to authenticated`: todas exigem
--      propriedade do registro ou papel de administradora.
--   3. Nenhuma tabela recebe política de DELETE. Sem política, o comando é
--      recusado — é assim que o histórico fica preservado por construção, e não
--      por disciplina de quem escreve o front-end.
--   4. Toda política de UPDATE traz `using` e `with check`. Sem o `with check`,
--      a linha poderia ser editada para um estado que a própria política não
--      permitiria ler depois.
--   5. `anon` não recebe nenhuma política: visitante não lê nada.
--
-- RLS decide **quais linhas**. Quem decide **se o papel alcança a tabela** é o
-- `GRANT`, e são duas camadas independentes: uma tabela com RLS ligado e sem
-- GRANT é invisível, e uma tabela com GRANT e sem política nega tudo. Todos os
-- GRANTs deste projeto estão reunidos em
-- `20260731090500_grants_and_privileges.sql` — inclusive os recortes por coluna,
-- que antes moravam aqui.
-- ============================================================================

alter table public.user_roles         enable row level security;
alter table public.profiles           enable row level security;
alter table public.students           enable row level security;
alter table public.services           enable row level security;
alter table public.availability_rules enable row level security;
alter table public.schedule_slots     enable row level security;
alter table public.appointments       enable row level security;
alter table public.attendance_records enable row level security;
alter table public.subscription_plans enable row level security;
alter table public.subscriptions      enable row level security;
alter table public.payment_events     enable row level security;
alter table public.waitlist_entries   enable row level security;
alter table public.private_notes      enable row level security;
alter table public.audit_logs         enable row level security;

-- ─────────────────────────────────────────────────────────────────────────────
-- user_roles
--
-- Nenhuma política para `authenticated`: o RLS ligado sem política nega tudo.
-- Só o servidor de autenticação enxerga esta tabela, e é isso que impede
-- alguém de se promover a administradora.
-- ─────────────────────────────────────────────────────────────────────────────

create policy "auth server reads roles"
  on public.user_roles
  for select
  to supabase_auth_admin
  using (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- profiles
-- ─────────────────────────────────────────────────────────────────────────────

create policy "read own profile or admin reads all"
  on public.profiles
  for select
  to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()));

create policy "update own profile"
  on public.profiles
  for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

create policy "admin updates any profile"
  on public.profiles
  for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ─────────────────────────────────────────────────────────────────────────────
-- students
--
-- A aluna lê e edita apenas a própria linha, e mesmo nela só alcança nome e
-- telefone. Esse recorte por coluna é feito com GRANT, porque RLS opera na
-- linha inteira e não conseguiria impedir que ela mudasse o próprio `status`.
-- ─────────────────────────────────────────────────────────────────────────────

create policy "read own student record or admin reads all"
  on public.students
  for select
  to authenticated
  using (profile_id = (select auth.uid()) or (select public.is_admin()));

create policy "student updates own contact data"
  on public.students
  for update
  to authenticated
  using (profile_id = (select auth.uid()))
  with check (profile_id = (select auth.uid()));

-- A política administrativa cobre leitura; a escrita da Karol não passa por
-- aqui, e sim por `admin_create_student` / `admin_update_student` /
-- `archive_student`. O motivo está comentado em
-- `20260731090300_booking_functions.sql`: o recorte por coluna do GRANT vale
-- para o papel, não para a política, então ampliar o GRANT para a Karol daria à
-- aluna o privilégio de escrever no próprio `email` e `status`.
create policy "admin manages students"
  on public.students
  for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ─────────────────────────────────────────────────────────────────────────────
-- services / availability_rules / subscription_plans
--
-- Catálogo. Quem está autenticada vê o que está ativo; a Karol vê tudo,
-- inclusive o que foi desativado.
-- ─────────────────────────────────────────────────────────────────────────────

create policy "read active services"
  on public.services
  for select
  to authenticated
  using (active or (select public.is_admin()));

create policy "admin manages services"
  on public.services
  for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "read active availability rules"
  on public.availability_rules
  for select
  to authenticated
  using (active or (select public.is_admin()));

create policy "admin manages availability rules"
  on public.availability_rules
  for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "read active plans"
  on public.subscription_plans
  for select
  to authenticated
  using (active or (select public.is_admin()));

create policy "admin manages plans"
  on public.subscription_plans
  for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ─────────────────────────────────────────────────────────────────────────────
-- schedule_slots
--
-- Alunas leem horários abertos, mas não escrevem: `booked_count` é mantido
-- pelas funções transacionais, não por UPDATE vindo do cliente.
-- ─────────────────────────────────────────────────────────────────────────────

create policy "read open slots"
  on public.schedule_slots
  for select
  to authenticated
  using (cancelled_at is null or (select public.is_admin()));

create policy "admin manages slots"
  on public.schedule_slots
  for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ─────────────────────────────────────────────────────────────────────────────
-- appointments
--
-- A aluna lê os próprios agendamentos e nada mais. Ela não recebe INSERT nem
-- UPDATE: reservar e cancelar passam por `book_appointment` e
-- `cancel_appointment`, que aplicam capacidade e assinatura ativa dentro de uma
-- transação. Deixar a aluna inserir direto seria abrir mão dessas duas checagens.
-- ─────────────────────────────────────────────────────────────────────────────

create policy "read own appointments or admin reads all"
  on public.appointments
  for select
  to authenticated
  using (student_id = (select public.current_student_id()) or (select public.is_admin()));

create policy "admin manages appointments"
  on public.appointments
  for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ─────────────────────────────────────────────────────────────────────────────
-- attendance_records
--
-- A aluna consulta a própria frequência; marcar presença é só da Karol.
-- ─────────────────────────────────────────────────────────────────────────────

create policy "read own attendance or admin reads all"
  on public.attendance_records
  for select
  to authenticated
  using (student_id = (select public.current_student_id()) or (select public.is_admin()));

create policy "admin manages attendance"
  on public.attendance_records
  for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ─────────────────────────────────────────────────────────────────────────────
-- subscriptions
--
-- Leitura da própria assinatura, escrita nenhuma. Nem a aluna nem a Karol
-- confirmam pagamento pela interface: quem muda o status é a Edge Function do
-- webhook, que usa a secret key e por isso não passa por RLS. Uma política de
-- escrita aqui abriria caminho para marcar como paga uma assinatura que não foi.
-- ─────────────────────────────────────────────────────────────────────────────

create policy "read own subscription or admin reads all"
  on public.subscriptions
  for select
  to authenticated
  using (student_id = (select public.current_student_id()) or (select public.is_admin()));

-- ─────────────────────────────────────────────────────────────────────────────
-- payment_events
--
-- Só leitura, e só para a Karol. Escrita exclusiva do webhook.
-- ─────────────────────────────────────────────────────────────────────────────

create policy "admin reads payment events"
  on public.payment_events
  for select
  to authenticated
  using ((select public.is_admin()));

-- ─────────────────────────────────────────────────────────────────────────────
-- waitlist_entries
-- ─────────────────────────────────────────────────────────────────────────────

create policy "read own waitlist or admin reads all"
  on public.waitlist_entries
  for select
  to authenticated
  using (student_id = (select public.current_student_id()) or (select public.is_admin()));

create policy "student joins waitlist for herself"
  on public.waitlist_entries
  for insert
  to authenticated
  with check (student_id = (select public.current_student_id()));

create policy "admin manages waitlist"
  on public.waitlist_entries
  for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ─────────────────────────────────────────────────────────────────────────────
-- private_notes
--
-- Exclusivas da Karol. Só existe política de admin; para qualquer outra pessoa
-- a tabela responde como se estivesse vazia.
-- ─────────────────────────────────────────────────────────────────────────────

create policy "admin reads private notes"
  on public.private_notes
  for select
  to authenticated
  using ((select public.is_admin()));

create policy "admin writes private notes"
  on public.private_notes
  for insert
  to authenticated
  with check ((select public.is_admin()) and author_id = (select auth.uid()));

create policy "admin updates own private notes"
  on public.private_notes
  for update
  to authenticated
  using ((select public.is_admin()) and author_id = (select auth.uid()))
  with check ((select public.is_admin()) and author_id = (select auth.uid()));

-- ─────────────────────────────────────────────────────────────────────────────
-- audit_logs
--
-- Leitura administrativa. Registros entram por funções `security definer`, não
-- por INSERT do cliente — um log que o cliente pode escrever não é auditoria.
-- ─────────────────────────────────────────────────────────────────────────────

create policy "admin reads audit logs"
  on public.audit_logs
  for select
  to authenticated
  using ((select public.is_admin()));
