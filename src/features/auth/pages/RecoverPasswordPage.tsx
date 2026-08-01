import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button, Field } from '../../../components/portal'
import { getSupabaseClient } from '../../../lib/supabase/client'
import { isSupabaseConfigured } from '../../../lib/supabase/env'
import { AuthScreen } from './AuthScreen'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
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

const Footer = styled.p`
  margin: 0;
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

/**
 * Recuperação de senha.
 *
 * A resposta é sempre a mesma, exista o e-mail ou não. Dizer "e-mail não
 * encontrado" transformaria esta tela num verificador de quem é aluna da Karol.
 */
export default function RecoverPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)

    if (isSupabaseConfigured) {
      await getSupabaseClient().auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      })
    }

    setSubmitting(false)
    setSent(true)
  }

  return (
    <AuthScreen
      title="Recuperar senha"
      subtitle="Enviaremos um link para você criar uma senha nova."
    >
      {sent ? (
        <>
          <Notice role="status">
            Se houver uma conta com esse e-mail, o link de recuperação chega em instantes.
            Confira também a caixa de spam.
          </Notice>
          <Footer>
            <Link to="/login">Voltar para o login</Link>
          </Footer>
        </>
      ) : (
        <>
          <Form onSubmit={handleSubmit} noValidate>
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
            <Button type="submit" $block disabled={submitting}>
              {submitting ? 'Enviando…' : 'Enviar link'}
            </Button>
          </Form>
          <Footer>
            <Link to="/login">Voltar para o login</Link>
          </Footer>
        </>
      )}
    </AuthScreen>
  )
}
