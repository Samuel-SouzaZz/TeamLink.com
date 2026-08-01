-- ============================================================================
-- TeamLink — privilégios da Data API
--
-- ── Por que este arquivo existe ─────────────────────────────────────────────
--
-- Até 2026 o Supabase concedia `select, insert, update, delete` a `anon`,
-- `authenticated` e `service_role` em toda tabela criada em `public`, e
-- `execute` em toda função. Toda migration ganhava exposição de graça, e a
-- segurança dependia inteiramente do RLS.
--
-- Isso mudou. Projetos novos deixaram de expor tabelas automaticamente a partir
-- de 30/05/2026, e projetos existentes recebem a mudança em 30/10/2026
-- (changelog 45329). Concretamente: **sem GRANT explícito, o portal simplesmente
-- não funciona no projeto novo** — a Data API responde como se a tabela não
-- existisse. E, nos dois cenários, depender do padrão é errado nas duas
-- direções: ou expõe o que não devia, ou esconde o que precisa aparecer.
--
-- Consultado em 01/08/2026:
--   https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically
--   https://supabase.com/docs/guides/api/securing-your-api
--
-- ── O desenho ───────────────────────────────────────────────────────────────
--
-- A única escrita direta que o cliente tem em todo o sistema é a aluna
-- atualizando o próprio nome e telefone. Tudo o mais — inclusive o que a Karol
-- faz — passa por função que valida quem chamou.
--
-- Isso é mais restritivo do que o necessário para o RLS funcionar, e é
-- deliberado: um GRANT amplo depende de a política estar correta hoje e
-- continuar correta depois de cada mudança. Um GRANT ausente não depende de
-- nada.
--
-- Nenhum `DELETE` é concedido a ninguém, em nenhuma tabela.
-- ============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- Ponto de partida: nada
--
-- Revoga tudo antes de conceder qualquer coisa, para que o resultado final não
-- dependa do que o Supabase concedeu por padrão no momento em que a migration
-- rodou. O mesmo arquivo produz o mesmo estado num projeto de antes e de depois
-- da mudança de 2026.
-- ─────────────────────────────────────────────────────────────────────────────

do $$
declare
  v_table text;
begin
  for v_table in
    select format('%I.%I', schemaname, tablename)
    from pg_tables
    where schemaname = 'public'
  loop
    execute format(
      'revoke all on table %s from anon, authenticated, service_role', v_table
    );
  end loop;
end;
$$;

-- `usage` no schema fica. Sem privilégio em tabela nenhuma ela não abre nada, e
-- revogá-la quebraria a checagem de saúde que o PostgREST faz na inicialização.
grant usage on schema public to anon, authenticated, service_role;

-- ─────────────────────────────────────────────────────────────────────────────
-- anon
--
-- Visitante não recebe nada. O site institucional é estático e não fala com o
-- banco; a tela de login precisa apenas do endpoint de autenticação, que não
-- passa pela Data API.
--
-- Consequência: `/ativar` não consegue ler nem a lista de planos. É intencional
-- — o plano vem do convite validado no servidor, não de uma consulta feita pelo
-- navegador de quem ainda não tem conta.
-- ─────────────────────────────────────────────────────────────────────────────

-- (nenhum grant para anon)

-- ─────────────────────────────────────────────────────────────────────────────
-- authenticated — leitura
--
-- O recorte de linhas é do RLS. Aqui só decidimos quais tabelas o papel alcança.
-- ─────────────────────────────────────────────────────────────────────────────

grant select on table public.profiles           to authenticated;
grant select on table public.students           to authenticated;
grant select on table public.services           to authenticated;
grant select on table public.availability_rules to authenticated;
grant select on table public.schedule_slots     to authenticated;
grant select on table public.appointments       to authenticated;
grant select on table public.attendance_records to authenticated;
grant select on table public.subscription_plans to authenticated;
grant select on table public.subscriptions      to authenticated;
grant select on table public.waitlist_entries   to authenticated;
grant select on table public.audit_logs         to authenticated;

-- `payment_events` e `private_notes` recebem `select` porque a Karol também é
-- `authenticated` — não existe papel de banco separado para ela. O que impede a
-- aluna de ler é a política, que exige `is_admin()`: para ela a tabela responde
-- vazia. Os testes pgTAP verificam exatamente isso.
grant select on table public.payment_events to authenticated;
grant select on table public.private_notes  to authenticated;

-- `user_roles` não aparece nesta lista, e é o ponto mais importante do arquivo.
-- Sem GRANT, `authenticated` não lê nem escreve a origem dos papéis. Quem a
-- consulta é `supabase_auth_admin`, ao emitir o token.

-- ─────────────────────────────────────────────────────────────────────────────
-- authenticated — escrita
-- ─────────────────────────────────────────────────────────────────────────────

