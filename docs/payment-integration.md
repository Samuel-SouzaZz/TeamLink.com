# Integração de pagamento — PagBank

> **Nada foi integrado.** Este documento descreve o desenho e o contrato. Não há
> chamada real ao PagBank em nenhum ponto do código, nenhuma credencial foi
> solicitada, nenhum endpoint foi criado, e o botão de pagamento na tela de
> ativação está desabilitado de propósito.
>
> A implementação só deve começar com credenciais de sandbox e aprovação
> explícita.

## Produto escolhido

**Checkout Recorrente do PagBank**, criado pelo endpoint `POST /checkouts` da
API de Checkout com o objeto `recurrence_plan` no corpo da requisição.

### Documentação consultada

Toda esta seção foi verificada na documentação oficial vigente em **01/08/2026**:

| Assunto | URL |
| --- | --- |
| Checkout e Checkout Recorrente | https://developer.pagbank.com.br/docs/checkout |
| Referência do `POST /checkouts` | https://developer.pagbank.com.br/reference/criar-checkout |
| Pagamentos recorrentes (visão geral) | https://developer.pagbank.com.br/docs/pagamentos-recorrentes |
| API de Assinaturas | https://developer.pagbank.com.br/docs/assinaturas |
| Chaves públicas e de idempotência | https://developer.pagbank.com.br/docs/chaves-publicas-e-de-idempotencia |
| Confirmar autenticidade da notificação | https://developer.pagbank.com.br/reference/confirmar-autenticidade-da-notificacao |
| Webhooks | https://developer.pagbank.com.br/reference/webhooks |

### As quatro modalidades, e por que só uma serve

O PagBank oferece caminhos diferentes para cobrança recorrente, e eles têm
consequências muito diferentes para quem toca o cartão.

**1. Checkout Recorrente hospedado — é o escolhido.**
`POST /checkouts` com `recurrence_plan` (`name`, `interval`, `billing_cycles`).
A resposta traz um array `links`, e o item com `rel: "PAY"` carrega em `href` a
URL da página de pagamento do PagBank. A aluna é redirecionada para lá, digita o
cartão no domínio do PagBank, e a primeira cobrança acontece na conclusão. A
partir dela o PagBank cria a assinatura e as cobranças seguintes são
automáticas.

Duas restrições que a documentação declara e que precisam constar aqui: **a
primeira cobrança exige cartão de crédito**, e o cancelamento da assinatura é
feito pelo painel de recorrência do PagBank.

**2. Link de Pagamento Recorrente (botão do painel).**
Planos criados por API, mas o botão de adesão é copiado do painel do PagSeguro e
colado no site. Também é hospedado e também não expõe o cartão. Foi descartado
porque o vínculo entre a adesão e o cadastro da aluna passaria a depender de
configuração manual no painel, fora do controle do código e sem como amarrar o
`student_id` do convite ao pagamento.

**3. API direta de Assinaturas** (`/plans`, `/customers`, `/subscriptions`).
Descartado. Criar um assinante com dados de pagamento exige que o cartão chegue
ao nosso servidor, e é exatamente o que o desenho proíbe.

**4. Tokenização de cartão / checkout transparente.**
Descartado pelo mesmo motivo, agravado: o cartão passa pelo navegador dentro da
nossa página. Reduz o escopo de PCI, mas não o elimina, e não há nenhuma razão
para assumir esse escopo aqui.

### Por que a escolha

Porque é a única modalidade que combina duas coisas de que precisamos ao mesmo
tempo: o cartão nunca toca a nossa infraestrutura, **e** a criação do checkout é
feita por código, o que permite carregar o `reference_id` que amarra o pagamento
ao cadastro da aluna e ao convite que o originou.

### Nenhum dado de cartão passa pelo TeamLink

Confirmado. Número, validade e CVV são digitados na página do PagBank, no
domínio do PagBank. O TeamLink não recebe, não trafega, não registra e não
armazena nenhum desses dados — nem em banco, nem em log, nem em memória. O que
guardamos do provedor são identificadores opacos: `provider_subscription_id`,
`provider_event_id` e um resumo filtrado do evento.

### Divisão de responsabilidades

| | TeamLink | PagBank |
| --- | --- | --- |
| Coleta do cartão | — | integral |
| Página de pagamento | — | integral |
| Antifraude e 3DS | — | integral |
| Cobrança recorrente | — | integral |
| Escopo PCI-DSS | nenhum | integral |
| Criar o checkout com o plano correto | sim | — |
| Amarrar o pagamento ao cadastro (`reference_id`) | sim | — |
| Validar a autenticidade do webhook | sim | — |
| Confirmar o estado antes de gravar | sim | — |
| Estado da assinatura no nosso banco | sim | — |
| Liberar agendamento | sim | — |
| Convite de criação de conta | sim | — |

## Por que a arquitetura é esta

O ponto central é que **a confirmação do pagamento nunca pode vir do navegador**.
Se a assinatura fosse ativada porque a aluna voltou para uma URL de sucesso,
bastaria digitar essa URL para ativar sem pagar. O único informante confiável é
o próprio PagBank, falando com o nosso servidor.

