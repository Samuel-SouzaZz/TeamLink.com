import type { AppRole } from '../types/auth'

/** Para onde cada papel vai quando entra no portal. */
export function homePathForRole(role: AppRole): string {
  return role === 'admin' ? '/admin' : '/app'
}
