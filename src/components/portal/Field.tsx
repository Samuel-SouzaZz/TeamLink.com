import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import styled from 'styled-components'
import { alpha } from '../../styles/color'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.text};
`

const Input = styled.input<{ $invalid: boolean }>`
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding: 10px 14px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.size.base};
  color: ${({ theme }) => theme.colors.text};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid
    ${({ theme, $invalid }) =>
      $invalid ? alpha(theme.colors.danger, 0.7) : 'rgba(255, 255, 255, 0.14)'};
  border-radius: ${({ theme }) => theme.radius.lg};
  transition: border-color 0.2s, background-color 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    background: rgba(255, 255, 255, 0.08);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Message = styled.p<{ $invalid: boolean }>`
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.textMuted)};
`

export interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string
  /** Mensagem de erro. Quando presente, marca o campo como inválido. */
  error?: string
  hint?: ReactNode
}

/**
 * Campo de formulário com rótulo associado e erro anunciado.
 *
 * O erro é ligado ao input por `aria-describedby` e marcado com `role="alert"`,
 * então leitores de tela avisam a usuária sem que ela precise procurar.
 */
export function Field({ label, error, hint, ...inputProps }: FieldProps) {
  const id = useId()
  const messageId = `${id}-message`
  const invalid = Boolean(error)
  const message = error ?? hint

  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        $invalid={invalid}
        aria-invalid={invalid || undefined}
        aria-describedby={message ? messageId : undefined}
        {...inputProps}
      />
      {message && (
        <Message id={messageId} $invalid={invalid} role={invalid ? 'alert' : undefined}>
          {message}
        </Message>
      )}
    </Wrapper>
  )
}
