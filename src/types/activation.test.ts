import { describe, expect, it } from 'vitest'

import {
  ACTIVATION_OUTCOMES,
  PAYMENT_EVENT_STATUSES,
  activationFailureMessage,
  canActivate,
  canRetryInvitationJob,
  canRetryPaymentEvent,
  isActivationOutcome,
  isPaymentEventSettled,
} from './activation'

describe('convite de ativação', () => {
  it('libera a criação de conta apenas para o resultado válido', () => {
    expect(canActivate('valid')).toBe(true)

    const recusados = ACTIVATION_OUTCOMES.filter((outcome) => outcome !== 'valid')
    for (const outcome of recusados) {
      expect(canActivate(outcome)).toBe(false)
    }
  })

  it('não distingue os motivos de recusa na mensagem mostrada à aluna', () => {
    // Se este teste falhar porque alguém passou o motivo para a mensagem, a
    // tela terá virado um verificador: com uma lista de tokens candidatos, a
    // diferença entre "não encontrado" e "já usado" revelaria quais existem.
    const mensagens = new Set(
      ACTIVATION_OUTCOMES.filter((outcome) => outcome !== 'valid').map(() =>
        activationFailureMessage(),
      ),
    )

    expect(mensagens.size).toBe(1)
  })

  it('não vaza o motivo técnico da recusa no texto', () => {
    const mensagem = activationFailureMessage().toLowerCase()

    for (const termo of ['expirado', 'revogado', 'usado', 'not_found', 'token']) {
      expect(mensagem).not.toContain(termo)
    }
  })

  it('reconhece apenas os resultados que o banco declara', () => {
    for (const outcome of ACTIVATION_OUTCOMES) {
      expect(isActivationOutcome(outcome)).toBe(true)
    }

    for (const invalido of ['ok', 'VALID', '', 'valido', null, undefined, 42]) {
      expect(isActivationOutcome(invalido)).toBe(false)
    }
  })
})

describe('idempotência do evento de pagamento', () => {
  it('permite nova tentativa de evento recebido mas não processado', () => {
    // O ponto da correção: a linha existir não significa que o pagamento foi
    // tratado. Um evento gravado cuja execução morreu antes de tocar a
    // assinatura fica em `received`, e precisa ser tentado de novo.
    expect(canRetryPaymentEvent('received')).toBe(true)
  })

  it('permite nova tentativa de evento que falhou', () => {
    expect(canRetryPaymentEvent('failed')).toBe(true)
  })

  it('não tenta de novo o que já foi concluído', () => {
    expect(canRetryPaymentEvent('processed')).toBe(false)
    expect(isPaymentEventSettled('processed')).toBe(true)
  })

  it('não disputa evento que outra execução reservou', () => {
    expect(canRetryPaymentEvent('processing')).toBe(false)
  })

  it('trata apenas processed como estado terminal', () => {
    const naoTerminais = PAYMENT_EVENT_STATUSES.filter(
      (status) => status !== 'processed',
    )

    for (const status of naoTerminais) {
      expect(isPaymentEventSettled(status)).toBe(false)
    }
  })
})

describe('fila de convites', () => {
  it('repete pendentes e falhos, e não o que já foi enviado', () => {
    expect(canRetryInvitationJob('pending')).toBe(true)
    expect(canRetryInvitationJob('failed')).toBe(true)
    expect(canRetryInvitationJob('sent')).toBe(false)
    expect(canRetryInvitationJob('processing')).toBe(false)
  })
})
