# Modelo de dados

Definido em [`supabase/migrations`](../supabase/migrations). Nada foi aplicado a
nenhum banco ainda.

## Convenções

- Todo instante é `timestamptz`, gravado em UTC. A conversão para
  America/Sao_Paulo acontece só na exibição, em
  [`src/lib/datetime.ts`](../src/lib/datetime.ts). Guardar em UTC evita que uma
  aula das 19h vire 18h ou 20h dependendo de horário de verão ou do relógio do
  aparelho.
- Toda chave estrangeira tem índice — o Postgres não cria sozinho, e sem ele
  cada `join` vira varredura de tabela.
- Nenhuma chave estrangeira usa `on delete cascade` nem `on delete set null`;
  todas são `restrict`. Como não há `DELETE`, o cascade só serviria para dar a
  impressão de que apagar é uma operação prevista — e `set null` é pior, porque
  desfaria um vínculo em silêncio (ver [`students` sem conta](#students-sem-conta)).
- Valores financeiros em centavos, como `integer`. Nunca ponto flutuante, nunca
  `numeric` com casas decimais implícitas.
- E-mail é `text` normalizado por constraint (`lower(btrim(...))`), não `citext`.
  `citext` resolveria maiúsculas e deixaria passar `" ana@x.com"`.

## Tabelas

### Schema `public`

| Tabela | Papel |
| --- | --- |
| `user_roles` | Papéis. Tabela restrita: sem GRANT para `anon` nem `authenticated`, e RLS que só libera o servidor de autenticação. |
| `profiles` | Espelho de `auth.users` com nome e telefone. |
| `students` | Cadastro da aluna. Existe antes da conta. |
| `services` | Turma Feminina, Personal Individual. |
| `availability_rules` | Regra recorrente ("toda terça 19h"). |
| `schedule_slots` | Horário concreto, com capacidade e ocupação. |
| `appointments` | Reserva de uma aluna num horário. |
| `attendance_records` | Presença efetiva. |
| `subscription_plans` | Planos e valores. |
| `subscriptions` | Assinatura vigente ou encerrada de uma aluna. |
| `payment_events` | Eventos de webhook, com máquina de estados de processamento. |
| `waitlist_entries` | Lista de espera por horário. |
| `private_notes` | Anotações da Karol. |
| `audit_logs` | Quem fez o quê. |

### Schema `internal`

Fora da Data API: `internal` não consta em `[api] schemas`, então o PostgREST não
o enxerga nem com a secret key. Nenhum papel tem `usage` no schema.

| Tabela | Papel |
| --- | --- |
| `student_activation_tokens` | Convites de ativação. Guarda o hash do token, nunca o token. |
| `account_invitation_jobs` | Fila (outbox) do convite de criação de conta. |

O acesso do servidor é por funções `public.srv_*`, com `execute` exclusivo de
`service_role`. Ver [`security.md`](security.md#o-schema-internal).

### `students` sem conta

`profile_id` é nulo enquanto a aluna ainda não criou a senha. A Karol cadastra
primeiro, o convite sai depois. É isso que permite existir cadastro sem login — e
é o que sustenta a regra de não haver inscrição pública.

O que **não** acontece mais: o trigger `handle_new_user` ligava os dois procurando
`students` pelo e-mail da conta recém-criada. Isso transformava o e-mail numa
credencial — quem controla a criação da conta escolhe o e-mail, e escolheria de
qual cadastro assumir o controle. O vínculo agora é explícito, feito pelo servidor
com o `student_id` que originou o convite
([`security.md`](security.md#vínculo-entre-conta-e-cadastro)).

Isso também explica por que a coluna é `on delete restrict` e não
`on delete set null`: um cadastro que volta a ter `profile_id` nulo volta a ser
candidato a um convite novo, então desfazer o vínculo em silêncio criaria uma
brecha a partir de um descuido.

`profile_id` é `unique`, e a função de vínculo falha explicitamente — em vez de
`update ... where profile_id is null`, que afetaria zero linhas e devolveria
sucesso.

### `students` sem campo de observação

Não existe coluna de texto livre aqui. As anotações moram em `private_notes`, e o
motivo é o mesmo da seção abaixo.

### `private_notes` como tabela separada

Poderiam ser uma coluna em `students`. Não são, porque separar torna impossível
vazá-las por descuido: um `select *` em `students` nunca traz junto uma
anotação que não está lá. A tabela tem política só para administradora; para
qualquer outra pessoa ela responde como se estivesse vazia.

### `payment_events` sem payload cru

A coluna é `payload_summary`, já filtrada. O corpo original do webhook pode
conter dado pessoal do provedor, e este registro é permanente — guardar tudo
"por precaução" cria um passivo que ninguém vai revisar depois.

`last_error_code` tem limite de 64 caracteres pelo mesmo motivo: é para código
estável (`provider_unreachable`), não para a mensagem do provedor.

## Integridade

### Agendamento duplicado

```sql
create unique index appointments_one_active_per_slot_idx
  on public.appointments (slot_id, student_id)
  where status <> 'cancelled';
```

Índice parcial: a mesma aluna não entra duas vezes no mesmo horário, mas depois
de cancelar ela pode reservar de novo — o registro cancelado fica no histórico
sem bloquear a nova reserva.

### Capacidade da turma

Duas proteções em camadas.

A primeira são duas constraints declarativas:

```sql
booked_count integer not null default 0 check (booked_count >= 0),
constraint schedule_slots_capacity_not_exceeded check (booked_count <= capacity)
```

Elas valem inclusive para a dona do schema: nem uma migration futura com bug
consegue passar da capacidade ou deixar o contador negativo.

A segunda é a trava de linha dentro de `book_appointment()`:

```sql
select * into v_slot from public.schedule_slots
where id = p_slot_id and cancelled_at is null
for update;
```

O `for update` é o que resolve a corrida de verdade. Se duas alunas tocarem
"reservar" no mesmo instante na última vaga, ambas leriam `booked_count = 11` e
ambas gravariam 12. Com a trava, a segunda espera a primeira terminar, lê o
valor já atualizado e recebe "turma cheia".

Validação no React não resolve isso: cada aba sequer sabe que a outra
requisição existe. É por isso que reservar é chamada de função, e não `insert`
direto — e por isso `appointments` não tem privilégio de `INSERT` para papel
algum da API.

### O contador não é escrevível

`booked_count` está fora de todo `GRANT`, inclusive para a Karol. As únicas formas
de alterá-lo são `book_appointment`, `cancel_appointment`,
`admin_book_appointment` e `reconcile_slot_counts`.

Um contador que o cliente pode escrever é um contador que pode ser posto abaixo do
real para liberar vaga numa turma cheia. Como o valor é denormalizado de propósito
— contar agendamentos a cada consulta de vaga sairia caro —, o cuidado com quem
escreve nele tem de compensar a ausência da contagem ao vivo.

### Reconciliação

Todo dado denormalizado acaba divergindo: restauração de backup, correção manual,
bug em migration futura. `reconcile_slot_counts(slot_id)` é o processo
administrativo para isso.

Ela **recalcula** a partir dos agendamentos não cancelados, em vez de aceitar um
número vindo de fora, e devolve apenas as linhas que estavam erradas — assim
resultado vazio é a resposta normal, e qualquer linha retornada merece
investigação.

### Assinatura inativa

Verificada dentro de `book_appointment()`, no servidor:

```sql
if not exists (
  select 1 from public.subscriptions
  where student_id = v_student_id and status = 'active'
) then
  raise exception 'Assinatura inativa: não é possível agendar novas aulas.';
end if;
```

A tela que esconde o botão é conveniência. Esta linha é o controle.

### Uma assinatura aberta por aluna

```sql
create unique index subscriptions_one_open_per_student_idx
  on public.subscriptions (student_id)
  where status in ('pending', 'active', 'past_due');
```

As encerradas ficam — o índice parcial permite o histórico de assinaturas
canceladas sem permitir duas vigentes ao mesmo tempo.

### Estados coerentes

Cada tabela com ciclo de vida tem uma constraint que impede o par incoerente:

```sql
constraint students_archived_at_matches_status check (
  (status = 'archived' and archived_at is not null)
  or (status = 'active' and archived_at is null)
)
```

O mesmo padrão vale para `appointments.cancelled_at` e
`subscriptions.cancelled_at`. Sem isso, um bug produziria uma aluna "arquivada"
sem data de arquivamento e ninguém perceberia.

### Referência do provedor

```sql
create unique index subscriptions_provider_ref_idx
  on public.subscriptions (provider, provider_subscription_id)
  where provider is not null and provider_subscription_id is not null;
```

Índice parcial, e não constraint de tabela: `unique` trata cada NULL como
distinto, então a constraint deixaria conviver quantas assinaturas sem provedor
quisessem — o que é correto, mas por acidente. O índice parcial diz isso de forma
explícita e cobre só as linhas que têm identificador.

Uma constraint separada garante que os dois campos estejam preenchidos juntos ou
ausentes juntos: meio vínculo é pior que vínculo nenhum, porque não dá para
reconciliar.

## Idempotência de pagamento

```sql
unique (provider, provider_event_id)
```

Provedores reentregam webhooks quando não recebem confirmação. Sem essa restrição,
uma reentrega renovaria a assinatura duas vezes.

**Mas conflito nessa chave não significa "evento já processado".** Esse era o
desenho anterior, e ele tinha um furo concreto: o evento é inserido, e a execução
morre antes de atualizar a assinatura — timeout na consulta ao provedor, deploy no
meio, limite de tempo da Edge Function. A linha existe, a assinatura não foi
ativada, e a aluna pagou. Na reentrega, o desenho antigo responderia "já
processado" e não faria nada. A assinatura ficaria pendente para sempre.

Quem responde isso agora é uma máquina de estados própria:

| Coluna | Para quê |
| --- | --- |
| `processing_status` | `received` → `processing` → `processed` \| `failed` |
| `attempt_count` | Quantas vezes foi tentado |
| `last_error_code` | Código curto e estável, no máximo 64 caracteres |
| `received_at` | Quando chegou |
| `processing_started_at` | Início da tentativa atual; também é o lease |
| `processed_at` | Conclusão. `not null` se e somente se `processed` |
| `next_retry_at` | Quando tentar de novo |
| `payload_summary` | Resumo filtrado |

Duas constraints impedem estado que mente: `processed` sem `processed_at`, e
qualquer outro estado com `processed_at` preenchido.

O fluxo completo, com as funções de cada passo, está em
[`payment-integration.md`](payment-integration.md#contrato-do-webhook-passo-a-passo).

## Convites de ativação

`internal.student_activation_tokens` guarda `sha256(token)`, nunca o token. Um
dump do banco não permite ativar conta nenhuma.

```sql
create unique index activation_tokens_one_active_per_student_idx
  on internal.student_activation_tokens (student_id)
  where status = 'active';
```

Um convite ativo por cadastro. Trocar o plano exige revogar e emitir de novo, para
que nunca fique ambíguo qual plano a aluna contratou.

Três constraints garantem coerência entre `status` e as datas (`used_at`,
`revoked_at`) e que a validade seja posterior à criação. A expiração real é
conferida pelo relógio na hora do consumo, e não pelo `status` — marcar como
vencido é tarefa de manutenção, que pode atrasar.

## Fila de convites

`internal.account_invitation_jobs` existe porque ativar a assinatura e enviar o
e-mail têm garantias diferentes. A primeira é transacional no nosso banco; a
segunda depende de um serviço externo que pode estar fora do ar. Juntá-las
obrigaria a escolher entre desfazer um pagamento confirmado ou arriscar cobrar
duas vezes.

A linha é gravada na mesma transação que ativa a assinatura. Depois disso, o envio
pode falhar e ser repetido à vontade sem que a assinatura seja tocada de novo.

```sql
create unique index invitation_jobs_one_open_per_student_idx
  on internal.account_invitation_jobs (student_id)
  where status in ('pending', 'processing', 'failed');
```

É esse índice que impede um segundo e-mail quando o webhook é reentregue depois de
a assinatura já estar ativa.

## Índices parciais das filas

Todas as filas têm índice parcial cobrindo só o que ainda dá trabalho:

| Índice | Cobre |
| --- | --- |
| `payment_events_pending_idx` | `received` ou `failed` |
| `activation_tokens_expiring_idx` | convites `active` |
| `invitation_jobs_runnable_idx` | `pending` ou `failed` |

O tamanho deles não cresce com o histórico — só com o trabalho pendente.

## Paginação

`max_rows = 200` em [`supabase/config.toml`](../supabase/config.toml) limita
qualquer resposta da API, então nenhuma consulta esquecida devolve a tabela
inteira. As listas do portal usam `range()` com os índices
`appointments_student_history_idx` e `appointments_starts_at_idx`, ambos
ordenados por data decrescente — a mesma ordem que a tela pede.

## Funções

### Chamáveis pelo portal (`authenticated`)

| Função | Chamada por | O que garante |
| --- | --- | --- |
| `book_appointment(slot_id)` | Aluna | Cadastro ativo, assinatura ativa, vaga disponível, sem duplicidade, tudo numa transação. |
| `cancel_appointment(id, motivo)` | Aluna (própria) ou Karol | Muda status, devolve a vaga, preserva o registro. |
| `admin_create_student(nome, email, tel)` | Karol | Normaliza o e-mail e recusa duplicidade sem repetir o endereço na mensagem. |
| `admin_update_student(id, …)` | Karol | `null` significa "não mexer". Registra quais campos mudaram, não os valores. |
| `admin_book_appointment(aluna, horário)` | Karol | Agenda sem exigir assinatura ativa, mas respeitando capacidade e duplicidade. |
| `archive_student(id)` | Karol | Arquivamento lógico. |
| `reactivate_student(id)` | Karol | Reverte o arquivamento. |
| `reconcile_slot_counts(slot_id)` | Karol | Recalcula `booked_count` a partir dos agendamentos ativos. |
| `current_student_id()` | Políticas RLS | Id da aluna vinculada à conta atual. |
| `is_admin()` | Políticas RLS | Lê o claim `user_role` do token. |

Todas as administrativas começam com `if not public.is_admin() then raise`, porque
`authenticated` é o mesmo papel de banco para a aluna e para a Karol.

### Chamáveis só pelo servidor (`service_role`)

| Função | O que faz |
| --- | --- |
| `srv_issue_activation_token(aluna, plano, admin, ttl)` | Emite o convite e devolve o token uma única vez. |
| `srv_consume_activation_token(token)` | Valida e consome. Devolve um código, não exceção. |
| `srv_revoke_activation_token(id, admin)` | Revoga convite ativo. |
| `srv_expire_activation_tokens()` | Manutenção. Idempotente. |
| `srv_link_student_account(aluna, conta, actor)` | Vincula a conta ao cadastro que originou o convite. |
| `srv_record_payment_event(…)` | Registra ou localiza o evento; devolve o estado. |
| `srv_begin_payment_event_processing(id, lease)` | Reserva o evento. Falso se concluído ou já reservado. |
| `srv_complete_payment_event(…)` | Assinatura, evento e convite numa transação. |
| `srv_fail_payment_event(id, código, espera)` | Marca falha sem tocar a assinatura. |
| `srv_claim_invitation_job(lease)` | Reserva um convite da fila (`skip locked`). |
| `srv_complete_invitation_job(id)` / `srv_fail_invitation_job(…)` | Encerra ou reagenda. |

### Interna ao banco

| Função | Chamada por |
| --- | --- |
| `custom_access_token_hook(event)` | Servidor de autenticação; injeta `user_role` no JWT. |
| `handle_new_user()` | Trigger em `auth.users`. Cria `profiles` e o papel inicial. Não escolhe aluna. |
| `set_updated_at()` | Triggers de `updated_at`. |
| `internal.is_admin_user(uuid)` | Confere o papel na tabela, para quando não há token. |

## Avaliações

Fora desta versão, de propósito. Envolvem medidas corporais e dados de saúde —
categoria que exige decisão específica sobre consentimento, retenção e quem
pode ler. A interface mostra "Em breve" na ficha da aluna; nenhuma coluna, nenhuma
tabela e nenhum campo foi criado. Registrado em
[`decisions.md`](decisions.md).
