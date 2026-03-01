import styled from 'styled-components'
import { MessageCircle } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { openWhatsApp } from '../services/whatsapp'
import { links, SLOGAN } from '../data/site'

/* ---- Wrappers ---- */
const AboutRoot = styled.main`
  padding-top: ${({ theme }) => theme.layout.navbarHeight};
  padding-bottom: ${({ theme }) => theme.spacing['2xl']};
  padding-left: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing.md};
`

const Section = styled.section<{ $alt?: boolean }>`
  padding-top: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme, $alt }) => ($alt ? theme.colors.surfaceElevated : 'transparent')};
`

const SectionInner = styled.div<{ $narrow?: boolean }>`
  max-width: ${({ $narrow }) => ($narrow ? '48rem' : '64rem')};
  margin-left: auto;
  margin-right: auto;
  text-align: ${({ $narrow }) => ($narrow ? 'center' : 'left')};
`

const Heading = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.size.xl};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
`

const Text = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.size.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
  &:last-child { margin-bottom: 0; }
`

const Grid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(${({ $cols = 3 }) => $cols}, 1fr);
  }
`

const CardTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
`

const CardText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`

const CtaBlock = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const CtaText = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.size.base};
  color: ${({ theme }) => theme.colors.textMuted};
`

const ListItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
`

const ListItemTitle = styled.span`
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.text};
`

const ListItemDesc = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.size.sm};
  &::before { content: ' — '; }
`

/* ---- Conteúdo (trocar aqui para personalizar textos) ---- */
const PAGE_TITLE = 'Sobre a Karol Casceli'
const PAGE_SUBTITLE = SLOGAN

const HISTORIA_TEXT =
  'Karol Casceli iniciou sua trajetória no Muay Thai em 2015. Com disciplina e consistência, evoluiu dentro do tatame até alcançar a graduação verde e branco. Hoje, assume a liderança da turma feminina de Muay Thai, formando mulheres mais fortes — no físico, na mente e na confiança — dentro e fora da academia.'

const VALORES = [
  { title: 'Disciplina', description: 'Constância no treino e foco no progresso.' },
  { title: 'Respeito', description: 'Ambiente seguro, parceria e evolução com humildade.' },
  { title: 'Evolução', description: 'Técnica, condicionamento e mentalidade, passo a passo.' },
] as const

const PARA_QUEM = [
  { title: 'Iniciantes', description: 'Primeiro contato com o Muay Thai.' },
  { title: 'Intermediárias', description: 'Aprimorar técnica e condicionamento.' },
  { title: 'Confiança e autodefesa', description: 'Mulheres que querem mais segurança e autoconfiança.' },
] as const

const CTA_MESSAGE = 'Oi! Quero agendar uma aula experimental de Muay Thai com a Karol Casceli.'
const CTA_TEXT_SHORT = 'Agende uma aula experimental e venha sentir a energia da turma.'

export function About() {
  const handleCta = () => openWhatsApp(links.whatsapp.href, CTA_MESSAGE)

  return (
    <AboutRoot>
      <Container>
        <SectionTitle title={PAGE_TITLE} subtitle={PAGE_SUBTITLE} id="sobre-heading" />

        <Section>
          <SectionInner $narrow>
            <Heading id="historia">História</Heading>
            <Text>{HISTORIA_TEXT}</Text>
          </SectionInner>
        </Section>

        <Section $alt>
          <SectionInner>
            <Heading id="valores">Valores</Heading>
            <Grid $cols={3}>
              {VALORES.map((v) => (
                <Card key={v.title}>
                  <CardTitle>{v.title}</CardTitle>
                  <CardText>{v.description}</CardText>
                </Card>
              ))}
            </Grid>
          </SectionInner>
        </Section>

        <Section>
          <SectionInner>
            <Heading id="para-quem">Para quem é</Heading>
            <Grid $cols={3}>
              {PARA_QUEM.map((item) => (
                <ListItem key={item.title}>
                  <ListItemTitle>{item.title}</ListItemTitle>
                  <ListItemDesc>{item.description}</ListItemDesc>
                </ListItem>
              ))}
            </Grid>
          </SectionInner>
        </Section>

        <Section $alt>
          <SectionInner $narrow>
            <Heading id="cta">Venha treinar</Heading>
            <CtaText>{CTA_TEXT_SHORT}</CtaText>
            <CtaBlock>
              <Button
                variant="primary"
                size="lg"
                leftIcon={MessageCircle}
                onClick={handleCta}
              >
                Agendar aula experimental
              </Button>
            </CtaBlock>
          </SectionInner>
        </Section>
      </Container>
    </AboutRoot>
  )
}