-- A aluna corrigindo o próprio contato. Duas colunas, e só.
--
-- Sem este recorte, o `with check (profile_id = auth.uid())` da política não
-- impediria nada: ela estaria editando a própria linha, o que a política
-- permite. Quem impede que `status`, `archived_at`, `email` e `profile_id` sejam
-- alcançados é a ausência de privilégio na coluna — recusada com `42501` antes
-- de o RLS ser avaliado.
grant update (full_name, phone) on table public.students to authenticated;
grant update (full_name, phone) on table public.profiles to authenticated;

-- Catálogo. Escrita restrita à Karol pela política; o dano possível é limitado a
-- dado de configuração, sem histórico nem valor financeiro em jogo.
grant insert, update on table public.services           to authenticated;
grant insert, update on table public.availability_rules to authenticated;
grant insert, update on table public.subscription_plans to authenticated;

-- Horários: a Karol cria e ajusta, mas `booked_count` está fora das duas listas.
-- Nem ela consegue escrever no contador pela API — a única forma de alterá-lo é
-- `book_appointment`, `cancel_appointment` ou `reconcile_slot_counts`, e as três
-- recalculam ou incrementam sob trava de linha. Um contador que o cliente pode
-- escrever é um contador que pode ser posto abaixo do real para liberar vaga.
grant insert (service_id, starts_at, ends_at, capacity)
  on table public.schedule_slots to authenticated;
grant update (service_id, starts_at, ends_at, capacity, cancelled_at)
  on table public.schedule_slots to authenticated;

-- Agendamentos: nenhum `insert` para ninguém. Reservar é `book_appointment` (a
-- aluna) ou `admin_book_appointment` (a Karol), porque inserir a linha sem
-- incrementar o contador na mesma transação produziria vaga fantasma.
--
-- `update (status)` existe para a Karol confirmar presença, concluir ou marcar
-- falta. Cancelar não passa por aqui: a constraint
-- `appointments_cancelled_at_matches_status` exige `cancelled_at`, coluna que
-- não está concedida — então `status = 'cancelled'` por UPDATE direto falha, e o
-- caminho obrigatório é `cancel_appointment`, que devolve a vaga.
grant update (status) on table public.appointments to authenticated;

-- Presenças: escrita da Karol pela política.
grant insert, update on table public.attendance_records to authenticated;

-- Lista de espera: a aluna entra para si mesma (`with check` na política).
grant insert on table public.waitlist_entries to authenticated;

-- Anotações privadas: só a Karol escreve, e só nas próprias.
grant insert, update on table public.private_notes to authenticated;

-- `subscriptions` fica sem `insert` e sem `update` para qualquer cliente. Nem a
-- aluna nem a Karol confirmam pagamento pela interface: quem muda o status é
-- `internal.complete_payment_event`, chamada pelo webhook depois de conferir o
-- estado oficial no provedor. Um privilégio de escrita aqui permitiria marcar
-- como paga uma assinatura que não foi.

-- `payment_events` e `audit_logs` também ficam sem escrita. Log que o cliente
-- pode escrever não é auditoria, e evento de pagamento que o cliente pode
-- inserir não é comprovação.

-- ─────────────────────────────────────────────────────────────────────────────
-- Sequências
--
-- `audit_logs` e `user_roles` usam identidade. Como nenhum papel da API insere
-- nessas tabelas, nenhum precisa da sequência.
-- ─────────────────────────────────────────────────────────────────────────────

revoke all on all sequences in schema public from anon, authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- Funções
--
-- `create function` concede `execute` a `PUBLIC` por padrão, o que inclui `anon`.
-- Cada função deste projeto já tem seu `revoke` junto da definição; a varredura
-- abaixo existe para pegar o que escapar numa migration futura.
-- ─────────────────────────────────────────────────────────────────────────────

do $$
declare
  v_fn text;
begin
  for v_fn in
    select format(
      '%I.%I(%s)', n.nspname, p.proname, pg_get_function_identity_arguments(p.oid)
    )
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname in ('public', 'internal')
      -- Só funções comuns. Procedimentos e agregados precisariam de sintaxe
      -- diferente no `revoke` e não existem neste projeto.
      and p.prokind = 'f'
      -- Função instalada por extensão não é nossa para mexer. Revogar `execute`
      -- de uma delas pode quebrar a própria extensão.
      and not exists (
        select 1 from pg_depend d
        where d.objid = p.oid
          and d.deptype = 'e'
      )
  loop
    execute format(
      'revoke all on function %s from public, anon, authenticated, service_role', v_fn
    );
  end loop;
end;
$$;

