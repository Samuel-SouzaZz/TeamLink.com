# Segurança

## O modelo em uma frase

O navegador não é confiável. Toda decisão que importa acontece no Postgres.

## As duas camadas, que não são a mesma coisa

Confundi-las é o erro mais caro possível aqui, então vale separar antes de
qualquer outra coisa:

| | Decide | Falta dela resulta em |
| --- | --- | --- |
| **`GRANT`** | Se o papel alcança a tabela, a coluna ou a função | `42501`, antes de qualquer política ser avaliada |
| **RLS** | Quais linhas o papel vê e escreve | Zero linhas — não erro |

Uma tabela com RLS ligado e sem `GRANT` é **invisível**. Uma tabela com `GRANT` e
sem política **nega tudo**. As duas juntas é o que este projeto usa, e cada
garantia depende de uma delas especificamente — os testes pgTAP verificam qual,
esperando exceção num caso e contagem zero no outro.

### Por que os GRANTs são explícitos em toda migration

Até 2026 o Supabase concedia `select, insert, update, delete` a `anon`,
`authenticated` e `service_role` em toda tabela criada em `public`, e `execute` em
toda função. Cada migration ganhava exposição de graça.

Isso mudou: projetos criados a partir de 30/05/2026 não expõem tabelas
automaticamente, e projetos existentes recebem a mudança em 30/10/2026
([changelog 45329](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically),
consultado em 01/08/2026).

O efeito prático é nas duas direções. Numa base com o padrão antigo, não declarar
os GRANTs expõe o que não devia. Numa base nova, **não declarar quebra o portal**
— a Data API responde como se a tabela não existisse.

Por isso [`20260731090500_grants_and_privileges.sql`](../supabase/migrations/20260731090500_grants_and_privileges.sql)
começa revogando tudo e concede apenas o necessário, item por item. O mesmo
arquivo produz o mesmo estado nos dois cenários.

Ele também usa `alter default privileges` para que **objetos futuros** nasçam
sem privilégio. Se algo parar de funcionar depois de uma migration nova, a
resposta é adicionar o `GRANT` que falta — nunca desfazer esse trecho.

## Papéis

Existem dois: `admin` (Karol) e `student` (aluna).

A fonte de verdade é `public.user_roles`. Ela é uma **tabela restrita no schema
`public`, protegida por `GRANT` e RLS** — não uma tabela em schema privado.
Concretamente:

- nenhum `GRANT` para `anon` nem para `authenticated`, o que faz qualquer
  consulta falhar com `42501` — inclusive vinda da Karol;
- RLS habilitado, com uma única política, para `supabase_auth_admin`;
- `select` concedido apenas a esse papel, o do servidor de autenticação.

Mover a tabela para um schema fora da Data API seria possível, mas o Auth Hook
roda como `supabase_auth_admin` e a compatibilidade com schema alternativo não
foi verificada aqui. Como o par GRANT + RLS já a torna inalcançável, a mudança
seria custo sem ganho — e ficaria sem cobertura de teste.

Na emissão do token, o `custom_access_token_hook` consulta essa tabela e grava o
papel no claim `user_role`. Daí em diante toda política RLS decide lendo o claim,
sem consulta extra por linha.

**Uma pessoa tem exatamente um papel.** A chave primária é `user_id`, e não o par
`(user_id, role)`. Com o par, a mesma conta poderia ter as duas linhas, e o hook
teria de escolher uma com `limit 1` — uma decisão de autorização tomada por ordem
de inserção. Não existe nenhum `limit 1` em consulta de papel ou de vínculo neste
projeto; onde a duplicidade seria impossível por construção, a consulta falha em
vez de mascará-la.

### Por que não `user_metadata`

`user_metadata` é editável pela própria pessoa com uma chamada a
`supabase.auth.updateUser()`. Usá-lo para autorização significaria que qualquer
aluna vira administradora sozinha. Não há uma única leitura de `user_metadata`
para fins de autorização ou de vínculo em todo o código, e
[`src/features/auth/claims.test.ts`](../src/features/auth/claims.test.ts) tem um
teste específico que falha se alguém introduzir uma.

