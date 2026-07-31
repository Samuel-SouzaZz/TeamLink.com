import styled from 'styled-components'
import { Heart, Target, Shield } from 'lucide-react'
import { Container, SectionTitle, Reveal } from '../components/ui'
import { alpha } from '../styles/color'
import { sectionPadding, surface } from '../styles/mixins'

const Section = styled.section`
  ${sectionPadding}
`

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

const FeatureCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  ${surface}
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.radius.lg};

    &:hover {
      transform: translateY(-6px);
      border-color: ${({ theme }) => alpha(theme.colors.brandLight, 0.45)};
      box-shadow: 0 20px 40px -20px ${({ theme }) => alpha(theme.colors.brand, 0.45)};
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.07) 0%,
        rgba(255, 255, 255, 0.025) 100%
      );
    }
  }

  @media (min-width: 1024px) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`

const IconWrap = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.brand},
    ${({ theme }) => theme.colors.brandLight}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 6px 18px -6px ${({ theme }) => alpha(theme.colors.brand, 0.6)};
  transition: transform 0.3s ease;

  ${FeatureCard}:hover & {
    transform: scale(1.06) rotate(-3deg);
  }

  @media (prefers-reduced-motion: reduce) {
    ${FeatureCard}:hover & { transform: none; }
  }

  @media (min-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: ${({ theme }) => theme.radius.lg};
  }
`

const CardContent = styled.div`
  flex: 1;
  min-width: 0;
`

const CardTitle = styled.h3`
  margin: 0 0 4px;
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: 768px) {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.size.xl};
  }
`

const CardText = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.base};
    line-height: 1.65;
  }
`

const features = [
  {
    icon: Heart,
    title: 'Foco em Mulheres',
    text: 'Ambiente exclusivo e acolhedor, pensado para que você treine com confiança e respeito ao seu ritmo.',
  },
  {
    icon: Target,
    title: 'Treino Personalizado',
    text: 'Personal training com horários flexíveis e acompanhamento individual.',
  },
  {
    icon: Shield,
    title: 'Tradição Team Link',
    text: 'Parte de uma das maiores equipes de artes marciais do Brasil, desde 2014.',
  },
] as const

export function AboutPreviewSection() {
  return (
    <Section aria-labelledby="proposta-title">
      <Container>
        <Reveal>
          <SectionTitle
            title="Por que treinar com a Karol?"
            subtitle="Três pilares que fazem a diferença no seu treino."
            id="proposta-title"
          />
        </Reveal>
        <Grid>
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 120}>
              <FeatureCard>
                <IconWrap aria-hidden>
                  <f.icon size={20} strokeWidth={2} />
                </IconWrap>
                <CardContent>
                  <CardTitle>{f.title}</CardTitle>
                  <CardText>{f.text}</CardText>
                </CardContent>
              </FeatureCard>
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