O segundo ponto, que motivou a revisão desta etapa: **a aluna acessa `/ativar`
antes de ter conta**. Não há sessão, não há `auth.uid()`, não há papel. Tudo o
que o navegador enviar nesse momento é palpite do cliente. Então a Edge Function
`create-checkout` não pode confiar em e-mail, `student_id`, `plan_id`, parâmetro
de URL nem `user_metadata` vindos de lá.

O que ela recebe é **um token de convite opaco**, e todo o resto é resolvido no
banco a partir dele.

## Fluxo previsto

```
  Karol            Edge Function          Aluna         Edge Function        PagBank
    │                     │                  │                │                 │
    │ convidar aluna      │                  │                │                 │
    │────────────────────>│                  │                │                 │
    │        srv_issue_activation_token       │                │                 │
    │        (valida admin na tabela)         │                │                 │
    │                     │─── link com token ──────────────> │                 │
    │                     │                  │                │                 │
    │                     │                  │ abre /ativar   │                 │
    │                     │                  │───────────────>│                 │
    │                     │      srv_consume_activation_token │                 │
    │                     │      devolve student_id e plan_id │                 │
    │                     │                  │                │ POST /checkouts │
    │                     │                  │                │ + recurrence_plan
    │                     │                  │                │ + x-idempotency-key
    │                     │                  │                │────────────────>│
    │                     │                  │                │<── links[PAY] ──│
    │                     │                  │<── redireciona │                 │
    │                     │                  │                                  │
    │                     │                  │ paga no ambiente do PagBank      │
    │                     │                  │─────────────────────────────────>│
    │                     │                  │                │                 │
    │                     │                  │                │<─── webhook ────│
    │                     │                  │                │                 │
    │             1. valida x-authenticity-token                                │
    │             2. srv_record_payment_event                                   │
    │             3. srv_begin_payment_event_processing                          │
    │             4. GET no PagBank: estado oficial                              │
    │             5. srv_complete_payment_event  ← transação única               │
    │             6. srv_claim_invitation_job    ← etapa separada                │
    │                     │                  │                │                 │
    │                     │<── convite para criar a senha ────│                 │
```

## Contrato do webhook, passo a passo

Esta é a parte que a revisão desta etapa corrigiu. A ordem importa, e cada passo
existe por um motivo específico.

### 1. Validar a assinatura antes de ler o corpo

O endpoint é público por necessidade: qualquer pessoa na internet pode chamá-lo.
A validação é o que separa um webhook real de um falsificado.

O PagBank envia o header **`x-authenticity-token`**, que contém
`SHA-256("{token_da_conta}-{corpo_bruto_da_requisição}")` em hexadecimal.

Três detalhes que a documentação enfatiza e que são a causa mais comum de falha:

- O corpo tem de ser o **bruto**, exatamente como chegou. Fazer
  `JSON.parse` e depois `JSON.stringify` antes de calcular o hash altera espaços
  e o hash não fecha.
- O segredo é o **token da conta** — o mesmo usado para autenticar as chamadas à
  API. Não existe um segredo de webhook separado no PagBank.
- A comparação deve ser em tempo constante.

Se não fechar, descartar e responder 401. Não processar, não registrar o corpo.

### 2. Registrar ou localizar o evento

`srv_record_payment_event(provider, provider_event_id, event_type, payload_summary)`.

Devolve `event_id`, `processing_status` e `is_replay`.

A restrição `unique (provider, provider_event_id)` continua existindo, e continua
sendo o que impede duas linhas para o mesmo evento. **O que mudou é a leitura do
conflito.**

Antes, conflito nessa chave era tratado como "evento já processado". Isso está
errado, e o cenário que quebra é concreto: o evento é inserido, e a execução
morre antes de atualizar a assinatura — timeout na consulta ao PagBank, deploy no
meio, limite de tempo da Edge Function. A linha existe, a assinatura não foi
ativada, e a aluna pagou. Na reentrega, o desenho antigo diria "já processado" e
não faria nada. A assinatura ficaria pendente para sempre.

Quem responde agora é `processing_status`, não a existência da linha.

### 3. Se já estiver `processed`, responder como duplicado

Reentrega de evento concluído é normal: o provedor reentrega quando não recebe
confirmação. Responder 200 sem fazer nada é o comportamento correto — o efeito
desejado já existe.

`srv_begin_payment_event_processing` devolve `false` nesse caso, e
`srv_complete_payment_event` sai em silêncio se chamada de novo. As duas defesas
existem porque a segunda protege contra chamada fora de ordem.

### 4. Se estiver `received` ou `failed`, tentar de novo

`srv_begin_payment_event_processing(event_id)` marca `processing`, grava
`processing_started_at` e incrementa `attempt_count`. Devolve `false` quando
outra execução já reservou o evento dentro da janela do lease — cinco minutos por
padrão — o que evita dois workers processando a mesma cobrança.

### 5. Consultar o estado oficial no PagBank

Fazer `GET` no recurso e ler o estado de lá, em vez de confiar no conteúdo da
notificação. A notificação diz "algo mudou"; o que mudou é o provedor que
responde.

