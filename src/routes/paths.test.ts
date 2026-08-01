import { describe, expect, it } from 'vitest'

import { isAppRole } from '../types/auth'
import { homePathForRole } from './paths'

describe('homePathForRole', () => {
  it('leva a administradora ao painel', () => {
    expect(homePathForRole('admin')).toBe('/admin')
  })

  it('leva a aluna à área dela', () => {
    expect(homePathForRole('student')).toBe('/app')
  })

  it('nunca manda a aluna para uma rota administrativa', () => {
    expect(homePathForRole('student').startsWith('/admin')).toBe(false)
  })
})

describe('isAppRole', () => {
  it('aceita apenas os dois papéis existentes', () => {
    expect(isAppRole('admin')).toBe(true)
    expect(isAppRole('student')).toBe(true)
  })

  it('rejeita qualquer outro valor', () => {
    for (const value of ['Admin', 'ADMIN', 'owner', '', null, undefined, 0, {}]) {
      expect(isAppRole(value)).toBe(false)
    }
  })
})
