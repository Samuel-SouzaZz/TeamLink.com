import styled, { keyframes } from 'styled-components'
import { Instagram, MapPin, Clock } from 'lucide-react'

import { openWhatsApp } from '../services/whatsapp'
import { links } from '../data/site'
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon'
import { TiktokIcon } from '../components/icons/TiktokIcon'

/* ─────────────────────── Animações ─────────────────────── */

const pulseGreen = keyframes`
  0%, 100% { box-shadow: 0 0 0 0   rgba(34,197,94,0.45); }
  50%       { box-shadow: 0 0 0 10px rgba(34,197,94,0);   }
`

/* ─────────────────────── Raiz ─────────────────────── */

const Root = styled.section`
  background-color: #050505;
  /* mobile-first: padding menor */
  padding: 52px 20px;

  @media (min-width: 480px) {
    padding: 64px 24px;
  }

  @media (min-width: 768px) {
    padding: 96px 32px;
  }
`

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`

/* ─────────────────────── Header ─────────────────────── */

const Overline = styled.span`
  display: block;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #22c55e;
  margin-bottom: 10px;
`

const Title = styled.h2`
  margin: 0 0 10px;
  font-size: clamp(1.5rem, 6vw, 2.5rem);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.15;
`

const Description = styled.p`
  margin: 0 0 32px;
  font-size: clamp(0.9375rem, 2.5vw, 1rem);
  line-height: 1.65;
  color: #b3b3b3;
  max-width: 560px;

  @media (min-width: 768px) {
    margin-bottom: 48px;
  }
`

/* ─────────────────────── Card WhatsApp ─────────────────────── */

const WaCard = styled.div`
  background: #0e0e0e;
  border: 1px solid rgba(34, 197, 94, 0.28);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow:
    0 0 40px rgba(34, 197, 94, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  @media (min-width: 480px) {
    padding: 24px;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    padding: 32px;
    margin-bottom: 20px;
  }
`

const WaLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (min-width: 480px) {
    gap: 20px;
  }
`

const WaIconRing = styled.div`
  /* menor no mobile para não pesar */
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #22c55e;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  animation: ${pulseGreen} 2.6s ease-in-out infinite;

  @media (min-width: 480px) {
    width: 60px;
    height: 60px;
  }

  @media (min-width: 768px) {
    width: 64px;
    height: 64px;
  }
`

const WaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0; /* evita overflow */
`

const WaLabel = styled.span`
  font-size: 0.8125rem;
  color: #b3b3b3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const WaNumber = styled.strong`
  /* clamp seguro: mínimo 1.1rem garante legibilidade em 320px */
  font-size: clamp(1.1rem, 5.5vw, 1.75rem);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.01em;
  white-space: nowrap;
`

const CtaButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #d91414;
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  /* altura mínima de toque 48px */
  min-height: 48px;
  padding: 0 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
  width: 100%;
  transition:
    transform 0.18s ease,
    filter 0.18s ease;

  @media (min-width: 768px) {
    width: auto;
    flex-shrink: 0;
  }

  &:hover {
    transform: scale(1.035);
    filter: brightness(1.12);
  }

  &:active {
    transform: scale(0.97);
    filter: brightness(0.95);
  }
`

/* ─────────────────────── Grid secundário ─────────────────────── */

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  /* 2 colunas a partir de 480px para melhor uso do espaço */
  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  /* 3 colunas a partir de 800px */
  @media (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
`

const Card = styled.div`
  background: #101010;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  @media (min-width: 480px) {
    padding: 22px;
  }

  @media (min-width: 768px) {
    padding: 28px 24px;
    gap: 12px;
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-4px);
      border-color: rgba(255, 255, 255, 0.16);
    }
  }
`

const CardIconWrap = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }
`

const CardTitle = styled.h3`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #ffffff;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`

const CardText = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: #b3b3b3;
  line-height: 1.6;
  flex: 1;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`

const CardMeta = styled.span`
  font-size: 0.8125rem;
  color: #737373;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  line-height: 1.5;
`

const ClockIcon = styled(Clock)`
  margin-top: 2px;
  flex-shrink: 0;
`

const CardBtn = styled.button`
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  /* altura mínima 44px para área de toque adequada */
  min-height: 44px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;

  @media (hover: hover) {
    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.22);
      transform: scale(1.02);
    }
  }

  &:active {
    transform: scale(0.98);
  }
`

/* ─────────────────────── Constantes ─────────────────────── */

const WHATSAPP_MESSAGE = 'Oi! Gostaria de agendar uma aula experimental de Muay Thai.'
const PHONE_DISPLAY = '(32) 98458-3098'
const ADDRESS_TEXT = 'Rua Virgínia Napoleão, nº 39, Napoleão — 2º andar'
const HOURS_TEXT = 'Terças e quintas às 19h'

/* ─────────────────────── Componente ─────────────────────── */

export function ContactSection() {
  const handleWhatsApp = () => openWhatsApp(links.whatsapp.href, WHATSAPP_MESSAGE)
  const handleInstagram = () =>
    window.open(links.instagram.href, '_blank', 'noopener,noreferrer')
  const handleTiktok = () =>
    window.open(links.tiktok.href, '_blank', 'noopener,noreferrer')

  return (
    <Root id="contato-rapido" aria-labelledby="contact-section-title">
      <Inner>
        <Overline>Contato</Overline>
        <Title id="contact-section-title">Entre em contato</Title>
        <Description>
          Tire suas dúvidas, agende sua aula experimental e acompanhe a rotina da Karol nas redes.
        </Description>

        {/* WhatsApp destaque */}
        <WaCard>
          <WaLeft>
            <WaIconRing aria-hidden>
              <WhatsAppIcon size={28} />
            </WaIconRing>
            <WaInfo>
              <WaLabel>Atendimento rápido pelo WhatsApp</WaLabel>
              <WaNumber>{PHONE_DISPLAY}</WaNumber>
            </WaInfo>
          </WaLeft>

          <CtaButton onClick={handleWhatsApp} aria-label={links.whatsapp.ariaLabel}>
            <WhatsAppIcon size={18} aria-hidden />
            Agendar aula experimental
          </CtaButton>
        </WaCard>

        {/* Instagram · TikTok · Localização */}
        <Grid>
          <Card>
            <CardIconWrap aria-hidden>
              <Instagram size={20} strokeWidth={2} />
            </CardIconWrap>
            <CardTitle>Instagram</CardTitle>
            <CardText>Treinos, evolução e bastidores da turma.</CardText>
            <CardBtn onClick={handleInstagram} aria-label={links.instagram.ariaLabel}>
              <Instagram size={14} strokeWidth={2} aria-hidden />
              Abrir Instagram
            </CardBtn>
          </Card>

          <Card>
            <CardIconWrap aria-hidden>
              <TiktokIcon size={20} />
            </CardIconWrap>
            <CardTitle>TikTok</CardTitle>
            <CardText>Vídeos, dicas e o dia a dia da Karol.</CardText>
            <CardBtn onClick={handleTiktok} aria-label={links.tiktok.ariaLabel}>
              <TiktokIcon size={14} aria-hidden />
              Abrir TikTok
            </CardBtn>
          </Card>

          <Card>
            <CardIconWrap aria-hidden>
              <MapPin size={20} strokeWidth={2} />
            </CardIconWrap>
            <CardTitle>Localização</CardTitle>
            <CardText>{ADDRESS_TEXT}</CardText>
            <CardMeta>
              <ClockIcon size={13} strokeWidth={2} aria-hidden />
              {HOURS_TEXT}
            </CardMeta>
          </Card>
        </Grid>
      </Inner>
    </Root>
  )
}
