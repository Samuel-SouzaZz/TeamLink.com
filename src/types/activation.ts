/**
 * Contratos do fluxo de ativação e do processamento de pagamento.
 *
 * Espelha os tipos declarados em
 * `supabase/migrations/20260731090400_invitation_pipeline.sql`. Nada aqui faz
 * chamada de rede nem decide autorização — as decisões acontecem no Postgres, e
 * estes tipos existem para que o portal não invente estados que o banco não
 * reconhece.
 *
 * O portal atual não consome nenhuma destas funções: a tela `/ativar` segue
 * demonstrativa e o pagamento está desabilitado. O que está aqui é o contrato
 * que a futura Edge Function vai cumprir.
 */

/* ── Convite de ativação ────────────────────────────────────────────────── */

export const ACTIVATION_TOKEN_STATUSES = [
  'active',
  'used',
  'revoked',
  'expired',
] as const
export type ActivationTokenStatus = (typeof ACTIVATION_TOKEN_STATUSES)[number]

/**
 * Resultado de uma tentativa de consumo, como devolvido por
 * `srv_consume_activation_token`.
 *
 * O banco distingue os motivos porque o servidor precisa deles para decidir e
 * para registrar. O navegador **não** recebe essa distinção — ver
 * `activationFailureMessage`.
 */
export const ACTIVATION_OUTCOMES = [
  'valid',
  'not_found',
  'expired',
  'revoked',
  'already_used',
] as const
export type ActivationOutcome = (typeof ACTIVATION_OUTCOMES)[number]

export function isActivationOutcome(value: unknown): value is ActivationOutcome {
  return (
    typeof value === 'string' &&
    (ACTIVATION_OUTCOMES as readonly string[]).includes(value)
  )
}

/** Só um resultado libera a criação da conta. */
export function canActivate(outcome: ActivationOutcome): boolean {
  return outcome === 'valid'
}

/**
 * A mensagem que a aluna vê quando o convite não serve.
 *
 * É deliberadamente a mesma para todos os motivos. Diferenciar "convite não
 * encontrado" de "convite já usado" transformaria a tela num verificador: com
 * uma lista de tokens candidatos, a diferença entre as duas respostas diria
 * quais existem. E distinguir "expirado" de "revogado" contaria à pessoa errada
 * que a Karol cancelou aquele convite de propósito.
 *
 * O motivo real fica no `audit_logs` e no `attempt_count` do convite, onde a
 * Karol consegue ver e quem tenta adivinhar não.
 */
export function activationFailureMessage(): string {
  return 'Este link de ativação não é válido. Fale com a Karol para receber um novo.'
}

/* ── Eventos de pagamento ───────────────────────────────────────────────── */

export const PAYMENT_EVENT_STATUSES = [
  'received',
  'processing',
  'processed',
  'failed',
] as const
export type PaymentEventStatus = (typeof PAYMENT_EVENT_STATUSES)[number]

/**
 * Se o evento pode ser processado novamente.
 *
 * É o coração da correção de idempotência: a existência da linha em
 * `payment_events` não significa que o pagamento foi tratado. Um evento pode ter
 * sido gravado e a execução morrer antes de tocar a assinatura, e nesse caso ele
 * fica em `received` — precisando de nova tentativa, não de descarte.
 *
 * `processing` fica de fora porque outra execução o reservou; quem decide se o
 * lease venceu é o banco, dentro de `begin_payment_event_processing`.
 */
export function canRetryPaymentEvent(status: PaymentEventStatus): boolean {
  return status === 'received' || status === 'failed'
}

/** `processed` é terminal: reentrega não altera a assinatura de novo. */
export function isPaymentEventSettled(status: PaymentEventStatus): boolean {
  return status === 'processed'
}

/* ── Fila de convites ───────────────────────────────────────────────────── */

export const INVITATION_JOB_STATUSES = [
  'pending',
  'processing',
  'sent',
  'failed',
] as const
export type InvitationJobStatus = (typeof INVITATION_JOB_STATUSES)[number]

export function canRetryInvitationJob(status: InvitationJobStatus): boolean {
  return status === 'pending' || status === 'failed'
}
