-- ============================================================================
-- TeamLink — papéis no token e funções de autorização
--
-- O papel vai para dentro do JWT no momento em que ele é emitido. Assim toda
-- política RLS decide "é a Karol?" lendo um claim, sem uma consulta extra por
-- linha avaliada.
--
-- `user_metadata` não aparece em lugar nenhum deste arquivo: a própria usuária
-- consegue alterá-lo via `supabase.auth.updateUser()`, então usá-lo para
-- autorização seria entregar a ela o poder de se promover a administradora.
-- ============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- Hook de emissão de token
--
-- Roda como `supabase_auth_admin` (o servidor de autenticação), nunca como a
-- usuária. Repare que a função NÃO é `security definer`: em vez de elevar
-- privilégio, concedemos leitura de `user_roles` só a esse papel específico.
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
set search_path = ''
as $$
declare
  claims     jsonb;
  found_role public.app_role;
begin
  -- Sem `limit 1`. `user_roles.user_id` é chave primária, então existe no
  -- máximo uma linha; se algum dia existirem duas, esta consulta deve explodir
  -- em vez de escolher um papel por ordem de inserção.
  select role into found_role
  from public.user_roles
  where user_id = (event->>'user_id')::uuid;

  claims := event->'claims';

  if found_role is not null then
    claims := jsonb_set(claims, '{user_role}', to_jsonb(found_role::text));
  else
    -- Sem papel definido o claim vai explicitamente nulo, e não ausente: o
    -- cliente distingue "sem papel" de "hook não executou".
    claims := jsonb_set(claims, '{user_role}', 'null'::jsonb);
  end if;

  return jsonb_set(event, '{claims}', claims);
end;
$$;

grant usage on schema public to supabase_auth_admin;
grant execute on function public.custom_access_token_hook(jsonb) to supabase_auth_admin;

-- Ninguém além do servidor de autenticação executa o hook.
revoke execute on function public.custom_access_token_hook(jsonb)
  from authenticated, anon, public;

grant select on table public.user_roles to supabase_auth_admin;

-- ─────────────────────────────────────────────────────────────────────────────
-- Funções de autorização
-- ─────────────────────────────────────────────────────────────────────────────

-- Lê o papel do próprio token. `security invoker` e sem acesso a tabela: não há
-- privilégio a escalar aqui.
create or replace function public.is_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(
    nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'user_role',
    ''
  ) = 'admin';
$$;

comment on function public.is_admin() is
  'Verdadeiro quando o token da requisição carrega o papel admin.';

-- Devolve o id da aluna vinculada à conta atual.
--
-- É `security definer` por necessidade: quase toda política precisa deste valor,
-- e consultá-lo através do RLS de `students` criaria recursão. A exposição é
-- mínima — a função não aceita argumento e só consegue devolver a linha da
-- própria pessoa que chamou.
--
-- Sem `limit 1`: `students.profile_id` é único, então não há como haver duas
-- linhas. Se houver, a função precisa falhar — mascarar a duplicidade aqui
-- significaria decidir silenciosamente a qual cadastro a conta pertence.
create or replace function public.current_student_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select s.id
  from public.students s
  where s.profile_id = (select auth.uid());
$$;

revoke execute on function public.current_student_id() from public, anon;
grant execute on function public.current_student_id() to authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- Criação do perfil ao surgir uma conta
--
-- O que este trigger **não** faz mais: procurar uma aluna com o mesmo e-mail e
-- adotá-la. Aquele desenho transformava o campo `email` de `auth.users` numa
-- credencial. Quem controla a criação da conta escolhe o e-mail, e quem escolhe
-- o e-mail escolheria de qual cadastro assumir o controle — incluindo o
-- histórico, as anotações e a assinatura paga de outra pessoa.
--
-- O vínculo virou operação explícita: `internal.link_student_account`, chamada
-- pelo servidor com o UUID que o Supabase acabou de criar e com o `student_id`
-- que originou aquele convite específico. Ver
-- `20260731090400_invitation_pipeline.sql`.
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;

  -- `raw_user_meta_data` entra aqui apenas como nome de exibição, um dado
  -- cosmético que a própria pessoa pode corrigir depois. Nenhuma decisão de
  -- autorização ou de vínculo lê esse campo.

  -- Toda conta nova nasce como aluna. Promover a admin é operação manual,
  -- feita direto no banco ou por Edge Function com secret key — nunca por
  -- um caminho que a própria usuária consiga acionar.
  insert into public.user_roles (user_id, role)
  values (new.id, 'student')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Funções de trigger não precisam ser chamáveis por ninguém: quem as executa é
-- o próprio Postgres, no contexto do trigger.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;