O único uso do campo é o nome de exibição em `handle_new_user`, dado cosmético
que a própria pessoa pode corrigir depois.

### Como promover alguém a administradora

Manualmente, no banco, ou por Edge Function usando a secret key:

```sql
update public.user_roles set role = 'admin' where user_id = '<uuid>';
```

Não existe caminho pela interface.

### Mudança de papel exige renovar ou revogar a sessão

O token é uma fotografia do momento em que foi emitido. O
`custom_access_token_hook` roda na emissão, não a cada requisição — então mudar
`user_roles` **não afeta nenhuma sessão já aberta**.

Para conceder privilégio, isso é apenas inconveniente: a pessoa faz login de novo
e o papel novo aparece.

Para **retirar** privilégio, é uma janela real. Rebaixar alguém sem encerrar a
sessão dela deixa o acesso administrativo válido até o token de acesso expirar.
O procedimento correto está em
[`deployment-checklist.md`](deployment-checklist.md): revogar as sessões da conta
no painel, e só então considerar o acesso removido.

## Chaves

| Chave | Onde pode estar | Observação |
| --- | --- | --- |
| `sb_publishable_...` | Front-end, `.env.local`, bundle | Substitui a antiga `anon`. Segura para expor. |
| `sb_secret_...` | Só Edge Functions / servidor | Ignora RLS por completo. |
| Token da conta PagBank | Só Edge Functions | Autentica a API **e** valida a assinatura do webhook. |

`src/lib/supabase/env.ts` recusa iniciar se a variável do cliente contiver uma
chave com prefixo `sb_secret_`. É uma barreira contra o erro de digitação que
publicaria a chave administrativa num bundle.

Nenhuma variável `VITE_*` pode conter segredo — tudo que tem esse prefixo é
copiado literalmente para dentro do JavaScript entregue ao navegador.

## O que o cliente consegue escrever

A resposta completa: **a aluna atualiza o próprio nome e o próprio telefone.**

Tudo o mais — inclusive o que a Karol faz — passa por função que valida quem
chamou. Isso é mais restritivo do que o RLS exigiria, e é deliberado: um `GRANT`
amplo depende de a política estar correta hoje e continuar correta depois de cada
mudança. Um `GRANT` ausente não depende de nada.

### Recorte por coluna, e por que ele é indispensável

O RLS opera na linha inteira. A política da aluna em `students` é
`using (profile_id = auth.uid())` — a linha é dela, então o RLS permite. Sem
recorte por coluna, ela poderia alterar o próprio `status` para sair de
arquivada, trocar o próprio `email` (o endereço usado para convite) ou apontar
`profile_id` para outra conta. O `with check` não impediria nada disso: a linha
continua sendo a dela.

```sql
revoke all on public.students from authenticated;
grant select on public.students to authenticated;
grant update (full_name, phone) on public.students to authenticated;
```

Qualquer outra coluna falha com `42501` antes de o RLS ser avaliado.

### Por que a Karol também escreve por função

O recorte acima vale para o **papel** `authenticated`, e a Karol é
`authenticated` — não existe papel de banco separado para ela. Ampliar o `GRANT`
para que ela edite `email` e `status` daria o mesmo privilégio à aluna.

Então a Karol escreve por `admin_create_student`, `admin_update_student`,
`archive_student` e `reactivate_student`, cada uma com
`if not public.is_admin() then raise` na primeira linha do corpo.

### O contador de vagas não é escrevível por ninguém

`schedule_slots.booked_count` está fora de todo `GRANT`, inclusive para a Karol.
As únicas formas de alterá-lo são `book_appointment`, `cancel_appointment`,
`admin_book_appointment` e `reconcile_slot_counts` — todas sob trava de linha.

