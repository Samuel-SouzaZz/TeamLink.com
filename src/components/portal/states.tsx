import type { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'
import { AlertCircle, Inbox } from 'lucide-react'
import { VisuallyHidden } from './VisuallyHidden'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 32px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Title = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
`

const Description = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.55;
  max-width: 28rem;
`

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <Wrapper>
      <Inbox size={28} aria-hidden />
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {action}
    </Wrapper>
  )
}

export function ErrorState({
  title = 'Não foi possível carregar',
  description,
  action,
}: {
  title?: string
  description?: string
  action?: ReactNode
}) {
  return (
    <Wrapper role="alert">
      <AlertCircle size={28} aria-hidden />
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {action}
    </Wrapper>
  )
}

const pulse = keyframes`
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.7; }
`

const Skeleton = styled.div<{ $height: string }>`
  height: ${({ $height }) => $height};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: rgba(255, 255, 255, 0.07);
  animation: ${pulse} 1.4s ease-in-out infinite;
`

const SkeletonStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

/** Placeholder de carregamento. `aria-busy` avisa leitores de tela. */
export function LoadingState({ rows = 3, height = '72px' }: { rows?: number; height?: string }) {
  return (
    <SkeletonStack aria-busy="true" aria-live="polite">
      <VisuallyHidden>Carregando…</VisuallyHidden>
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} $height={height} aria-hidden />
      ))}
    </SkeletonStack>
  )
}
