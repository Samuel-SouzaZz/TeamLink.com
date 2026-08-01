import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '../components/portal'
import { Logo } from '../components/portal/Logo'

const Root = styled.main`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px 16px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
`

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size['2xl']};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
`

const Text = styled.p`
  margin: 0;
  max-width: 24rem;
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`

export default function NotFoundPage() {
  return (
    <Root>
      <Logo variant="emblem" />
      <Title>Página não encontrada</Title>
      <Text>O endereço que você abriu não existe ou foi movido.</Text>
      <Button as={Link} to="/">
        Voltar ao início
      </Button>
    </Root>
  )
}
