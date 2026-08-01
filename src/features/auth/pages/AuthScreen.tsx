import type { ReactNode } from 'react'
import styled from 'styled-components'

import { Logo } from '../../../components/portal/Logo'

const Root = styled.main`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 32px 16px calc(32px + env(safe-area-inset-bottom, 0px));
  background-color: ${({ theme }) => theme.colors.background};
`

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
`

const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size['2xl']};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
`

const Subtitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`

/** Moldura das telas fora do portal: emblema completo e coluna centralizada. */
export function AuthScreen({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: ReactNode
  children: ReactNode
}) {
  return (
    <Root>
      <Panel>
        <Head>
          <Logo variant="emblem" />
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Head>
        {children}
      </Panel>
    </Root>
  )
}
