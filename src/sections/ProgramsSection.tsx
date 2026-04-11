import styled from 'styled-components'
import { Check } from 'lucide-react'
import { Container, SectionTitle } from '../components/ui'
import { links } from '../data/site'
import { turmaFemininaPrice, personalPlans } from '../data/metrics'

const Section = styled.section`
  padding: 40px 16px;
  background-color: ${({ theme }) => theme.colors.background};

  @media (min-width: 768px) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`

const ProgramCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (min-width: 768px) {
    border-radius: 20px;
    padding: 40px 32px;
    gap: 20px;
  }
`

const PopularBadge = styled.span`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 16px;
  font-size: 0.625rem;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentText};
  border-radius: ${({ theme }) => theme.radius.full};
  white-space: nowrap;

  @media (min-width: 768px) {
    top: -14px;
    padding: 6px 20px;
    font-size: 0.6875rem;
  }
`

const ProgramTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.xl};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size['2xl']};
  }
`

const ProgramDesc = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.sm};
    line-height: 1.6;
  }
`

const PriceBlock = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 12px 16px;

  @media (min-width: 768px) {
    border-radius: 12px;
    padding: 16px 20px;
  }
`

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
`

const PriceValue = styled.span`
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: clamp(1.75rem, 5vw, 2.75rem);
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1;
`

const PriceSuffix = styled.span`
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const PriceNote = styled.span`
  display: block;
  margin-top: 2px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.sm};
    margin-top: 4px;
  }
`

const PlanTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const PlanRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};

  &:last-child { border-bottom: none; }

  @media (min-width: 768px) {
    padding: 12px 0;
    font-size: ${({ theme }) => theme.typography.size.base};
  }
`

const PlanPrice = styled.span`
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.typography.size.base};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.lg};
  }
`

const FeatureList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;

  svg {
    color: ${({ theme }) => theme.colors.accent};
    flex-shrink: 0;
    margin-top: 2px;
  }

  @media (min-width: 768px) {
    gap: 10px;
    font-size: ${({ theme }) => theme.typography.size.sm};
    line-height: 1.5;
  }
`

const AccentCta = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px 24px;
  margin-top: auto;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentText};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.15s, filter 0.15s;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.base};
    padding: 16px 24px;
    border-radius: 12px;
  }

  &:hover { transform: translateY(-2px); filter: brightness(1.06); }
  &:active { transform: translateY(0); }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.accent}; outline-offset: 2px; }
`

const GhostCta = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px 24px;
  margin-top: auto;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.15s, background-color 0.2s, border-color 0.2s;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.base};
    padding: 16px 24px;
    border-radius: 12px;
  }

  &:hover { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.35); transform: translateY(-2px); }
  &:active { transform: translateY(0); }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.text}; outline-offset: 2px; }
`

const TURMA_FEATURES = [
  'Turmas divididas por nível',
  'Ambiente 100% feminino e acolhedor',
  'Aulas de 60 minutos',
  'Terças e quintas às 19h',
  'Técnica, sparring e condicionamento',
] as const

const PERSONAL_FEATURES = [
  'Acompanhamento individualizado',
  'Horários flexíveis',
  'Treino focado em seus objetivos',
  'Evolução acelerada',
  'Plano de treino personalizado',
  'Aberto para mulheres e homens',
] as const

export function ProgramsSection() {
  const handleReserva = () => {
    window.open(links.whatsappReserva.href, '_blank', 'noopener,noreferrer')
  }
  const handlePersonal = () => {
    window.open(links.whatsappPersonal.href, '_blank', 'noopener,noreferrer')
  }

  const [amount, suffix] = turmaFemininaPrice.split('/')

  return (
    <Section id="programas" aria-labelledby="programas-title">
      <Container>
        <SectionTitle
          title="Programas"
          subtitle="Escolha o formato ideal para sua rotina."
          id="programas-title"
        />
        <Grid>
          <ProgramCard>
            <PopularBadge>Mais popular</PopularBadge>
            <ProgramTitle>Turma Feminina</ProgramTitle>
            <ProgramDesc>
              Aulas em grupo exclusivas para mulheres, com foco em técnica, condicionamento e empoderamento.
            </ProgramDesc>
            <PriceBlock>
              <PriceRow>
                <PriceValue>{amount}</PriceValue>
                <PriceSuffix>/{suffix}</PriceSuffix>
              </PriceRow>
              <PriceNote>2 aulas por semana</PriceNote>
            </PriceBlock>
            <FeatureList>
              {TURMA_FEATURES.map((f) => (
                <FeatureItem key={f}>
                  <Check size={14} strokeWidth={3} aria-hidden />
                  {f}
                </FeatureItem>
              ))}
            </FeatureList>
            <AccentCta type="button" onClick={handleReserva} aria-label={links.whatsappReserva.ariaLabel}>
              Reservar vaga
            </AccentCta>
          </ProgramCard>

          <ProgramCard>
            <ProgramTitle>Personal</ProgramTitle>
            <ProgramDesc>
              Treino individual 100% personalizado para seus objetivos, com atenção exclusiva e progressão acelerada.
            </ProgramDesc>
            <PlanTable>
              {personalPlans.map((p) => (
                <PlanRow key={p.sessions}>
                  <span>{p.sessions}</span>
                  <PlanPrice>{p.price}</PlanPrice>
                </PlanRow>
              ))}
            </PlanTable>
            <FeatureList>
              {PERSONAL_FEATURES.map((f) => (
                <FeatureItem key={f}>
                  <Check size={14} strokeWidth={3} aria-hidden />
                  {f}
                </FeatureItem>
              ))}
            </FeatureList>
            <GhostCta type="button" onClick={handlePersonal} aria-label={links.whatsappPersonal.ariaLabel}>
              Agendar avaliação
            </GhostCta>
          </ProgramCard>
        </Grid>
      </Container>
    </Section>
  )
}
