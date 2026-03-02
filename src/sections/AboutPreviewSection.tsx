import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ArrowRight } from 'lucide-react'
import { Container, Button } from '../components/ui'

const SectionRoot = styled.section`
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};

  @media (min-width: 640px) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  }
  @media (min-width: 1024px) {
    padding: ${({ theme }) => theme.spacing['2xl']} 0;
  }
`

const SectionInner = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const Title = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.15;
  letter-spacing: -0.02em;
`

const DecorativeLine = styled.div`
  width: 4rem;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.brand};
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.full};
`

const Subtitle = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  max-width: 36rem;
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`

const CtaWrap = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`

/**
 * Seção "Sobre" — preview com título, linha decorativa, subtítulo e CTA para /sobre.
 */
export function AboutPreviewSection() {
  const navigate = useNavigate()

  return (
    <SectionRoot aria-labelledby="about-preview-title">
      <SectionInner>
        <Title id="about-preview-title">Sobre</Title>
        <DecorativeLine aria-hidden />
        <Subtitle>
          Treinos de Muay Thai com foco na turma feminina. Team Link.
        </Subtitle>
        <CtaWrap>
          <Button
            variant="primary"
            size="lg"
            rightIcon={ArrowRight}
            onClick={() => navigate('/sobre')}
            aria-label="Saiba mais sobre a academia"
          >
            Saiba mais
          </Button>
        </CtaWrap>
      </SectionInner>
    </SectionRoot>
  )
}
