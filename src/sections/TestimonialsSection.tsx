import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import styled, { keyframes } from 'styled-components'
import { Calendar, X, Quote } from 'lucide-react'

import { openWhatsApp } from '../services/whatsapp'
import { Container, Card, Button } from '../components/ui'
import { RatingStars } from '../components/RatingStars'
import testimonialImg from '../assets/gallery/WhatsApp Image 2026-02-28 at 17.38.25 (1).jpeg'
import { testimonials } from '../data/testimonials'
import { links } from '../data/site'
import type { Testimonial } from '../types'

const TRUNCATE_LIMIT = 160
const CTA_MESSAGE = 'Oi! Quero agendar uma aula experimental com a Karol.'

/* ── Animações ──────────────────────────────────────────────────────── */
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`
const slideUp = keyframes`from { opacity: 0; transform: translate(-50%, -46%) scale(0.97); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); }`

/* ── Seção ──────────────────────────────────────────────────────────── */
const SectionRoot = styled.section`
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surfaceElevated};

  @media (min-width: 640px) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  }
`

const SectionInner = styled(Container)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing['2xl']};
  }
`

const HeadingWrap = styled.div`
  grid-column: 1 / -1;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const Heading = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
`

const DecorativeLine = styled.div`
  width: 4rem;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.brand};
  border-radius: ${({ theme }) => theme.radius.full};
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);

  @media (min-width: 1024px) {
    aspect-ratio: 3 / 4;
    max-height: 420px;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`

const CardsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  min-width: 0;
`

/* ── Card ───────────────────────────────────────────────────────────── */
const TestimonialCard = styled(Card)`
  flex: 0 0 auto;
  position: relative;
  padding-top: calc(${({ theme }) => theme.spacing.xl} + 0.5rem);
  margin-top: 1rem;
`

const QuoteBadge = styled.div`
  position: absolute;
  top: -1rem;
  left: ${({ theme }) => theme.spacing.md};
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.brand};
  box-shadow: 0 4px 12px rgba(185, 28, 28, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`

const TestimonialText = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
  word-wrap: break-word;
  overflow-wrap: break-word;
`

const ReadMoreBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.brand};
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity 0.2s;

  &:hover { opacity: 0.75; }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand};
    outline-offset: 2px;
    border-radius: 2px;
  }
`

const TestimonialMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const TestimonialName = styled.span`
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.size.base};
`

const TestimonialSince = styled.span`
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const CtaWrap = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
`

/* ── Modal (Radix Dialog) ───────────────────────────────────────────── */
const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.2s ease-out;
`

const ModalContent = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: ${({ theme }) => theme.zIndex.drawer};
  transform: translate(-50%, -50%);
  width: min(540px, 92vw);
  max-height: 85dvh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.55);
  padding: ${({ theme }) => theme.spacing.xl};
  outline: none;
  animation: ${slideUp} 0.25s ease-out;

  @media (min-width: 640px) {
    padding: ${({ theme }) => theme.spacing['2xl']};
  }
`

const ModalQuoteBadge = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.brand};
  box-shadow: 0 4px 16px rgba(185, 28, 28, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-shrink: 0;
`

const ModalText = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.size.base};
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
`

const ModalMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const ModalName = styled.span`
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.size.base};
`

const ModalSince = styled.span`
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: rgba(255, 255, 255, 0.08);
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand};
    outline-offset: 2px;
  }
`

/* ── Subcomponente do card individual ───────────────────────────────── */
function TestimonialItem({ t }: { t: Testimonial }) {
  const [open, setOpen] = useState(false)
  const isTruncated = t.text.length > TRUNCATE_LIMIT
  const preview = isTruncated ? t.text.slice(0, TRUNCATE_LIMIT).trimEnd() + '…' : t.text

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <TestimonialCard>
        <QuoteBadge aria-hidden>
          <Quote size={14} strokeWidth={2.5} />
        </QuoteBadge>

        <TestimonialText>{preview}</TestimonialText>

        {isTruncated && (
          <Dialog.Trigger asChild>
            <ReadMoreBtn type="button" aria-label={`Ler depoimento completo de ${t.name}`}>
              Ler mais
            </ReadMoreBtn>
          </Dialog.Trigger>
        )}

        <TestimonialMeta>
          <RatingStars rating={t.rating} size={16} aria-label={`${t.rating} estrelas`} />
          <TestimonialName>{t.name}</TestimonialName>
          {t.since && <TestimonialSince>Aluna desde {t.since}</TestimonialSince>}
        </TestimonialMeta>
      </TestimonialCard>

      <Dialog.Portal>
        <Overlay />
        <ModalContent aria-label={`Depoimento de ${t.name}`}>
          <Dialog.Close asChild>
            <CloseButton type="button" aria-label="Fechar depoimento">
              <X size={18} strokeWidth={2} aria-hidden />
            </CloseButton>
          </Dialog.Close>

          <ModalQuoteBadge aria-hidden>
            <Quote size={18} strokeWidth={2.5} />
          </ModalQuoteBadge>
          <ModalText>{t.text}</ModalText>

          <ModalMeta>
            <RatingStars rating={t.rating} size={18} aria-label={`${t.rating} estrelas`} />
            <ModalName>{t.name}</ModalName>
            {t.since && <ModalSince>Aluna desde {t.since}</ModalSince>}
          </ModalMeta>
        </ModalContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/* ── Seção principal ────────────────────────────────────────────────── */
/**
 * Seção Depoimentos — imagem à esquerda, cards à direita; CTA Agendar aula.
 * Textos longos são truncados com botão "Ler mais" que abre modal Radix Dialog.
 */
export function TestimonialsSection() {
  const handleCta = () => openWhatsApp(links.whatsapp.href, CTA_MESSAGE)

  return (
    <SectionRoot id="depoimentos" aria-labelledby="depoimentos-heading">
      <SectionInner>
        <HeadingWrap>
          <Heading id="depoimentos-heading">Depoimentos</Heading>
          <DecorativeLine aria-hidden />
        </HeadingWrap>

        <ImageWrapper>
          <Image
            src={testimonialImg}
            alt="Turma feminina de Muay Thai em treino — espaço de evolução e respeito."
            loading="lazy"
            width={800}
            height={600}
          />
        </ImageWrapper>

        <CardsColumn>
          {testimonials.map((t) => (
            <TestimonialItem key={t.id} t={t} />
          ))}
        </CardsColumn>

        <CtaWrap>
          <Button
            variant="primary"
            size="lg"
            leftIcon={Calendar}
            onClick={handleCta}
            aria-label="Agendar aula experimental pelo WhatsApp"
          >
            Agendar aula experimental
          </Button>
        </CtaWrap>
      </SectionInner>
    </SectionRoot>
  )
}
