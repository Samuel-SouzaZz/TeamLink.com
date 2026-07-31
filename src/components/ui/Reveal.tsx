import type { ReactNode } from 'react'
import styled from 'styled-components'
import { useInView } from '../../hooks/useInView'

export type RevealDirection = 'up' | 'left' | 'right' | 'none'

const offsets: Record<RevealDirection, string> = {
  up: 'translateY(32px)',
  left: 'translateX(-32px)',
  right: 'translateX(32px)',
  none: 'none',
}

const Wrapper = styled.div<{ $visible: boolean; $dir: RevealDirection; $delay: number }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible, $dir }) => ($visible ? 'none' : offsets[$dir])};
  transition:
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${({ $delay }) => $delay}ms,
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${({ $delay }) => $delay}ms;
  will-change: ${({ $visible }) => ($visible ? 'auto' : 'opacity, transform')};
`

export interface RevealProps {
  children: ReactNode
  direction?: RevealDirection
  delay?: number
  className?: string
}

export function Reveal({ children, direction = 'up', delay = 0, className }: RevealProps) {
  const { ref, visible } = useInView()

  return (
    <Wrapper ref={ref} $visible={visible} $dir={direction} $delay={delay} className={className}>
      {children}
    </Wrapper>
  )
}