Um contador que o cliente pode escrever é um contador que pode ser posto abaixo
do real para liberar vaga numa turma cheia.

`reconcile_slot_counts()` é o caminho administrativo para corrigi-lo, e ela
**recalcula** a partir dos agendamentos ativos em vez de aceitar um número vindo
de fora. Existe porque todo dado denormalizado acaba divergindo: restauração de
backup, correção manual, bug em migration futura.

### Cancelar não é UPDATE

`appointments` recebe `update (status)`, para a Karol confirmar presença,
concluir ou marcar falta. Não recebe `cancelled_at`. Como a constraint
`appointments_cancelled_at_matches_status` exige os dois juntos, tentar
`status = 'cancelled'` por UPDATE direto falha — e o caminho obrigatório passa a
ser `cancel_appointment`, que devolve a vaga.

## O schema `internal`

Convites de ativação e a fila de convites moram em
`internal.student_activation_tokens` e `internal.account_invitation_jobs`.

`internal` **não consta em `[api] schemas`**, então o PostgREST não o enxerga —
nem com a secret key. A exposição acidental dessas tabelas é impossível por
configuração, e não por lembrança de quem escreve o `GRANT`.

Nenhum papel da API tem `usage` no schema. O acesso do servidor é por funções
`public.srv_*`, `security definer`, com `execute` exclusivo de `service_role`. É
uma superfície nomeada e enumerável no lugar de acesso direto a tabela.

`service_role` também não tem privilégio em nenhuma tabela de `public`. Ele
ignora RLS por definição, e o que sobraria como proteção seria a boa intenção de
quem escreve a Edge Function. O custo dessa decisão: toda Edge Function futura
precisa de uma função `srv_*` ou de um `GRANT` explícito. É um custo aceito de
propósito — ele obriga a enumerar o que o servidor pode fazer.

As tabelas de `internal` também têm RLS habilitado. É redundante hoje, e está lá
para o caso de alguém, no futuro, adicionar o schema à lista de exposta ou
conceder `usage` por engano: o resultado dessa mudança seria zero linhas em vez
de vazamento. Não usamos `force row level security`, que sujeitaria o dono às
políticas e, sem nenhuma política definida, quebraria o pipeline.

## Convite de ativação

A aluna acessa `/ativar` **antes de existir conta**. Não há sessão, não há
`auth.uid()`, não há papel. Tudo o que o navegador enviar nesse momento é palpite
do cliente — inclusive o e-mail.

Por isso o convite é um token opaco:

- **256 bits de entropia**, de `gen_random_bytes(32)`, em base64url;
- **nunca armazenado em claro.** A tabela guarda `sha256` do token. Um dump do
  banco não permite ativar conta nenhuma;
- **nunca registrado em log.** A auditoria recebe o `id` do convite, que
  identifica sem permitir usar. Um teste verifica que `audit_logs` não carrega o
  token;
- **com validade**, conferida pelo relógio e não pelo `status` — marcar como
  vencido é tarefa de manutenção que pode atrasar, a expiração real não;
- **de uso único**, e cada tentativa recusada é contada em `attempt_count`. Um
  número alto num convite ainda ativo é sinal de alguém tentando adivinhar;
- **revogável** pela Karol;
- **um ativo por cadastro.** Trocar o plano exige revogar e emitir de novo, para
  que nunca fique ambíguo qual plano a aluna contratou.

Quem emite é a Karol, e a verificação de papel é feita **na tabela**
(`internal.is_admin_user`), não no claim da requisição — porque o servidor
chamando com a secret key não tem claim nenhum. É mais forte do que confiar na
Edge Function.

### A mensagem de recusa é sempre a mesma

O banco distingue `not_found`, `expired`, `revoked` e `already_used`, porque o
servidor precisa disso para decidir e registrar. **A aluna recebe uma única
mensagem**, qualquer que seja o motivo.

