import { createContext, useContext } from 'react'
import type { AppRole, AuthStatus, AuthUser } from '../../types/auth'

export interface AuthContextValue {
  status: AuthStatus
  user: AuthUser | null
  signInWithPassword: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  /** Só existe em desenvolvimento sem Supabase configurado. */
  signInAsDemo: ((role: AppRole) => void) | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth precisa estar dentro de <AuthProvider>')
  return context
}
