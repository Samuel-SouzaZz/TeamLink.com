# Arquitetura

## O que existe hoje

O repositório abriga duas coisas que compartilham o mesmo build e o mesmo tema
visual, mas têm públicos e exigências diferentes:

1. **O site institucional** (`/`) — página única, pública, otimizada para
   carregar rápido no celular de quem chegou por um link do Instagram.
2. **O portal de agendamento** (`/login`, `/app/*`, `/admin/*`) — aplicação
   autenticada, usada por um punhado de pessoas que voltam com frequência.

A escolha central deste desenho é que a segunda **não pode atrapalhar a
primeira**.

## Como as duas convivem

O site institucional já tinha passado por um trabalho de performance: fontes
locais, CSS crítico embutido, imagens em AVIF/WebP, divisão manual de chunks.
Colocar React Router e `supabase-js` no bundle inicial jogaria isso fora — o
visitante que só quer ver os horários pagaria o download de um sistema de
agendamento que nunca vai abrir.

Por isso `/` é a única rota carregada de forma síncrona. Todo o resto está atrás
de `lazy()`:

```
src/routes/index.tsx
  /                → AppLayout + Home        (síncrono)
  /login           → lazy
  /ativar          → lazy
  /recuperar-senha → lazy
  /app/*           → lazy (layout da aluna + telas)
  /admin/*         → lazy (layout da Karol + telas)
```

Como consequência, `@supabase/supabase-js` só é baixado quando alguém abre o
portal. O cliente é criado sob demanda (`getSupabaseClient()`), não no topo do
módulo, para que nem a criação aconteça em quem não precisa.

O roteamento em produção depende do fallback de SPA já configurado em
`public/.htaccess` (Hostinger) e `public/_redirects`. Abrir `/app/perfil`
direto na barra de endereços funciona.

## Organização

```
src/
  components/
    portal/          primitivos do portal (Button, Card, Field, estados…)
    ui/              componentes do site institucional
  features/
    auth/            sessão, leitura de papel, telas de entrada
    booking/         agendamento e histórico da aluna
    students/        cadastro, ficha e perfil
    subscriptions/   planos e assinaturas
    admin/           painel da Karol
  layouts/
    AppLayout        site institucional
    StudentLayout    portal da aluna  (bottom nav de 4 itens)
    AdminLayout      painel da Karol  (bottom nav de 5 itens)
    portal/          casca comum: cabeçalho, navegação, botão sair
  lib/
    supabase/        env + cliente
    datetime.ts      formatação em America/Sao_Paulo
    demo-data.ts     fixtures da fase atual
  routes/            router, guardas, caminhos
  types/             tipos de domínio e de autenticação
supabase/
  migrations/        schema, papéis, RLS, funções, GRANTs
  functions/         Edge Functions (só o contrato, nesta fase)
  tests/             pgTAP: autorização e pipeline de convite/pagamento
docs/
```

As migrations são numeradas e devem ser lidas na ordem, porque cada uma depende
do estado da anterior:

| Arquivo | O que estabelece |
| --- | --- |
| `…090000_initial_schema` | Tabelas, constraints, índices, tipos |
| `…090100_roles_and_claims` | Auth Hook, `is_admin()`, trigger de conta nova |
| `…090200_rls_policies` | Políticas por tabela |
| `…090300_booking_functions` | Agendamento e escritas administrativas |
| `…090400_invitation_pipeline` | Schema `internal`, convites, fila, contrato `srv_*` |
| `…090500_grants_and_privileges` | Revoga tudo, concede o mínimo, fecha o padrão futuro |

A separação entre `090200` e `090500` é intencional: RLS e `GRANT` decidem coisas
diferentes, e juntá-las no mesmo arquivo tornaria fácil confundi-las. Todos os
`GRANT`s, inclusive os recortes por coluna, estão reunidos em `090500`.

Cada tela é o `export default` do próprio arquivo, o que é o que permite o
`lazy(() => import(...))` ficar direto.

## Camadas de autorização

Existem três, e elas não têm o mesmo peso.

**No navegador**, `RequireAuth` e `RequireRole` decidem o que renderizar. Isso é
experiência de uso: evitar que a aluna veja uma tela quebrada de administradora.
Não é segurança — qualquer pessoa pode alterar o JavaScript da própria aba.

**No `GRANT`**, o Postgres decide se o papel alcança a tabela, a coluna ou a
função. Falta de privilégio dá `42501` antes de qualquer política ser avaliada. É
a camada mais grosseira e a mais confiável, porque não depende de nenhuma
expressão estar correta.

**No RLS**, as políticas decidem quais linhas. Uma tabela com `GRANT` e sem
política nega tudo; uma tabela com RLS e sem `GRANT` é invisível.

As duas últimas sustentam as promessas do produto, e é por isso que os testes de
autorização são pgTAP e não testes de componente. Os testes distinguem qual camada
está protegendo o quê: esperam exceção onde a garantia é do `GRANT`, e contagem
zero onde é do RLS.

O papel vem do claim `user_role`, injetado no JWT pelo
`custom_access_token_hook` a partir de `public.user_roles` — tabela restrita no
schema `public`, sem `GRANT` para `anon` nem `authenticated`. O cliente apenas lê
esse claim; ele não consegue produzi-lo.

## Onde o servidor entra

Há um caminho que não passa por nenhuma das camadas acima, porque acontece
**antes de existir conta**: a aluna abrindo `/ativar`.

Sem sessão não há `auth.uid()`, não há papel, e tudo o que o navegador envia é
palpite do cliente. Esse caminho é resolvido por um token de convite opaco, com as
tabelas em um schema `internal` que o PostgREST não enxerga, e com o acesso do
servidor restrito a funções `public.srv_*` cujo `EXECUTE` só `service_role` tem.

Nenhuma Edge Function foi implementada; o contrato está em
[`supabase/functions/README.md`](../supabase/functions/README.md).

## Estado da fase atual

As telas estão implementadas com dados de `src/lib/demo-data.ts` — tipados com
os mesmos tipos do domínio real, então a troca por consultas ao Supabase é
substituir a origem dos dados, não reescrever as telas.

Nada foi aplicado a nenhum banco. As migrations existem como arquivo e ainda não
rodaram em lugar nenhum.

**`supabase/config.toml` configura apenas a instância local.** Ele não tem efeito
sobre nenhum projeto hospedado, e ler `enable_signup = false` ali não é prova de
que o projeto remoto está protegido. As verificações que só podem ser feitas no
painel estão em [`deployment-checklist.md`](deployment-checklist.md).

Detalhes de segurança em [`security.md`](security.md), do banco em
[`data-model.md`](data-model.md), do pagamento em
[`payment-integration.md`](payment-integration.md), e o porquê de cada escolha
em [`decisions.md`](decisions.md).
