import type { ReactNode } from 'react'
import styled from 'styled-components'

/**
 * Conteúdo de uma tela do portal.
 *
 * Largura máxima de 480px: o alvo é 402x874, e no desktop a coluna centralizada
 * preserva a leitura sem esticar os cards.
 */
export const PortalPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 16px;
`

const HeadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.xl};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};
`

const Subtitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`

export function PageHeading({ title, subtitle }: { title: string; subtitle?: ReactNode }) {
  return (
    <HeadingWrap>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </HeadingWrap>
  )
}

export const SectionStack = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
