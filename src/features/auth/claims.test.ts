import { describe, expect, it } from 'vitest'

import { decodeJwtClaims, readRoleFromAccessToken } from './claims'

/**
 * Monta um JWT com assinatura falsa — só o payload importa para estes testes.
 *
 * Usa `btoa` em vez de `Buffer` para exercitar o mesmo caminho de codificação
 * que existe no navegador, incluindo o tratamento de UTF-8.
 */
function fakeJwt(payload: Record<string, unknown>): string {
  const encode = (value: object) => {
    const bytes = new TextEncoder().encode(JSON.stringify(value))
    const binary = String.fromCharCode(...bytes)
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  }

  return `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode(payload)}.assinatura-falsa`
}

describe('decodeJwtClaims', () => {
  it('lê o payload de um token válido', () => {
    const token = fakeJwt({ sub: 'abc', user_role: 'admin' })
    expect(decodeJwtClaims(token)).toEqual({ sub: 'abc', user_role: 'admin' })
  })

  it('preserva acentos no payload', () => {
    const token = fakeJwt({ name: 'Karol Cascélli' })
    expect(decodeJwtClaims(token)?.name).toBe('Karol Cascélli')
  })

  it('devolve null para entradas malformadas em vez de lançar', () => {
    expect(decodeJwtClaims('')).toBeNull()
    expect(decodeJwtClaims('sem-pontos')).toBeNull()
    expect(decodeJwtClaims('a.nao-e-base64-valido!!.c')).toBeNull()
  })
})

describe('readRoleFromAccessToken', () => {
  it('reconhece a administradora pelo claim user_role', () => {
    expect(readRoleFromAccessToken(fakeJwt({ user_role: 'admin' }))).toBe('admin')
  })

  it('reconhece a aluna pelo claim user_role', () => {
    expect(readRoleFromAccessToken(fakeJwt({ user_role: 'student' }))).toBe('student')
  })

  it('devolve null quando o hook não injetou o claim', () => {
    expect(readRoleFromAccessToken(fakeJwt({ sub: 'abc' }))).toBeNull()
    expect(readRoleFromAccessToken(fakeJwt({ user_role: null }))).toBeNull()
  })

  it('ignora papéis desconhecidos', () => {
    expect(readRoleFromAccessToken(fakeJwt({ user_role: 'superadmin' }))).toBeNull()
    expect(readRoleFromAccessToken(fakeJwt({ user_role: 42 }))).toBeNull()
  })

  // O teste que importa: user_metadata é editável pela própria usuária via
  // supabase.auth.updateUser(). Se um dia alguém trocar a leitura do claim por
  // uma leitura de metadata, este teste quebra antes de virar brecha.
  it('não aceita papel vindo de user_metadata nem de app_metadata', () => {
    expect(
      readRoleFromAccessToken(fakeJwt({ user_metadata: { user_role: 'admin' } })),
    ).toBeNull()
    expect(
      readRoleFromAccessToken(fakeJwt({ app_metadata: { user_role: 'admin' } })),
    ).toBeNull()
    expect(readRoleFromAccessToken(fakeJwt({ role: 'admin' }))).toBeNull()
  })
})
