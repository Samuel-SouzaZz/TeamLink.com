import styled from 'styled-components'
import { Instagram } from 'lucide-react'
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon'
import { TiktokIcon } from '../components/icons/TiktokIcon'
import { Container } from '../components/ui'
import { links } from '../data/site'

const Section = styled.section`
  padding: 48px 16px;
  background-color: ${({ theme }) => theme.colors.background};
  text-align: center;

  @media (min-width: 768px) {
    padding: 80px ${({ theme }) => theme.spacing.md};
  }
`

const Heading = styled.h2`
  margin: 0 0 8px;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: clamp(1.375rem, 5vw, 2.75rem);
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`

const Text = styled.p`
  margin: 0 0 24px;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.typography.size.base};
  }
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: stretch;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const AccentBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentText};
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  cursor: pointer;
  transition: transform 0.15s, filter 0.15s;

  @media (min-width: 768px) {
    padding: 14px 28px;
    font-size: ${({ theme }) => theme.typography.size.base};
    width: auto;
  }

  &:hover { transform: translateY(-2px); filter: brightness(1.08); }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.accent}; outline-offset: 2px; }
`

const GhostBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.radius.full};
  cursor: pointer;
  transition: transform 0.15s, background-color 0.2s, border-color 0.2s;

  @media (min-width: 768px) {
    padding: 14px 28px;
    font-size: ${({ theme }) => theme.typography.size.base};
    width: auto;
  }

  &:hover { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.35); transform: translateY(-2px); }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.text}; outline-offset: 2px; }
`

export function CtaFinalSection() {
  const handleWhatsApp = () => {
    window.open(links.whatsapp.href, '_blank', 'noopener,noreferrer')
  }
  const handleInstagram = () => {
    window.open(links.instagram.href, '_blank', 'noopener,noreferrer')
  }
  const handleTiktok = () => {
    window.open(links.tiktok.href, '_blank', 'noopener,noreferrer')
  }

  return (
    <Section aria-labelledby="cta-final-heading">
      <Container>
        <Heading id="cta-final-heading">Pronta para seu primeiro round?</Heading>
        <Text>Comece sua jornada hoje. Agende uma aula experimental.</Text>
        <ButtonGroup>
          <AccentBtn type="button" onClick={handleWhatsApp} aria-label="Agendar aula experimental pelo WhatsApp">
            <WhatsAppIcon size={18} />
            Agendar aula experimental
          </AccentBtn>
          <GhostBtn type="button" onClick={handleInstagram} aria-label="Seguir no Instagram">
            <Instagram size={18} strokeWidth={2} aria-hidden />
            Seguir no Instagram
          </GhostBtn>
          <GhostBtn type="button" onClick={handleTiktok} aria-label="Seguir no TikTok">
            <TiktokIcon size={18} strokeWidth={2} />
            Seguir no TikTok
          </GhostBtn>
        </ButtonGroup>
      </Container>
    </Section>
  )
}
