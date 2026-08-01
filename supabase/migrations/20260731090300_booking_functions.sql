-- ============================================================================
-- TeamLink — operações de agendamento
--
-- Reservar e cancelar são feitos por função, e não por INSERT/UPDATE direto,
-- porque as duas operações precisam decidir com base em algo que pode mudar
-- entre a leitura e a escrita: quantas vagas restam.
--
-- Se duas alunas tocassem "reservar" no mesmo instante na última vaga, ambas
-- leriam `booked_count = 11` e ambas gravariam 12. O `for update` abaixo faz a
-- segunda esperar a primeira terminar, então ela lê o valor já atualizado e
-- recebe "turma cheia". Validação no React não resolve isso — ela sequer chega
-- a saber que a outra requisição existe.
-- ============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- Reservar
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function public.book_appointment(p_slot_id uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_student_id     uuid;
  v_slot           public.schedule_slots;
  v_appointment_id uuid;
begin
  v_student_id := public.current_student_id();

  if v_student_id is null then
    raise exception 'Nenhuma aluna vinculada a esta conta.'
      using errcode = '42501';
  end if;

  -- Cadastro arquivado não agenda. `archive_student` não cancela a assinatura —
  -- de propósito, para que reativar devolva tudo — então sem esta verificação
  -- uma aluna arquivada com assinatura vigente ainda conseguiria reservar.
  if not exists (
    select 1 from public.students
    where id = v_student_id and status = 'active'
  ) then
    raise exception 'Cadastro indisponível para agendamento.' using errcode = 'P0006';
  end if;

  -- Assinatura inativa não agenda. Verificado aqui, no servidor, porque a tela
  -- que esconde o botão é conveniência, não controle.
  if not exists (
    select 1
    from public.subscriptions
    where student_id = v_student_id
      and status = 'active'
  ) then
    raise exception 'Assinatura inativa: não é possível agendar novas aulas.'
      using errcode = 'P0001';
  end if;

  -- Trava a linha do horário até o fim da transação.
  select * into v_slot
  from public.schedule_slots
  where id = p_slot_id
    and cancelled_at is null
  for update;

  if not found then
    raise exception 'Horário indisponível.' using errcode = 'P0002';
  end if;

  if v_slot.starts_at <= now() then
    raise exception 'Este horário já passou.' using errcode = 'P0002';
  end if;

  if v_slot.booked_count >= v_slot.capacity then
    raise exception 'Turma cheia.' using errcode = 'P0003';
  end if;

  -- O índice único parcial `appointments_one_active_per_slot_idx` cobre a
  -- duplicidade; traduzimos o erro para uma mensagem que faz sentido na tela.
  begin
    insert into public.appointments (
      slot_id, student_id, service_id, status, starts_at, ends_at
    )
    values (
      p_slot_id, v_student_id, v_slot.service_id, 'scheduled',
      v_slot.starts_at, v_slot.ends_at
    )
    returning id into v_appointment_id;
  exception
    when unique_violation then
      raise exception 'Você já tem reserva neste horário.' using errcode = 'P0004';
  end;

  update public.schedule_slots
  set booked_count = booked_count + 1
  where id = p_slot_id;

  insert into public.audit_logs (actor_id, action, entity_table, entity_id, metadata)
  values (
    (select auth.uid()), 'appointment.created', 'appointments',
    v_appointment_id::text, jsonb_build_object('slot_id', p_slot_id)
  );

  return v_appointment_id;
end;
$$;

revoke execute on function public.book_appointment(uuid) from public, anon;
grant execute on function public.book_appointment(uuid) to authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- Cancelar
--
-- Cancelar é mudança de status, nunca remoção: o registro continua no histórico
-- da aluna e nos números da Karol.
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function public.cancel_appointment(
  p_appointment_id uuid,
  p_reason text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_student_id  uuid;
  v_appointment public.appointments;
  v_is_admin    boolean;
begin
  v_student_id := public.current_student_id();
  v_is_admin := public.is_admin();

  select * into v_appointment
  from public.appointments
  where id = p_appointment_id
  for update;

  if not found then
    raise exception 'Agendamento não encontrado.' using errcode = 'P0002';
  end if;

  -- A aluna só cancela o que é dela. Como a função é `security definer`, ela
  -- roda fora do RLS — então a checagem de propriedade precisa estar aqui,
  -- explícita.
  if not v_is_admin and v_appointment.student_id is distinct from v_student_id then
    raise exception 'Sem permissão para cancelar este agendamento.'
      using errcode = '42501';
  end if;

  if v_appointment.status = 'cancelled' then
    return;
  end if;

  if v_appointment.status in ('completed', 'no_show') then
    raise exception 'Aula já realizada não pode ser cancelada.' using errcode = 'P0005';
  end if;

  update public.appointments
  set status = 'cancelled',
      cancelled_at = now(),
      cancellation_reason = p_reason
  where id = p_appointment_id;

  -- Devolve a vaga. `greatest` evita contador negativo se algo já tiver
  -- decrementado antes.
  update public.schedule_slots
  set booked_count = greatest(0, booked_count - 1)
  where id = v_appointment.slot_id;

  insert into public.audit_logs (actor_id, action, entity_table, entity_id, metadata)
  values (
    (select auth.uid()), 'appointment.cancelled', 'appointments',
    p_appointment_id::text,
    jsonb_build_object('by_admin', v_is_admin, 'reason', p_reason)
  );
end;
$$;

revoke execute on function public.cancel_appointment(uuid, text) from public, anon;
grant execute on function public.cancel_appointment(uuid, text) to authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- Arquivar e reativar cadastro
--
-- Arquivar é o mais perto de "excluir" que a interface chega. A conta, o
-- histórico e as presenças continuam intactos, e reativar devolve tudo.
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function public.archive_student(p_student_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'Somente a administradora pode arquivar cadastros.'
      using errcode = '42501';
  end if;

  update public.students
  set status = 'archived', archived_at = now()
  where id = p_student_id
    and status = 'active';

  insert into public.audit_logs (actor_id, action, entity_table, entity_id)
  values ((select auth.uid()), 'student.archived', 'students', p_student_id::text);
end;
$$;

create or replace function public.reactivate_student(p_student_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'Somente a administradora pode reativar cadastros.'
      using errcode = '42501';
  end if;

  update public.students
  set status = 'active', archived_at = null
  where id = p_student_id
    and status = 'archived';

  insert into public.audit_logs (actor_id, action, entity_table, entity_id)
  values ((select auth.uid()), 'student.reactivated', 'students', p_student_id::text);
end;
$$;

revoke execute on function public.archive_student(uuid) from public, anon;
revoke execute on function public.reactivate_student(uuid) from public, anon;
grant execute on function public.archive_student(uuid) to authenticated;
grant execute on function public.reactivate_student(uuid) to authenticated;

-- ============================================================================
-- Escritas administrativas
--
-- Estas funções existem porque o recorte por coluna do `GRANT` vale para o
-- papel `authenticated`, não para a política. Quando concedemos
-- `update (full_name, phone)` em `students` para que a aluna edite o próprio
-- contato, a Karol — que também é `authenticated` — herda o mesmo recorte.
--
-- A alternativa seria ampliar o GRANT e confiar no RLS para separar as duas.
-- Mas aí a aluna passaria a ter o privilégio de escrever no próprio `email` e
-- no próprio `status`, e o `with check (profile_id = auth.uid())` da política
-- dela não impediria nada: a linha continua sendo a dela.
--
-- Por isso o GRANT fica no mínimo e a Karol escreve por função validada.
-- ============================================================================

create or replace function public.admin_create_student(
  p_full_name text,
  p_email     text,
  p_phone     text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text;
  v_id    uuid;
begin
  if not public.is_admin() then
    raise exception 'Operação restrita à administradora.' using errcode = '42501';
  end if;

  -- Normaliza antes de gravar. A constraint `students_email_normalized` recusaria
  -- o valor cru, e é melhor a função entregar o formato certo do que devolver
  -- erro de constraint para a tela.
  v_email := lower(btrim(coalesce(p_email, '')));

  if position('@' in v_email) < 2 then
    raise exception 'E-mail inválido.' using errcode = '22023';
  end if;

  begin
    insert into public.students (full_name, email, phone)
    values (btrim(p_full_name), v_email, nullif(btrim(coalesce(p_phone, '')), ''))
    returning id into v_id;
  exception
    when unique_violation then
      -- Sem repetir o e-mail na mensagem: a tela é da Karol, mas o texto de
      -- erro atravessa log e monitoramento.
      raise exception 'Já existe cadastro com este e-mail.' using errcode = 'P0012';
  end;

  insert into public.audit_logs (actor_id, action, entity_table, entity_id)
  values ((select auth.uid()), 'student.created', 'students', v_id::text);

  return v_id;
end;
$$;

-- `null` em qualquer parâmetro significa "não mexer". Assim a Karol pode
-- corrigir só o telefone sem reenviar o resto do cadastro.
create or replace function public.admin_update_student(
  p_student_id uuid,
  p_full_name  text default null,
  p_email      text default null,
  p_phone      text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text;
begin
  if not public.is_admin() then
    raise exception 'Operação restrita à administradora.' using errcode = '42501';
  end if;

  if p_email is not null then
    v_email := lower(btrim(p_email));

    if position('@' in v_email) < 2 then
      raise exception 'E-mail inválido.' using errcode = '22023';
    end if;
  end if;

  begin
    update public.students
    set full_name = coalesce(nullif(btrim(coalesce(p_full_name, '')), ''), full_name),
        email = coalesce(v_email, email),
        phone = case when p_phone is null then phone
                     else nullif(btrim(p_phone), '') end
    where id = p_student_id;
  exception
    when unique_violation then
      raise exception 'Já existe cadastro com este e-mail.' using errcode = 'P0012';
  end;

  if not found then
    raise exception 'Cadastro não encontrado.' using errcode = 'P0002';
  end if;

  insert into public.audit_logs (actor_id, action, entity_table, entity_id, metadata)
  values (
    (select auth.uid()), 'student.updated', 'students', p_student_id::text,
    -- Registra quais campos mudaram, não os valores. Auditoria não precisa
    -- guardar uma segunda cópia do e-mail da aluna.
    jsonb_build_object(
      'fields', array_remove(
        array[
          case when p_full_name is not null then 'full_name' end,
          case when p_email is not null then 'email' end,
          case when p_phone is not null then 'phone' end
        ],
        null
      )
    )
  );
end;
$$;

-- A Karol agendando em nome da aluna. Não é `book_appointment` com outro
-- parâmetro porque as regras diferem: aqui não há exigência de assinatura ativa
-- (ela pode encaixar uma aula de experiência), mas capacidade e duplicidade
-- continuam valendo.
create or replace function public.admin_book_appointment(
  p_student_id uuid,
  p_slot_id    uuid
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_slot           public.schedule_slots;
  v_appointment_id uuid;
begin
  if not public.is_admin() then
    raise exception 'Operação restrita à administradora.' using errcode = '42501';
  end if;

  if not exists (
    select 1 from public.students where id = p_student_id and status = 'active'
  ) then
    raise exception 'Cadastro indisponível.' using errcode = 'P0002';
  end if;

  select * into v_slot
  from public.schedule_slots
  where id = p_slot_id
    and cancelled_at is null
  for update;

  if not found then
    raise exception 'Horário indisponível.' using errcode = 'P0002';
  end if;

  if v_slot.booked_count >= v_slot.capacity then
    raise exception 'Turma cheia.' using errcode = 'P0003';
  end if;

  begin
    insert into public.appointments (
      slot_id, student_id, service_id, status, starts_at, ends_at
    )
    values (
      p_slot_id, p_student_id, v_slot.service_id, 'scheduled',
      v_slot.starts_at, v_slot.ends_at
    )
    returning id into v_appointment_id;
  exception
    when unique_violation then
      raise exception 'Esta aluna já tem reserva neste horário.' using errcode = 'P0004';
  end;

  update public.schedule_slots
  set booked_count = booked_count + 1
  where id = p_slot_id;

  insert into public.audit_logs (actor_id, action, entity_table, entity_id, metadata)
  values (
    (select auth.uid()), 'appointment.created_by_admin', 'appointments',
    v_appointment_id::text,
    jsonb_build_object('slot_id', p_slot_id, 'student_id', p_student_id)
  );

  return v_appointment_id;
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- Reconciliação do contador
--
-- `booked_count` é denormalizado, e todo dado denormalizado acaba divergindo:
-- restauração de backup, correção manual, bug em migration futura. Como
-- ninguém — nem a Karol — tem GRANT para escrever nessa coluna, este é o único
-- caminho para corrigi-la, e ele recalcula a partir dos agendamentos ativos em
-- vez de aceitar um número vindo de fora.
--
-- Devolve só o que estava errado, para que o resultado vazio seja a resposta
-- normal e qualquer linha retornada mereça investigação.
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function public.reconcile_slot_counts(p_slot_id uuid default null)
returns table (
  slot_id         uuid,
  previous_count  integer,
  corrected_count integer
)
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'Operação restrita à administradora.' using errcode = '42501';
  end if;

  -- O próprio `update` toma a trava das linhas que vai alterar, o que dispensa
  -- um `select ... for update` antes e evita a janela entre ler e corrigir.
  --
  -- O `update` fica dentro de um CTE porque `return query` espera uma consulta;
  -- envolvê-lo assim deixa a instrução externa sendo um `select`, que é o que a
  -- forma aceita sem ambiguidade.
  return query
  with fixed as (
    update public.schedule_slots s
    set booked_count = t.computed
    from (
      select sl.id,
             sl.booked_count as previous,
             (
               select count(*)
               from public.appointments a
               where a.slot_id = sl.id
                 and a.status <> 'cancelled'
             )::integer as computed
      from public.schedule_slots sl
      where p_slot_id is null or sl.id = p_slot_id
    ) t
    where s.id = t.id
      and s.booked_count <> t.computed
    returning s.id, t.previous, t.computed
  )
  select f.id, f.previous, f.computed from fixed f;
end;
$$;

revoke execute on function public.admin_create_student(text, text, text)
  from public, anon;
revoke execute on function public.admin_update_student(uuid, text, text, text)
  from public, anon;
revoke execute on function public.admin_book_appointment(uuid, uuid)
  from public, anon;
revoke execute on function public.reconcile_slot_counts(uuid)
  from public, anon;

grant execute on function public.admin_create_student(text, text, text)
  to authenticated;
grant execute on function public.admin_update_student(uuid, text, text, text)
  to authenticated;
grant execute on function public.admin_book_appointment(uuid, uuid)
  to authenticated;
grant execute on function public.reconcile_slot_counts(uuid)
  to authenticated;
