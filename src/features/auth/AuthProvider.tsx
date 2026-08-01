import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'

import { getSupabaseClient } from '../../lib/supabase/client'
import { isSupabaseConfigured } from '../../lib/supabase/env'
import type { AppRole, AuthStatus, AuthUser } from '../../types/auth'
import { AuthContext, type AuthContextValue } from './AuthContext'
import { readRoleFromAccessToken } from './claims'
import { DEMO_MODE } from './demoMode'

const DEMO_USERS: Record<AppRole, AuthUser> = {
  admin: {
    id: 'demo-admin',
    email: 'karol@teamlink.demo',
    role: 'admin',
    fullName: 'Karol Cascelli',
  },
  student: {
    id: 'demo-student',
    email: 'aluna@teamlink.demo',
    role: 'student',
    fullName: 'Aluna Demonstração',
  },
}

function toAuthUser(session: Session): AuthUser | null {
  const role = readRoleFromAccessToken(session.access_token)

  // Sessão sem papel significa hook de claims mal configurado. Tratar como não
  // autenticada é mais seguro do que adivinhar um papel padrão.
  if (!role) return null

  const fullName = session.user.user_metadata?.full_name
  return {
    id: session.user.id,
    email: session.user.email ?? '',
    role,
    fullName: typeof fullName === 'string' ? fullName : null,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [status, setStatus] = useState<AuthStatus>(
    isSupabaseConfigured ? 'loading' : 'anonymous',
  )

  useEffect(() => {
    if (!isSupabaseConfigured) return

    const supabase = getSupabaseClient()
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      const nextUser = data.session ? toAuthUser(data.session) : null
      setUser(nextUser)
      setStatus(nextUser ? 'authenticated' : 'anonymous')
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session ? toAuthUser(session) : null
      setUser(nextUser)
      setStatus(nextUser ? 'authenticated' : 'anonymous')
    })

    return () => {
      active = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  const signInWithPassword = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: 'Portal ainda não conectado ao Supabase.' }
    }

    const { error } = await getSupabaseClient().auth.signInWithPassword({ email, password })
    return { error: error ? 'E-mail ou senha inválidos.' : null }
  }, [])

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) {
      await getSupabaseClient().auth.signOut()
    }
    setUser(null)
    setStatus('anonymous')
  }, [])

  const signInAsDemo = useCallback((role: AppRole) => {
    setUser(DEMO_USERS[role])
    setStatus('authenticated')
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      signInWithPassword,
      signOut,
      signInAsDemo: DEMO_MODE ? signInAsDemo : null,
    }),
    [status, user, signInWithPassword, signOut, signInAsDemo],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
