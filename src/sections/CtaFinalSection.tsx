import styled from 'styled-components'
import { Instagram } from 'lucide-react'
import { WhatsAppIcon, TiktokIcon } from '../components/icons'
import { Container, Reveal } from '../components/ui'
import { openExternal } from '../lib/browser'
import { alpha } from '../styles/color'
import { focusRing, inlineCtaBase, inlineCtaDesktop } from '../styles/mixins'
import { links } from '../data/site'

const Section = styled.section`
  position: relative;
  padding: 48px 16px;
  background-color: ${({ theme }) => theme.colors.background};
  text-align: center;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 80px ${({ theme }) => theme.spacing.md};
  }

  @media (min-width: 1024px) {
    padding: 96px ${({ theme }) => theme.spacing.md};

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 720px;
      height: 360px;
      border-radius: 50%;
      background: radial-gradient(
        ellipse at center,
        ${({ theme }) => alpha(theme.colors.accent, 0.08)} 0%,
        ${({ theme }) => alpha(theme.colors.brand, 0.05)} 50%,
        rgba(0, 0, 0, 0) 70%
      );
      filter: blur(24px);
      pointer-events: none;
      z-index: 0;
    }
  }

  > * {
    position: relative;
    z-index: 1;
  }
`

const Heading = styled.h2`
  margin: 0 0 8px;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: clamp(1.375rem, 5vw, 2.75rem);
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
  line-height: 1.15;

  @media (min-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (min-width: 1024px) {
    font-size: 3rem;
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
  ${inlineCtaBase}
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentText};
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  cursor: pointer;
  box-shadow: 0 6px 24px ${({ theme }) => alpha(theme.colors.accent, 0.2)};
  transition: transform 0.18s ease, filter 0.18s ease, box-shadow 0.25s ease;

  ${inlineCtaDesktop}

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.08);
    box-shadow: 0 12px 32px ${({ theme }) => alpha(theme.colors.accent, 0.36)};
  }
  ${focusRing('accent')}
`

const GhostBtn = styled.button`
  ${inlineCtaBase}
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.radius.full};
  cursor: pointer;
  transition: transform 0.15s, background-color 0.2s, border-color 0.2s;

  ${inlineCtaDesktop}

  &:hover { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.35); transform: translateY(-2px); }
  ${focusRing('text')}
`

export function CtaFinalSection() {
  const handleWhatsApp = () => openExternal(links.whatsapp.href)
  const handleInstagram = () => openExternal(links.instagram.href)
  const handleTiktok = () => openExternal(links.tiktok.href)

  return (
    <Section aria-labelledby="cta-final-heading">
      <Container>
        <Reveal>
          <Heading id="cta-final-heading">Pronta para seu primeiro round?</Heading>
        </Reveal>
        <Reveal delay={80}>
          <Text>Comece sua jornada hoje. Primeira aula de Muay Thai por nossa conta.</Text>
        </Reveal>
        <Reveal delay={160}>
          <ButtonGroup>
            <AccentBtn
              type="button"
              onClick={handleWhatsApp}
              aria-label="Agendar aula experimental gratuita de Muay Thai pelo WhatsApp"
            >
              <WhatsAppIcon size={18} />
              Agendar aula grátis de Muay Thai
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
        </Reveal>
      </Container>
    </Section>
  )
}
