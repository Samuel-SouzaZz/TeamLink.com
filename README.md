# TeamLink — Karol Cascelli

Site institucional e sistema de agendamento da Team Link, em Muriaé (MG).

Publicado em [karolteamlink.com.br](https://karolteamlink.com.br).

## O que tem aqui

**Site institucional** (`/`) — página única, pública, otimizada para carregar
rápido no celular.

**Portal de agendamento** — área autenticada, mobile-first (alvo de 402×874),
com duas faces:

| Área | Rotas | Quem usa |
| --- | --- | --- |
| Portal da aluna | `/app`, `/app/agendar`, `/app/historico`, `/app/perfil` | Alunas com assinatura |
| Painel | `/admin`, `/admin/agenda`, `/admin/alunas`, `/admin/alunas/:id`, `/admin/planos`, `/admin/mais` | Karol |
| Entrada | `/login`, `/ativar`, `/recuperar-senha` | Público |

## Estado atual

Esta é a primeira etapa. O que existe e o que ainda não:

| | Situação |
| --- | --- |
| Site institucional | Funcionando, inalterado |
| Telas do portal | Implementadas, com **dados simulados** de `src/lib/demo-data.ts` |
| Rotas, layouts e guardas por perfil | Prontos |
| Cliente Supabase | Configurado por variável de ambiente |
| Migrations, RLS e GRANTs | Escritos, **não aplicados a nenhum banco** |
| Pipeline de convite e webhook | Banco e contrato prontos; nenhuma Edge Function implementada |
| Testes Vitest | Escritos e **executados** |
| Testes pgTAP | Escritos, **não executados** — Docker e Supabase CLI não estão instalados aqui |
| Integração PagBank | Só arquitetura e contrato. Produto confirmado na documentação oficial |
| Edge Functions | Só o contrato, em [`supabase/functions/README.md`](supabase/functions/README.md) |
| Módulo de avaliações | Adiado — interface mostra "Em breve" |

Nada foi publicado e nenhum banco de produção foi tocado.

## Rodando

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. Sem Supabase configurado, o login em modo
desenvolvimento oferece atalhos para entrar como Karol ou como aluna, com dados
simulados. Esses atalhos são removidos do build de produção.

### Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Verificação de tipos + build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm test` | Vitest |
| `npm run db:test` | Testes de RLS em pgTAP (exige Docker + Supabase CLI) |
| `npm run visual:check` | Regressão visual do site institucional |

## Conectando ao Supabase

```bash
cp .env.example .env.local
```

Preencha com os dados do projeto (Dashboard → Settings → API):

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Use a **publishable key** (`sb_publishable_...`), que substituiu a antiga `anon`
e é segura para expor no navegador. A secret key (`sb_secret_...`) ignora RLS e
nunca pode aparecer numa variável `VITE_*` — o código recusa iniciar se isso
acontecer.

### Aplicando o banco

```bash
supabase start          # instância local
supabase db reset       # aplica migrations + seed
```

As migrations são numeradas e dependem umas das outras; aplique na ordem. A
última, `20260731090500_grants_and_privileges.sql`, é a que torna as tabelas
alcançáveis pela Data API — sem ela o portal não lê nada. Isso é intencional:
projetos Supabase criados a partir de 30/05/2026 não expõem tabelas
automaticamente, então os `GRANT`s precisam estar declarados.

Depois, habilite o hook de claims em **Authentication → Hooks →
Custom Access Token**, apontando para `public.custom_access_token_hook`. Sem ele
o token não carrega o papel e o portal recusa a sessão em vez de adivinhar um
padrão.

Para promover alguém a administradora:

```sql
update public.user_roles set role = 'admin' where user_id = '<uuid>';
```

Não há caminho pela interface, de propósito. A pessoa precisa **renovar a sessão**
para o papel novo valer — e, ao remover o acesso administrativo de alguém, é
preciso **revogar** a sessão: o papel entra no token na emissão, não a cada
requisição.

### Antes de criar o projeto hospedado

`supabase/config.toml` configura só a instância local. Ele não tem efeito nenhum
sobre um projeto hospedado, e ler `enable_signup = false` ali **não é prova** de
que o cadastro público está desabilitado no projeto remoto — o padrão do Supabase
é aceitar.

As verificações que só podem ser feitas no painel estão em
[`docs/deployment-checklist.md`](docs/deployment-checklist.md). Leia antes de
criar o projeto.

## Testes

```bash
npm test           # Vitest — não depende de banco
npm run db:test    # pgTAP — exige Docker + Supabase CLI
```

`npm test` cobre leitura de papel do token, decisão de rota por perfil, tipos de
domínio e os contratos de ativação e idempotência de pagamento.

`npm run db:test` executa `supabase test db` contra a instância **local**, com dois
arquivos:

| Arquivo | Cobre |
| --- | --- |
| [`authorization_test.sql`](supabase/tests/authorization_test.sql) | Privilégios de tabela, coluna e função; RLS por perfil; regras de agendamento e capacidade |
| [`invitation_and_payments_test.sql`](supabase/tests/invitation_and_payments_test.sql) | Convites de ativação, vínculo de conta, máquina de estados do webhook, fila de convites |

**Estes testes foram escritos mas não executados.** Docker e a Supabase CLI não
estão instalados na máquina onde o trabalho foi feito, e `supabase test db` exige
os dois (a CLI roda `pg_prove` em contêiner). Nenhuma afirmação de que passam foi
feita em lugar nenhum da documentação. Para instalar:

```bash
npm install --save-dev supabase   # ou: scoop install supabase
supabase start
npm run db:test
```

Nunca aponte esses testes para produção — eles criam e alteram dados.

## Deploy

> **Atenção:** o diretório `dist/` está versionado e é dele que a Hostinger
> publica. Commitar um build equivale a publicar. Enquanto isso não mudar,
> trate `git add dist/` como uma decisão de deploy.
>
> A recomendação é tirar o `dist/` do repositório e publicar por CI — ver a
> decisão 11 em [`docs/decisions.md`](docs/decisions.md).

O roteamento depende do fallback de SPA em `public/.htaccess` (Hostinger) e
`public/_redirects`, ambos já configurados.

## Documentação

| Documento | Assunto |
| --- | --- |
| [`docs/architecture.md`](docs/architecture.md) | Como o portal convive com o site sem pesar nele |
| [`docs/security.md`](docs/security.md) | GRANT vs RLS, papéis, chaves, convites, vínculo de conta, LGPD |
| [`docs/data-model.md`](docs/data-model.md) | Tabelas, constraints, integridade, funções |
| [`docs/payment-integration.md`](docs/payment-integration.md) | Produto PagBank escolhido, contrato do webhook, documentação consultada |
| [`docs/deployment-checklist.md`](docs/deployment-checklist.md) | O que verificar no projeto hospedado, e por que o `config.toml` não basta |
| [`docs/decisions.md`](docs/decisions.md) | O porquê de cada escolha, e as pendências |
| [`supabase/functions/README.md`](supabase/functions/README.md) | Contrato das Edge Functions previstas |

## Stack

React 19 · TypeScript · Vite · styled-components · React Router · Radix UI ·
Lucide · Supabase · Vitest · pgTAP