-- Funções de negócio da aluna e da Karol. `anon` não executa nenhuma: quem não
-- tem sessão não agenda, não cancela e não arquiva.
grant execute on function public.is_admin()                       to authenticated;
grant execute on function public.current_student_id()             to authenticated;
grant execute on function public.book_appointment(uuid)           to authenticated;
grant execute on function public.cancel_appointment(uuid, text)   to authenticated;
grant execute on function public.archive_student(uuid)            to authenticated;
grant execute on function public.reactivate_student(uuid)         to authenticated;
grant execute on function public.reconcile_slot_counts(uuid)      to authenticated;
grant execute on function public.admin_create_student(text, text, text)        to authenticated;
grant execute on function public.admin_update_student(uuid, text, text, text)  to authenticated;
grant execute on function public.admin_book_appointment(uuid, uuid)            to authenticated;

-- As funções administrativas acima são chamáveis por qualquer sessão
-- autenticada, e a primeira linha do corpo de cada uma é
-- `if not public.is_admin() then raise`. A alternativa — negar o `execute` — não
-- é possível: `authenticated` é o mesmo papel de banco para a aluna e para a
-- Karol, e o que as distingue é o claim do token, que só a função consegue ler.

-- O hook de emissão de token: só o servidor de autenticação.
grant execute on function public.custom_access_token_hook(jsonb) to supabase_auth_admin;
grant usage on schema public to supabase_auth_admin;
grant select on table public.user_roles to supabase_auth_admin;

-- ─────────────────────────────────────────────────────────────────────────────
-- Contrato do servidor
--
-- `service_role` recebe `execute` nas funções `srv_*` e em nada mais. Ele não
-- ganha `usage` em `internal`, então as tabelas de convite e de fila continuam
-- inalcançáveis mesmo com a secret key — a superfície é a lista abaixo.
--
-- Reparar que `service_role` também **não** recebe privilégio em tabela alguma
-- de `public`. Ele ignora RLS por definição, e o que sobraria como proteção
-- seria a boa intenção de quem escreve a Edge Function.
-- ─────────────────────────────────────────────────────────────────────────────

grant execute on function public.srv_issue_activation_token(uuid, uuid, uuid, interval) to service_role;
grant execute on function public.srv_consume_activation_token(text)                     to service_role;
grant execute on function public.srv_revoke_activation_token(uuid, uuid)                to service_role;
grant execute on function public.srv_expire_activation_tokens()                         to service_role;
grant execute on function public.srv_link_student_account(uuid, uuid, text)             to service_role;
grant execute on function public.srv_record_payment_event(text, text, text, jsonb, uuid) to service_role;
grant execute on function public.srv_begin_payment_event_processing(uuid, interval)     to service_role;
grant execute on function public.srv_complete_payment_event(
  uuid, uuid, public.subscription_status, timestamptz, timestamptz, text, text, boolean
) to service_role;
grant execute on function public.srv_fail_payment_event(uuid, text, interval)  to service_role;
grant execute on function public.srv_claim_invitation_job(interval)            to service_role;
grant execute on function public.srv_complete_invitation_job(uuid)             to service_role;
grant execute on function public.srv_fail_invitation_job(uuid, text, interval) to service_role;

-- ============================================================================
-- Privilégios padrão para objetos futuros
--
-- O bloco acima arruma o que existe hoje. Este arruma o amanhã: sem ele, a
-- próxima `create table` numa base que ainda tem o padrão antigo nasceria
-- legível e gravável por `anon`, e o erro só apareceria numa auditoria.
--
-- Depois disto, toda tabela, função ou sequência nova precisa de GRANT explícito
-- para ser alcançada. Se algo parar de funcionar depois de uma migration, é aqui
-- que se olha primeiro — e a resposta certa é adicionar o GRANT que falta, nunca
-- desfazer este trecho.
--
-- Segue a forma recomendada em
-- https://supabase.com/docs/guides/api/securing-your-api (consultado 01/08/2026).
-- ============================================================================

alter default privileges for role postgres in schema public
  revoke select, insert, update, delete on tables from anon, authenticated, service_role;

alter default privileges for role postgres in schema public
  revoke execute on functions from anon, authenticated, service_role;

alter default privileges for role postgres in schema public
  revoke select, usage on sequences from anon, authenticated, service_role;

alter default privileges for role postgres in schema internal
  revoke select, insert, update, delete on tables from anon, authenticated, service_role;

alter default privileges for role postgres in schema internal
  revoke execute on functions from anon, authenticated, service_role;

-- `PUBLIC` recebe `execute` em toda função nova por padrão do próprio Postgres,
-- não do Supabase. Como `anon` e `authenticated` herdam de `PUBLIC`, revogar aqui
-- fecha a porta na origem.
alter default privileges for role postgres in schema public
  revoke execute on functions from public;

alter default privileges for role postgres in schema internal
  revoke execute on functions from public;
