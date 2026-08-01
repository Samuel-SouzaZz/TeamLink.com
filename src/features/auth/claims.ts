import { isAppRole, type AppRole } from '../../types/auth'

/**
 * Decodifica o payload de um JWT sem validar a assinatura.
 *
 * Validar aqui não faria sentido: o cliente não tem a chave, e mesmo que
 * tivesse, um atacante controla o próprio navegador. Estes claims servem só
 * para escolher qual tela renderizar. A autorização real é feita pelo RLS, que
 * lê o mesmo token do lado do servidor — aí sim com a assinatura verificada.
 */
export function decodeJwtClaims(token: string): Record<string, unknown> | null {
  const payload = token.split('.')[1]
  if (!payload) return null

  try {
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padding = (4 - (base64.length % 4)) % 4
    const binary = atob(base64 + '='.repeat(padding))
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes))

    return typeof parsed === 'object' && parsed !== null
      ? (parsed as Record<string, unknown>)
      : null
  } catch {
    return null
  }
}

/**
 * Lê o papel do claim `user_role`, injetado pelo `custom_access_token_hook`.
 *
 * Só esse claim é aceito. `user_metadata` é editável pela própria usuária via
 * `supabase.auth.updateUser()`, então tratá-lo como papel seria uma escada
 * direta para escalonamento de privilégio.
 */
export function readRoleFromAccessToken(accessToken: string): AppRole | null {
  const claims = decodeJwtClaims(accessToken)
  if (!claims) return null

  const role = claims.user_role
  return isAppRole(role) ? role : null
}
