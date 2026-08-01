-- ============================================================================
-- Seed do ambiente LOCAL.
--
-- Só catálogo: serviços, regras de horário e planos. Nenhuma aluna, nenhum
-- e-mail, nenhum dado de pessoa real — este arquivo é versionado.
-- ============================================================================

insert into public.services (id, name, kind, duration_minutes, capacity, active)
values
  ('10000000-0000-4000-8000-000000000001', 'Turma Feminina', 'group_class', 60, 12, true),
  ('10000000-0000-4000-8000-000000000002', 'Personal Individual', 'personal', 60, 1, true)
on conflict (id) do nothing;

-- Terça (2) e quinta (4), 19h.
insert into public.availability_rules (service_id, weekday, start_time, end_time, capacity)
values
  ('10000000-0000-4000-8000-000000000001', 2, '19:00', '20:00', 12),
  ('10000000-0000-4000-8000-000000000001', 4, '19:00', '20:00', 12)
on conflict do nothing;

insert into public.subscription_plans (id, name, description, price_cents, classes_per_week, active)
values
  (
    '20000000-0000-4000-8000-000000000001',
    'Turma Feminina',
    'Duas aulas por semana, terças e quintas às 19h.',
    10000, 2, true
  ),
  (
    '20000000-0000-4000-8000-000000000002',
    'Personal Individual',
    'Acompanhamento individualizado, horários combinados.',
    40000, null, true
  )
on conflict (id) do nothing;
