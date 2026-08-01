import { describe, expect, it } from 'vitest'
import { matchRoutes } from 'react-router-dom'

import { routes } from './routes'

/**
 * Verifica a tabela de rotas sem subir navegador.
 *
 * `matchRoutes` é a mesma função que o roteador usa internamente para resolver
 * uma URL, então isto exercita a configuração de verdade: caminhos aninhados,
 * rota sem caminho próprio, índice e captura final. Um erro de aninhamento aqui
 * só apareceria em tempo de execução, e o build não pegaria.
 */
function idsFor(pathname: string): string[] {
  return (matchRoutes(routes, pathname) ?? []).map((match) => match.route.id ?? '')
}

describe('tabela de rotas', () => {
  it('serve o site institucional na raiz, sem passar pelo portal', () => {
    const ids = idsFor('/')
    expect(ids).toEqual(['institucional'])
    // O que garante que o visitante não carrega o AuthProvider nem o Supabase.
    expect(ids).not.toContain('portal')
  })

  it.each([
    ['/login', 'login'],
    ['/ativar', 'ativar'],
    ['/recuperar-senha', 'recuperar-senha'],
  ])('resolve a rota pública %s', (pathname, expectedId) => {
    const ids = idsFor(pathname)
    expect(ids).toContain('portal')
    expect(ids.at(-1)).toBe(expectedId)
  })

  it.each([
    ['/app', 'aluna-inicio'],
    ['/app/agendar', 'aluna-agendar'],
    ['/app/historico', 'aluna-historico'],
    ['/app/perfil', 'aluna-perfil'],
  ])('resolve %s dentro do portal da aluna', (pathname, expectedId) => {
    const ids = idsFor(pathname)
    expect(ids).toContain('aluna')
    expect(ids.at(-1)).toBe(expectedId)
  })

  it.each([
    ['/admin', 'admin-inicio'],
    ['/admin/agenda', 'admin-agenda'],
    ['/admin/alunas', 'admin-alunas'],
    ['/admin/planos', 'admin-planos'],
    ['/admin/mais', 'admin-mais'],
  ])('resolve %s dentro do painel', (pathname, expectedId) => {
    const ids = idsFor(pathname)
    expect(ids).toContain('admin')
    expect(ids.at(-1)).toBe(expectedId)
  })

  it('extrai o id da aluna na ficha', () => {
    const matches = matchRoutes(routes, '/admin/alunas/abc-123') ?? []
    expect(matches.at(-1)?.route.id).toBe('admin-ficha')
    expect(matches.at(-1)?.params).toEqual({ studentId: 'abc-123' })
  })

  it('cai na página de não encontrada em endereços desconhecidos', () => {
    expect(idsFor('/nao-existe').at(-1)).toBe('nao-encontrada')
    expect(idsFor('/app/inventado').at(-1)).toBe('nao-encontrada')
  })

  it('mantém toda rota autenticada sob a fronteira de sessão', () => {
    for (const pathname of ['/app', '/app/perfil', '/admin', '/admin/alunas/1']) {
      // Sem o 'portal' na cadeia, useAuth() lançaria em tempo de execução.
      expect(idsFor(pathname)).toContain('portal')
    }
  })
})
