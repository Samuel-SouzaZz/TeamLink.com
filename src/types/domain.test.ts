import { describe, expect, it } from 'vitest'

import { canBook, SUBSCRIPTION_STATUSES } from './domain'

describe('canBook', () => {
  it('libera o agendamento apenas com assinatura ativa', () => {
    expect(canBook('active')).toBe(true)
  })

  it('bloqueia todos os demais estados', () => {
    const blocked = SUBSCRIPTION_STATUSES.filter((status) => status !== 'active')

    // Percorre a lista em vez de testar caso a caso: se um status novo entrar
    // no domínio, ele nasce bloqueado e este teste cobre isso sozinho.
    expect(blocked.length).toBeGreaterThan(0)
    for (const status of blocked) {
      expect(canBook(status)).toBe(false)
    }
  })

  it('mantém a assinatura cancelada sem direito a novas aulas', () => {
    expect(canBook('cancelled')).toBe(false)
    expect(canBook('pending')).toBe(false)
    expect(canBook('past_due')).toBe(false)
  })
})
