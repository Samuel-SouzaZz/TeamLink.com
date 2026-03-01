import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'
import type { LucideIcon } from 'lucide-react'
import { clsx } from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

const StyledButton = styled.button<{
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth?: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, transform 0.2s;

  ${({ $size, theme }) =>
    $size === 'sm' &&
    `
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    font-size: ${theme.typography.size.sm};
  `}
  ${({ $size, theme }) =>
    $size === 'md' &&
    `
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.size.base};
  `}
  ${({ $size, theme }) =>
    $size === 'lg' &&
    `
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    font-size: ${theme.typography.size.lg};
  `}

  ${({ $variant, theme }) =>
    $variant === 'primary' &&
    `
    background-color: ${theme.colors.brand};
    color: white;
    &:hover { background-color: ${theme.colors.brandLight}; }
  `}
  ${({ $variant, theme }) =>
    $variant === 'secondary' &&
    `
    background-color: ${theme.colors.surfaceElevated};
    color: ${theme.colors.textMuted};
    border: 1px solid ${theme.colors.border};
    &:hover { color: ${theme.colors.text}; background-color: rgba(255,255,255,0.05); }
  `}
  ${({ $variant, theme }) =>
    $variant === 'ghost' &&
    `
    background-color: transparent;
    color: ${theme.colors.textMuted};
    border: 1px solid ${theme.colors.border};
    &:hover { color: ${theme.colors.text}; background-color: rgba(255,255,255,0.05); }
  `}

  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand};
    outline-offset: 2px;
  }
`

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  fullWidth?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      type="button"
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      className={clsx(className)}
      {...props}
    >
      {LeftIcon && <LeftIcon size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} strokeWidth={2} aria-hidden />}
      {children}
      {RightIcon && <RightIcon size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} strokeWidth={2} aria-hidden />}
    </StyledButton>
  )
}
