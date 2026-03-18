import styled from 'styled-components'
import { Award, ShieldCheck, TrendingUp, Target } from 'lucide-react'
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon'
import { Container, SectionTitle, Card, Button } from '../components/ui'
import { openWhatsApp } from '../services/whatsapp'
import { links, SLOGAN } from '../data/site'
import { TestimonialsSection } from '../sections/TestimonialsSection'

/* ---- Dados estáticos ---- */
const PAGE_TITLE = 'Sobre a Karol Cascelli'
const PAGE_SUBTITLE = SLOGAN
const CTA_MESSAGE =
  'Oi! Quero agendar uma aula experimental de Muay Thai com a Karol Cascelli.'
const CTA_TEXT_SHORT = 'Agende uma aula experimental e venha sentir a energia da turma.'

const HISTORIA_TEXT =
  'Karol Cascelli iniciou sua trajetória no Muay Thai em 2015. Com disciplina e consistência, evoluiu dentro do tatame até alcançar a graduação verde e branco. Hoje, assume a liderança da turma feminina de Muay Thai, formando mulheres mais fortes — no físico, na mente e na confiança — dentro e fora da academia.'

const HISTORIA_CHIPS = ['Desde 2015', 'Graduação verde e branco', 'Turma feminina'] as const

const VALORES = [
  {
    title: 'Disciplina',
    description: 'Constância no treino e foco no progresso.',
    icon: Award,
  },
  {
    title: 'Respeito',
    description: 'Ambiente seguro, parceria e evolução com humildade.',
    icon: ShieldCheck,
  },
  {
    title: 'Evolução',
    description: 'Técnica, condicionamento e mentalidade, passo a passo.',
    icon: TrendingUp,
  },
] as const

const PARA_QUEM = [
  { title: 'Iniciantes', description: 'Primeiro contato com o Muay Thai.', icon: Target },
  {
    title: 'Intermediárias',
    description: 'Aprimorar técnica e condicionamento.',
    icon: TrendingUp,
  },
  {
    title: 'Confiança e autodefesa',
    description: 'Mulheres que querem mais segurança e autoconfiança.',
    icon: ShieldCheck,
  },
] as const

/* ---- 1) Hero Intro ---- */
const AboutRoot = styled.main`
  padding-top: ${({ theme }) => theme.layout.navbarHeight};
  padding-bottom: 0;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: radial-gradient(
    ellipse 80% 50% at 50% 0%,
    rgba(185, 28, 28, 0.08) 0%,
    transparent 55%
  );
`

const HeroInner = styled(Container)`
  padding-top: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
`

const HeroCtas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
`

/* ---- 2) História ---- */
const Section = styled.section<{ $alt?: boolean }>`
  padding-top: ${({ theme }) => theme.spacing['2xl']};
  padding-bottom: ${({ theme }) => theme.spacing['2xl']};
  background-color: ${({ theme, $alt }) =>
    $alt ? theme.colors.surfaceElevated : 'transparent'};
`

const SectionInner = styled.div<{ $narrow?: boolean }>`
  max-width: ${({ $narrow }) => ($narrow ? '48rem' : '64rem')};
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing.md};
  text-align: ${({ $narrow }) => ($narrow ? 'center' : 'left')};
`

const Heading = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  font-size: clamp(1.5rem, 3vw, 1.875rem);
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
`

const Text = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
  &:last-child {
    margin-bottom: 0;
  }
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
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

/* ---- 3) Valores (grid + cards com ícones) ---- */
const Grid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  align-items: stretch;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(${({ $cols = 3 }) => $cols ?? 3}, 1fr);
    grid-auto-rows: 1fr;
  }
`

const GridCard = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ValueCard = styled(Card)`
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  }
`

const CardIconWrap = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.brand};
`

const CardTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
`

const CardText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
  word-wrap: break-word;
  overflow-wrap: break-word;
  min-width: 0;
`

