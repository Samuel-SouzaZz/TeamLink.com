import type { ReactNode } from 'react'
import styled from 'styled-components'

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`

export interface CardProps {
  children: ReactNode
  className?: string
}

export function CardBox({ children, className }: CardProps) {
  return <Card className={className}>{children}</Card>
}