Diferenciar "não encontrado" de "já usado" transformaria a tela num verificador:
com uma lista de tokens candidatos, a diferença entre as duas respostas diria
quais existem. Distinguir "expirado" de "revogado" contaria à pessoa errada que a
Karol cancelou aquele convite de propósito.

`src/types/activation.test.ts` tem um teste que falha se alguém passar o motivo
para a mensagem.

## Vínculo entre conta e cadastro

O desenho anterior tinha um problema sério, e ele foi removido nesta etapa.

`handle_new_user` procurava uma aluna com o mesmo e-mail da conta recém-criada e
a adotava. Isso transformava o campo `email` de `auth.users` numa credencial:
**quem controla a criação da conta escolhe o e-mail, e quem escolhe o e-mail
escolheria de qual cadastro assumir o controle** — incluindo histórico,
anotações privadas e assinatura paga de outra pessoa.

O trigger continua criando `profiles` e o papel inicial. Ele não escolhe mais
aluna nenhuma.

O vínculo virou operação explícita, controlada pelo servidor:

1. A Karol cadastra a aluna.
2. O pagamento é confirmado pelo webhook.
3. O servidor convida a aluna pelo Supabase Admin.
4. O servidor recebe o UUID que o Supabase criou.
5. O servidor chama `srv_link_student_account(student_id, auth_user_id, actor)`,
   com o `student_id` **que originou aquele convite** — não com um resultado de
   busca.

Garantias da função:

- não é chamável por `anon` nem por `authenticated`: a aluna não escolhe o
  próprio `student_id`;
- `students.profile_id` é único, e a função falha explicitamente se o cadastro já
  tiver conta — em vez de `update ... where profile_id is null`, que afetaria
  zero linhas e devolveria sucesso;
- recusa vincular uma conta a um segundo cadastro;
- exige a identidade do processo autorizado, e registra o vínculo em
  `audit_logs`;
- **confere que o e-mail da conta corresponde ao do cadastro, como asserção.** Se
  o servidor apontar a conta errada, a operação para. Isso não é o mecanismo de
  vínculo — é a rede que pega o erro dele.

E-mails são normalizados com `lower(btrim(...))` na gravação, garantido por
constraint. `citext` resolveria maiúsculas e deixaria passar `" ana@x.com"`.

## Funções `SECURITY DEFINER`

Nenhuma é executável por `PUBLIC` nem por `anon`, e todas têm
`set search_path = ''`. Um `search_path` mutável numa função definer permite que
a chamadora aponte um schema próprio e faça a função executar código dela com
privilégio elevado.

Dois testes pgTAP verificam isso varrendo `pg_proc`, e não uma lista escrita à
mão — assim uma função nova sem proteção falha o teste.

| Função | Por que precisa ser definer | Proteção |
| --- | --- | --- |
| `current_student_id()` | Consultá-la pelo RLS de `students` criaria recursão | Sem argumentos; só devolve a linha de quem chamou |
| `book_appointment()` | Trava a linha do horário e escreve em duas tabelas atomicamente | Verifica assinatura ativa, cadastro ativo e propriedade |
| `cancel_appointment()` | Idem | Confere explicitamente que o agendamento é de quem chamou |
| `archive_student()` / `reactivate_student()` | Escrevem coluna que a aluna não alcança | `if not is_admin() then raise` |
| `admin_create_student()` / `admin_update_student()` | Escrevem colunas fora do GRANT do papel | `if not is_admin() then raise` |
| `admin_book_appointment()` | `appointments` não tem `insert` para ninguém | `if not is_admin() then raise` |
| `reconcile_slot_counts()` | `booked_count` não tem `update` para ninguém | `if not is_admin() then raise` |
| `handle_new_user()` | Trigger em `auth.users` | `execute` revogado de todos |
| `srv_*` | Alcançam `internal` | `execute` só para `service_role` |

`is_admin()` é `security invoker` — ela só lê o próprio token, não acessa tabela
nenhuma, e portanto não tem privilégio a escalar. Não usa `auth.role()`, que
informa o papel de banco (`authenticated`) e não o papel da aplicação.

