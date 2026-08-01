import styled, { css } from 'styled-components'
import { alpha } from '../../styles/color'
import { ctaTypography, focusRing } from '../../styles/mixins'

export type ButtonVariant = 'accent' | 'ghost' | 'danger'

const variants = {
  accent: css`
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentText};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      filter: brightness(1.08);
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.35);
    }
  `,
  danger: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.danger};
    border: 1px solid ${({ theme }) => alpha(theme.colors.danger, 0.45)};

    &:hover:not(:disabled) {
      background: ${({ theme }) => alpha(theme.colors.danger, 0.1)};
      border-color: ${({ theme }) => alpha(theme.colors.danger, 0.7)};
    }
  `,
} satisfies Record<ButtonVariant, ReturnType<typeof css>>

/**
 * Botão do portal. A altura mínima acompanha `theme.layout.touchTarget` para
 * garantir área de toque confortável no celular.
 */
export const Button = styled.button<{ $variant?: ButtonVariant; $block?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding: 12px 20px;
  width: ${({ $block }) => ($block ? '100%' : 'auto')};
  ${ctaTypography}
  border-radius: ${({ theme }) => theme.radius.lg};
  cursor: pointer;
  transition: filter 0.15s, background-color 0.2s, border-color 0.2s, opacity 0.2s;

  ${({ $variant = 'accent' }) => variants[$variant]}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  ${focusRing('accent')}
`
