/**
 * Papéis da aplicação.
 *
 * A fonte de verdade é `public.user_roles` — uma tabela restrita no schema
 * `public`, sem GRANT para `anon` nem `authenticated` e protegida por RLS. O
 * papel é injetado no JWT pelo `custom_access_token_hook`.
 *
 * O valor lido no cliente serve apenas para decidir qual tela mostrar — quem
 * impede acesso indevido a dados é o RLS no banco. Nunca derive papel de
 * `user_metadata`: a própria usuária consegue editá-lo.
 */
export const APP_ROLES = ['admin', 'student'] as const

export type AppRole = (typeof APP_ROLES)[number]

export function isAppRole(value: unknown): value is AppRole {
  return typeof value === 'string' && (APP_ROLES as readonly string[]).includes(value)
}

export interface AuthUser {
  id: string
  email: string
  role: AppRole
  fullName: string | null
}

export type AuthStatus = 'loading' | 'authenticated' | 'anonymous'