## Mensagens de erro

Nenhuma mensagem repete e-mail, telefone, nome ou identificador de terceiro.
"Já existe cadastro com este e-mail" não diz qual. Mensagem de erro atravessa
log, monitoramento e, às vezes, tela.

`payment_events.last_error_code` aceita no máximo 64 caracteres de propósito: é
para código estável (`provider_unreachable`), não para mensagem do provedor, que
pode carregar dado do cartão ou da pessoa.

## Cadastro

Não existe cadastro público.

**`supabase/config.toml` configura apenas a instância local.** Ler
`enable_signup = false` no repositório e concluir que o projeto hospedado está
protegido é o erro mais fácil de cometer aqui: um projeto Supabase recém-criado
aceita cadastro público por padrão, e a verificação é no painel. Ver
[`deployment-checklist.md`](deployment-checklist.md).

A recuperação de senha responde a mesma mensagem exista o e-mail ou não. Dizer
"e-mail não encontrado" transformaria a tela num verificador de quem é aluna da
Karol.

## Modo demonstração

Enquanto não há projeto Supabase, o login em desenvolvimento oferece atalhos para
entrar como Karol ou como aluna, com dados simulados.

Isso está atrás de:

```ts
export const DEMO_MODE = import.meta.env.DEV && !isSupabaseConfigured
```

O Vite substitui `import.meta.env.DEV` literalmente por `false` no build de
produção. A condição vira constante, e o empacotador elimina todo o caminho — os
atalhos não existem no arquivo publicado. Num build de produção sem Supabase
configurado, a tela informa que o portal não está conectado e o botão de entrar
fica desabilitado; ela não libera ninguém.

## Preservação de dados

Nada é apagado. Cadastros, contas, assinaturas, agendamentos, presenças,
pagamentos, anotações e auditoria usam `status`, `archived_at` e `cancelled_at`.

Nenhum papel tem privilégio de `DELETE` em nenhuma tabela, e nenhuma tabela tem
política de `DELETE`. São duas camadas independentes: uma política adicionada por
descuido no futuro não teria efeito, porque o comando não está concedido.

Nenhuma chave estrangeira usa `on delete cascade` nem `on delete set null` —
todas são `restrict`. `set null` desfaria um vínculo em silêncio, e uma aluna sem
`profile_id` volta a ser candidata a convite: o descuido viraria brecha.

## LGPD

O procedimento de anonimização para pedidos de exclusão **ainda não existe** e
está registrado como pendência em [`decisions.md`](decisions.md).

Ele é uma decisão de negócio antes de ser técnica: apagar o cadastro apagaria
também o registro contábil de pagamentos e a frequência histórica das turmas. O
desenho provável é substituir dados identificáveis (nome, e-mail, telefone) por
valores anonimizados preservando os identificadores internos e os agregados, com
registro da solicitação em `audit_logs`. Precisa ser escrito, revisado e testado
antes de ser oferecido.

Nesta versão não há nenhum dado de saúde, medida corporal ou avaliação física — o
módulo de avaliações foi deliberadamente adiado por envolver categoria de dado
que exige decisão específica sobre consentimento e retenção.

`students` também não tem campo de observação livre: as anotações da Karol moram
em `private_notes`, tabela separada com RLS que só libera para ela. Uma coluna de
texto em `students` vazaria num `select *` da própria aluna.

## Como testar

```bash
npm run db:test        # equivale a `supabase test db`
```

Exige Docker e a Supabase CLI, e roda contra a instância **local**. Os testes
estão em:

- [`supabase/tests/authorization_test.sql`](../supabase/tests/authorization_test.sql)
  — privilégios, RLS, papéis e regras de agendamento;
- [`supabase/tests/invitation_and_payments_test.sql`](../supabase/tests/invitation_and_payments_test.sql)
  — convites, vínculo de conta e idempotência do webhook.

Nunca aponte esses testes para produção — eles criam e alteram dados.