### 6. Atualizar assinatura e concluir o evento numa transação

`srv_complete_payment_event(...)` faz, numa só transação:

- atualiza `subscriptions` (status, período, identificadores do provedor);
- marca o evento como `processed` com `processed_at`;
- enfileira o convite em `internal.account_invitation_jobs`, se a aluna ainda não
  tiver conta.

Se qualquer parte falhar, nada aconteceu, e a reentrega encontra o evento em
`processing` ou `failed` e tenta de novo. Em caso de erro conhecido, chamar
`srv_fail_payment_event(event_id, codigo_curto)` — que grava `last_error_code` e
`next_retry_at`, e **não** toca a assinatura.

`last_error_code` aceita no máximo 64 caracteres, de propósito: é para código
estável (`provider_unreachable`, `signature_invalid`), não para mensagem do
provedor, que pode carregar dado da pessoa.

### 7. O convite é etapa separada e repetível

`srv_claim_invitation_job` → enviar o e-mail → `srv_complete_invitation_job` ou
`srv_fail_invitation_job`.

Ativar a assinatura e enviar o e-mail têm garantias diferentes: a primeira é
transacional no nosso banco, a segunda depende de um serviço externo que pode
estar fora do ar. Juntá-las obrigaria a escolher entre desfazer um pagamento
confirmado ou correr o risco de cobrar duas vezes.

O índice único parcial `invitation_jobs_one_open_per_student_idx` garante que a
aluna nunca tenha dois convites em voo, mesmo com o webhook reentregue várias
vezes.

## Idempotência na criação do checkout

Confirmado na documentação: o PagBank aceita o header **`x-idempotency-key`**.
Requisições repetidas com a mesma chave devolvem a resposta da primeira execução
bem-sucedida, em vez de criar um segundo recurso.

Isso importa aqui porque o celular repete requisição sozinho — sinal ruim,
usuária tocando duas vezes, aba recarregada. Sem a chave, cada repetição criaria
um checkout novo, e a aluna poderia terminar com duas assinaturas.

A chave deve ser **derivada do convite, não gerada por chamada**: uma chave nova
a cada tentativa não impediria nada. O `id` do convite de ativação serve
exatamente para isso, já que é único por aluna e por plano.

## O que a URL de retorno faz

Mostra uma mensagem. Só isso. Não ativa nada, não confirma nada e não é usada
como evidência de pagamento. Se a aluna chegar nela antes do webhook, a tela
informa que a confirmação está em andamento.

`redirect_url` e `return_url` são campos distintos no `POST /checkouts` — o
primeiro para depois da finalização, o segundo para o retorno à loja incluindo o
caso de cancelamento. Ambos limitados a 255 caracteres.

## Regras

- Nenhum dado de cartão trafega ou é armazenado no TeamLink.
- Nenhum payload cru vai para log nem para o banco. `payload_summary` recebe
  resumo filtrado; a coluna é permanente.
- Guardamos só o necessário para reconciliar: `provider`,
  `provider_subscription_id`, `provider_event_id`, tipo do evento e o resumo.
- Sandbox e produção usam projetos Supabase e credenciais separados.
- Todos os segredos ficam em `supabase secrets set`, nunca em arquivo versionado
  nem em variável `VITE_*`.

## Segredos necessários

| Nome | Onde | Observação |
| --- | --- | --- |
| `PAGBANK_TOKEN` | Secret da Edge Function | Autentica a API **e** valida a assinatura do webhook |
| `PAGBANK_ENV` | Secret da Edge Function | `sandbox` \| `production` |
| `SUPABASE_SECRET_KEY` | Secret da Edge Function | Mapeia para `service_role` |

Não existe `PAGBANK_WEBHOOK_SECRET`. Uma versão anterior deste documento e do
`.env.example` listava esse nome, que não corresponde à API real — a assinatura é
calculada com o token da conta.

**Consequência operacional:** um único segredo cumpre dois papéis, então
rotacioná-lo invalida a autenticação da API e a validação do webhook ao mesmo
tempo. A rotação precisa ser coordenada, e não é uma troca de valor sem impacto.
Isso está registrado como risco aceito em [`decisions.md`](decisions.md).

## Antes de implementar

1. Criar conta sandbox no PagBank e obter o token.
2. Criar o projeto Supabase de desenvolvimento
   ([`deployment-checklist.md`](deployment-checklist.md)).
3. Reconferir na documentação vigente o formato do `recurrence_plan` e o
   `rel: "PAY"` — este documento foi escrito em 01/08/2026 e a API pode mudar.
4. Implementar `invite-student`, `create-checkout` e `pagbank-webhook`.
5. Testar reentrega proposital do mesmo evento e comprovar que a assinatura não é
   alterada duas vezes.
6. Testar interrupção no meio do processamento e comprovar que a reentrega
   recupera.
7. Testar webhook com assinatura inválida e confirmar a recusa com 401.
8. Testar falha no envio do convite e comprovar que a assinatura permanece ativa
   e que só um convite é enviado depois.
9. Só então apontar para produção.
