import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { LoadingState } from '../components/portal'
import { useAuth } from '../features/auth/AuthContext'
import type { AppRole } from '../types/auth'
import { homePathForRole } from './paths'

/**
 * Guardas de navegação.
 *
 * Elas decidem apenas o que renderizar. Nenhuma delas protege dado: quem faz
 * isso é o RLS no Postgres. Se alguém burlar a guarda no navegador, as
 * consultas continuam voltando vazias — a barreira real está no banco.
 */

export function RequireAuth({ children }: { children: ReactNode }) {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'loading') return <LoadingState rows={3} />

  if (status === 'anonymous') {
    // `state.from` permite devolver a usuária à página pretendida após o login.
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <>{children}</>
}

export function RequireRole({ role, children }: { role: AppRole; children: ReactNode }) {
  const { status, user } = useAuth()

  if (status === 'loading') return <LoadingState rows={3} />
  if (status === 'anonymous' || !user) return <Navigate to="/login" replace />

  // Papel errado não vira erro: a usuária é levada à própria área.
  if (user.role !== role) return <Navigate to={homePathForRole(user.role)} replace />

  return <>{children}</>
}
