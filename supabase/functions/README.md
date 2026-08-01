# Edge Functions

Nenhuma função foi implementada. Este diretório existe para fixar o desenho:
**toda operação privilegiada mora aqui**, nunca no navegador.

Uma operação é privilegiada quando precisa da secret key (`sb_secret_...`), que
ignora RLS, ou de credenciais do PagBank. Se ela fosse feita no front-end, a
chave estaria no bundle — e um bundle é público por definição.

## O contrato com o banco

As funções **não** escrevem em tabela. `service_role` não tem privilégio em
nenhuma tabela de `public` nem `usage` no schema `internal`; o acesso é pelas
funções `public.srv_*`, chamadas por RPC.

Isso é deliberado. `service_role` ignora RLS por definição, então o que sobraria
como proteção seria a boa intenção de quem escreve a função. Com o contrato
`srv_*`, o que o servidor pode fazer é uma lista enumerável — e o custo é que
toda função nova precisa de uma `srv_*` ou de um `GRANT` explícito.

As assinaturas estão em
[`../migrations/20260731090400_invitation_pipeline.sql`](../migrations/20260731090400_invitation_pipeline.sql)
e resumidas em [`docs/data-model.md`](../../docs/data-model.md#funções).

## Funções previstas

### `invite-student`

A Karol convida uma aluna. Segredos: `SUPABASE_SECRET_KEY`.

```
1. Verificar que quem chamou é administradora.
   Receber a chamada não é autorização. Validar o JWT recebido e confirmar o
   papel; não confiar em nada do corpo da requisição.

2. srv_issue_activation_token(student_id, plan_id, admin_user_id)
   A função confere o papel de novo, agora contra `user_roles` — mais forte que
   confiar nesta Edge Function. Devolve o token em claro UMA vez.

3. Montar o link /ativar?t=<token> e enviar por e-mail.
   O token NÃO pode ir para log, para resposta HTTP, para métrica nem para
   mensagem de erro.

4. Responder à Karol apenas o id do convite e a validade.
```

O token em claro nunca chega ao navegador da Karol. Ela envia o convite, não o
copia.

### `create-checkout`

A aluna, ainda **sem conta**, inicia a assinatura. Segredos: `PAGBANK_TOKEN`,
`PAGBANK_ENV`, `SUPABASE_SECRET_KEY`.

Esta é a função com a superfície mais delicada do sistema, porque quem a chama
não tem sessão. Não existe `auth.uid()`, não existe papel, e tudo o que o
navegador enviar é palpite do cliente.

**O que ela não pode aceitar do navegador:** e-mail, `student_id`, `plan_id`,
parâmetro de URL, `user_metadata`. Nada disso é confiável.

**O que ela aceita:** o token do convite. Só isso.

```
1. Ler o token do corpo da requisição.

2. srv_consume_activation_token(token)
   Devolve { outcome, token_id, student_id, subscription_plan_id }.

3. Se outcome <> 'valid', responder com a MESMA mensagem para qualquer motivo.
   O banco distingue not_found / expired / revoked / already_used porque isso
   precisa ser registrado. A aluna recebe um texto único — diferenciar
   transformaria a tela num verificador de tokens.
   Ver `src/types/activation.ts`.

4. Ler o plano do banco pelo subscription_plan_id que o CONVITE devolveu.
   Nunca o que veio na requisição. O valor cobrado sai daqui.

5. POST /checkouts no PagBank, com:
      - recurrence_plan (name, interval, billing_cycles)
      - reference_id amarrando o pagamento ao student_id
      - header x-idempotency-key derivado do token_id do convite

   A chave de idempotência tem de ser DERIVADA, não gerada por chamada: uma
   chave nova a cada tentativa não impediria duplicidade. O celular repete
   requisição sozinho — sinal ruim, toque duplo, aba recarregada.

6. Devolver ao navegador o href do item com rel = "PAY".
```

Detalhe do consumo: o convite é de uso único, então uma falha entre o passo 2 e o
passo 5 queima o convite. É o comportamento seguro — a Karol emite outro. A
alternativa, marcar como usado só depois do checkout, permitiria reutilizar o
token enquanto a criação falha em série.

### `pagbank-webhook`

Recebe a notificação do PagBank. Segredos: `PAGBANK_TOKEN`,
`SUPABASE_SECRET_KEY`.

Endpoint público por necessidade: qualquer pessoa na internet pode chamá-lo.

```
1. Capturar o corpo BRUTO, antes de qualquer parse.

2. Validar x-authenticity-token:
      SHA-256("{PAGBANK_TOKEN}-{corpo bruto}")
   Comparação em tempo constante. Não fechou → 401, sem processar nem registrar
   o corpo.

   Fazer JSON.parse e depois JSON.stringify antes de calcular o hash altera
   espaços e a validação falha. É a causa mais comum de erro aqui.

3. srv_record_payment_event(...) → { event_id, processing_status, is_replay }

4. Se processing_status = 'processed' → responder 200 e parar.
   Reentrega de evento concluído é normal e não deve fazer nada.

5. srv_begin_payment_event_processing(event_id)
   Falso → outra execução está tratando. Responder 200 e parar.

6. GET no recurso na API do PagBank: o estado oficial vem de lá, não do corpo da
   notificação.

7. srv_complete_payment_event(...) — assinatura, evento e convite numa transação.
   Em erro conhecido: srv_fail_payment_event(event_id, codigo_curto).
   O código tem no máximo 64 caracteres, e não é a mensagem do provedor.

8. Responder 200 só depois de a escrita ter sido confirmada.
```

### `send-invitation-jobs`

Consome a fila de convites. Roda em cron. Segredos: `SUPABASE_SECRET_KEY`.

```
1. srv_claim_invitation_job()   → nada a fazer se vier vazio
2. Criar o usuário no Auth (Admin API) e enviar o convite
3. srv_link_student_account(student_id, auth_user_id, 'edge:send-invitation-jobs')
   O student_id vem do JOB, que veio do convite. Nunca de busca por e-mail.
4. srv_complete_invitation_job(job_id)
   Em falha: srv_fail_invitation_job(job_id, codigo_curto)
```

Separada de `pagbank-webhook` de propósito: ativar a assinatura é transacional no
nosso banco, enviar e-mail depende de um serviço externo. Juntar as duas
obrigaria a escolher entre desfazer um pagamento confirmado ou arriscar cobrar
duas vezes.

### `promote-admin`

Atribui o papel de administradora. Operação manual e rara. Segredos:
`SUPABASE_SECRET_KEY`.

Depois de promover ou rebaixar alguém, **a sessão dela precisa ser renovada ou
revogada**: o papel entra no token na emissão, não a cada requisição. Rebaixar
sem revogar deixa o acesso administrativo válido até o token expirar. Ver
[`docs/deployment-checklist.md`](../../docs/deployment-checklist.md).

## Regras que valem para todas

- Segredos vêm de `supabase secrets set`, jamais de arquivo versionado.
- Quem recebe a chamada verifica quem chamou. Receber não é autorização.
- Nenhum payload cru vai para log: eles podem conter dado pessoal, e log é
  permanente e amplamente legível.
- Nenhum token de ativação vai para log, resposta, métrica ou mensagem de erro.
- Mensagem de erro do provedor não é copiada para o banco nem para a tela.
- Sandbox e produção usam projetos e segredos separados.

O fluxo completo de pagamento, com as URLs da documentação oficial consultada,
está em [`docs/payment-integration.md`](../../docs/payment-integration.md).
