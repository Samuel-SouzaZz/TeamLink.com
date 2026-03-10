import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ArrowRight } from 'lucide-react'
import { Container, Button } from '../components/ui'
import { sobreImage } from '../assets/Sobre'

const SectionRoot = styled.section`
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surfaceElevated};

  @media (min-width: 640px) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  }
  @media (min-width: 1024px) {
    padding: ${({ theme }) => theme.spacing['2xl']} 0;
  }
`

const SectionInner = styled(Container)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing['2xl']};
  }
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3);
  justify-self: center;
  max-width: 100%;

  @media (min-width: 1024px) {
    aspect-ratio: 3 / 4;
    max-height: 480px;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`

const Title = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.brand};
  line-height: 1.2;
  letter-spacing: -0.02em;
`

const DecorativeLine = styled.div`
  width: 3rem;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.brand};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.full};
`

const Text = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Chip = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.text};
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
`

const BADGES = ['Desde 2015', 'Team Link', 'Evolução'] as const

/**
 * Seção "Turma Feminina" — duas colunas (imagem + conteúdo), chips e CTA para /contato.
 */
export function FemaleClassSection() {
  const navigate = useNavigate()

  return (
    <SectionRoot aria-labelledby="female-class-title">
      <SectionInner>
        <ImageWrapper>
          <Image
            src={sobreImage}
            alt="Treino de Muay Thai na turma feminina — espaço dedicado às mulheres no tatame."
            loading="lazy"
            width={800}
            height={600}
            decoding="async"
          />
        </ImageWrapper>
        <Content>
          <Title id="female-class-title">Turma Feminina</Title>
          <DecorativeLine aria-hidden />
          <Text>
            Espaço dedicado às mulheres no tatame, com foco em técnica,
            disciplina e evolução constante.
          </Text>
          <Chips aria-label="Diferenciais">
            {BADGES.map((label) => (
              <Chip key={label}>{label}</Chip>
            ))}
          </Chips>
          <Button
            variant="primary"
            size="lg"
            rightIcon={ArrowRight}
            onClick={() => navigate('/contato')}
            aria-label="Conheça a turma e entre em contato"
          >
            Conheça a turma
          </Button>
        </Content>
      </SectionInner>
    </SectionRoot>
  )
}
