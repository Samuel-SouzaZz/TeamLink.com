import styled from 'styled-components'
import { Instagram, MapPin, Calendar, Clock } from 'lucide-react'

import { Container } from '../components/ui/Container'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { openWhatsApp } from '../services/whatsapp'
import { links } from '../data/site'
import { TiktokIcon } from '../components/icons/TiktokIcon'
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon'

/* ---- Layout ---- */
const ContactRoot = styled.main`
  padding-top: ${({ theme }) => theme.layout.navbarHeight};
  padding-bottom: ${({ theme }) => theme.spacing['2xl']};
  padding-left: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing.md};
`

const Section = styled.section`
  padding-top: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
`

/* Card do WhatsApp em destaque — ocupa linha inteira no mobile e desktop */
const WhatsAppHighlight = styled.div`
  background: linear-gradient(
    135deg,
    rgba(37, 211, 102, 0.12) 0%,
    rgba(37, 211, 102, 0.04) 100%
  );
  border: 1px solid rgba(37, 211, 102, 0.3);
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`

const WhatsAppLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const WhatsAppIconWrap = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: #25d366;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
`

const WhatsAppInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const WhatsAppLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const WhatsAppNumber = styled.span`
  font-size: clamp(1.25rem, 3vw, 1.625rem);
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.01em;
`

/* Grid dos outros cards */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ContactCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const CardIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.brand};
`

const CardTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
`

const CardText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
  flex: 1;
`

const CardTextSmall = styled(CardText)`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted};
  display: flex;
  align-items: center;
  gap: 4px;
`

const CardActions = styled.div`
  margin-top: auto;
  width: 100%;
`

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`

const CtaSection = styled.section`
  padding-top: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  text-align: center;
`

const CtaInner = styled.div`
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
`

const CtaHeading = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.size.xl};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
`

const CtaText = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.size.base};
  color: ${({ theme }) => theme.colors.textMuted};
`

/* ---- Constantes ---- */
const PAGE_TITLE = 'Contato'
const PAGE_SUBTITLE = 'Fale com a Karol Cascelli e agende sua aula experimental.'
const WHATSAPP_MESSAGE = 'Oi! Gostaria de agendar uma aula experimental de Muay Thai.'
const CTA_MESSAGE = 'Oi! Quero agendar uma aula experimental de Muay Thai com a Karol Cascelli.'
const PHONE_DISPLAY = '(32) 98458-3098'
const ADDRESS_TEXT = 'Rua Virgínia Napoleão, Nº 39, Napoleão — 2º andar'
const HOURS_TEXT = 'Terças e quintas às 19h'
const CTA_HEADING = 'Venha treinar'
const CTA_DESCRIPTION = 'Reserve seu lugar na turma e venha sentir a energia do Muay Thai.'

export function Contact() {
  const handleWhatsApp = () => openWhatsApp(links.whatsapp.href, WHATSAPP_MESSAGE)
  const handleCta = () => openWhatsApp(links.whatsapp.href, CTA_MESSAGE)
  const handleInstagram = () => window.open(links.instagram.href, '_blank', 'noopener,noreferrer')
  const handleTiktok = () => window.open(links.tiktok.href, '_blank', 'noopener,noreferrer')

  return (
    <ContactRoot>
      <Container>
        <SectionTitle title={PAGE_TITLE} subtitle={PAGE_SUBTITLE} id="contact-heading" />

        <Section>
          {/* WhatsApp em destaque */}
          <WhatsAppHighlight>
            <WhatsAppLeft>
              <WhatsAppIconWrap aria-hidden>
                <WhatsAppIcon size={28} />
              </WhatsAppIconWrap>
              <WhatsAppInfo>
                <WhatsAppLabel>WhatsApp — Fale diretamente</WhatsAppLabel>
                <WhatsAppNumber>{PHONE_DISPLAY}</WhatsAppNumber>
              </WhatsAppInfo>
            </WhatsAppLeft>
            <Button
              variant="primary"
              size="lg"
              leftIcon={WhatsAppIcon}
              onClick={handleWhatsApp}
              aria-label={links.whatsapp.ariaLabel}
            >
              Agendar aula experimental
            </Button>
          </WhatsAppHighlight>

          {/* Demais cards */}
          <Grid>
            {/* Instagram */}
            <ContactCard>
              <CardHeader>
                <CardIcon aria-hidden>
                  <Instagram size={24} strokeWidth={2} />
                </CardIcon>
                <CardTitle>Instagram</CardTitle>
              </CardHeader>
              <CardText>Acompanhe treinos, rotina e evolução da turma.</CardText>
              <CardActions>
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  leftIcon={Instagram}
                  onClick={handleInstagram}
                  aria-label={links.instagram.ariaLabel}
                >
                  Abrir Instagram
                </Button>
              </CardActions>
            </ContactCard>

            {/* TikTok */}
            <ContactCard>
              <CardHeader>
                <CardIcon aria-hidden>
                  <TiktokIcon size={24} strokeWidth={2} />
                </CardIcon>
                <CardTitle>TikTok</CardTitle>
              </CardHeader>
              <CardText>Vídeos, dicas e o dia a dia da Karol e da turma.</CardText>
              <CardActions>
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  onClick={handleTiktok}
                  aria-label={links.tiktok.ariaLabel}
                >
                  Abrir TikTok
                </Button>
              </CardActions>
            </ContactCard>

            {/* Localização */}
            <ContactCard>
              <CardHeader>
                <CardIcon aria-hidden>
                  <MapPin size={24} strokeWidth={2} />
                </CardIcon>
                <CardTitle>Localização</CardTitle>
              </CardHeader>
              <CardText>{ADDRESS_TEXT}</CardText>
              <CardTextSmall>
                <Clock size={12} strokeWidth={2} aria-hidden />
                {HOURS_TEXT}
              </CardTextSmall>
              <CardActions>
                <Button
                  variant="ghost"
                  size="md"
                  fullWidth
                  disabled
                  aria-label="Como chegar (em breve)"
                  title="Em breve"
                >
                  Como chegar
                </Button>
              </CardActions>
            </ContactCard>
          </Grid>
        </Section>

        <Divider aria-hidden />

        <CtaSection>
          <CtaInner>
            <CtaHeading id="cta">{CTA_HEADING}</CtaHeading>
            <CtaText>{CTA_DESCRIPTION}</CtaText>
            <Button
              variant="primary"
              size="lg"
              leftIcon={Calendar}
              onClick={handleCta}
              aria-label="Agendar aula experimental pelo WhatsApp"
            >
              Agendar aula experimental
            </Button>
          </CtaInner>
        </CtaSection>
      </Container>
    </ContactRoot>
  )
}
