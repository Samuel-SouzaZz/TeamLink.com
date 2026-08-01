import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Button, Field } from '../../../components/portal'
import { isSupabaseConfigured } from '../../../lib/supabase/env'
import { homePathForRole } from '../../../routes/paths'
import { useAuth } from '../AuthContext'
import { DEMO_MODE } from '../demoMode'
import { AuthScreen } from './AuthScreen'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const FormError = styled.p`
  margin: 0;
  padding: 10px 12px;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.danger};
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.35);
  border-radius: ${({ theme }) => theme.radius.lg};
`

const Notice = styled.p`
  margin: 0;
  padding: 12px;
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${({ theme }) => theme.radius.lg};
`

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`

const DemoActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 4px;
`

export default function LoginPage() {
  const { status, user, signInWithPassword, signInAsDemo } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Já autenticada: manda para a área do próprio papel.
  if (status === 'authenticated' && user) {
    const from = (location.state as { from?: string } | null)?.from
    return <Navigate to={from ?? homePathForRole(user.role)} replace />
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    const result = await signInWithPassword(email, password)

    setSubmitting(false)
    if (result.error) setError(result.error)
  }

  return (
    <AuthScreen title="Entrar" subtitle="Acesse sua área para agendar e acompanhar suas aulas.">
      {!isSupabaseConfigured && !DEMO_MODE && (
        <Notice>
          O portal ainda não está conectado ao servidor. Fale com a Karol pelo WhatsApp para
          agendar sua aula.
        </Notice>
      )}

      <Form onSubmit={handleSubmit} noValidate>
        {error && <FormError role="alert">{error}</FormError>}

        <Field
          label="E-mail"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="voce@email.com"
        />

        <Field
          label="Senha"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button type="submit" $block disabled={submitting || !isSupabaseConfigured}>
          {submitting ? 'Entrando…' : 'Entrar'}
        </Button>
      </Form>

      <Footer>
        <Link to="/recuperar-senha">Esqueci minha senha</Link>
        <span>
          Ainda não tem acesso? O cadastro é feito pela Karol. <Link to="/">Voltar ao site</Link>
        </span>
      </Footer>

      {signInAsDemo && (
        <DemoActions>
          <Notice>
            Supabase não configurado. Estes atalhos existem apenas em desenvolvimento e não
            entram no build de produção.
          </Notice>
          <Button
            type="button"
            $variant="ghost"
            $block
            onClick={() => {
              signInAsDemo('admin')
              navigate('/admin')
            }}
          >
            Entrar como Karol (demo)
          </Button>
          <Button
            type="button"
            $variant="ghost"
            $block
            onClick={() => {
              signInAsDemo('student')
              navigate('/app')
            }}
          >
            Entrar como aluna (demo)
          </Button>
        </DemoActions>
      )}
    </AuthScreen>
  )
}