/* ---- 4) Para quem é ---- */
const ListItem = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  min-width: 0;
  height: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  transition: border-color 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`

const ListItemIconWrap = styled.div`
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.brand};
`

const ListItemContent = styled.div`
  min-width: 0;
`

const ListItemTitle = styled.span`
  display: block;
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.size.base};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const ListItemDesc = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.5;
`

/* ---- 5) CTA final (opcional, após depoimentos) ---- */
const CtaBlock = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const CtaText = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.size.base};
  color: ${({ theme }) => theme.colors.textMuted};
`

export function About() {
  const handleCta = () => openWhatsApp(links.whatsapp.href, CTA_MESSAGE)
  const scrollToDepoimentos = () => {
    document.getElementById('depoimentos')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AboutRoot>
      {/* 1) Hero Intro */}
      <HeroInner>
        <SectionTitle
          title={PAGE_TITLE}
          subtitle={PAGE_SUBTITLE}
          id="sobre-heading"
        />
        <HeroCtas>
          <Button
            variant="primary"
            size="lg"
            leftIcon={WhatsAppIcon}
            onClick={handleCta}
            aria-label="Agendar aula experimental pelo WhatsApp"
          >
            Agendar aula
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={scrollToDepoimentos}
            aria-label="Rolar até a seção Depoimentos"
          >
            Ver Depoimentos
          </Button>
        </HeroCtas>
      </HeroInner>

      <Container>
        {/* 2) História */}
        <Section aria-labelledby="historia">
          <SectionInner $narrow>
            <Heading id="historia">História</Heading>
            <Text>{HISTORIA_TEXT}</Text>
            <Chips aria-label="Marcos da trajetória">
              {HISTORIA_CHIPS.map((label) => (
                <Chip key={label}>{label}</Chip>
              ))}
            </Chips>
          </SectionInner>
        </Section>

        {/* 3) Valores */}
        <Section $alt aria-labelledby="valores">
          <SectionInner>
            <Heading id="valores">Valores</Heading>
            <Grid $cols={3}>
              {VALORES.map(({ title, description, icon: Icon }) => (
                <GridCard key={title}>
                  <ValueCard>
                    <CardIconWrap>
                      <Icon size={24} strokeWidth={2} aria-hidden />
                    </CardIconWrap>
                    <CardTitle>{title}</CardTitle>
                    <CardText>{description}</CardText>
                  </ValueCard>
                </GridCard>
              ))}
            </Grid>
          </SectionInner>
        </Section>

        {/* 4) Para quem é */}
        <Section aria-labelledby="para-quem">
          <SectionInner>
            <Heading id="para-quem">Para quem é</Heading>
            <Grid $cols={3}>
              {PARA_QUEM.map(({ title, description, icon: Icon }) => (
                <GridCard key={title}>
                  <ListItem>
                    <ListItemIconWrap>
                      <Icon size={20} strokeWidth={2} aria-hidden />
                    </ListItemIconWrap>
                    <ListItemContent>
                      <ListItemTitle>{title}</ListItemTitle>
                      <ListItemDesc>{description}</ListItemDesc>
                    </ListItemContent>
                  </ListItem>
                </GridCard>
              ))}
            </Grid>
          </SectionInner>
        </Section>
      </Container>

      {/* 5) Depoimentos (imagem + cards + CTA) */}
      <TestimonialsSection />

      {/* CTA final */}
      <Section $alt aria-labelledby="cta-final">
        <SectionInner $narrow>
          <Heading id="cta-final">Venha treinar</Heading>
          <CtaText>{CTA_TEXT_SHORT}</CtaText>
          <CtaBlock>
            <Button
              variant="primary"
              size="lg"
              leftIcon={WhatsAppIcon}
              onClick={handleCta}
              aria-label="Agendar aula experimental pelo WhatsApp"
            >
              Agendar aula experimental
            </Button>
          </CtaBlock>
        </SectionInner>
      </Section>
    </AboutRoot>
  )
}
