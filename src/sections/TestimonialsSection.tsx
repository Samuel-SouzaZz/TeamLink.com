import styled from 'styled-components'
import { Calendar } from 'lucide-react'

import { openWhatsApp } from '../services/whatsapp'
import { Container, Card, Button } from '../components/ui'
import { RatingStars } from '../components/RatingStars'
import testimonialImg from '../assets/gallery/WhatsApp Image 2026-02-28 at 17.38.25 (1).jpeg'
import { testimonials } from '../data/testimonials'
import { links } from '../data/site'

const CTA_MESSAGE = 'Oi! Quero agendar uma aula experimental com a Karol.'

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

const TestimonialCard = styled(Card)`
  flex: 0 0 auto;
  position: relative;
  padding-top: ${({ theme }) => theme.spacing.xl};
`

const QuoteMark = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.md};
  font-size: 3.5rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.brand};
  font-family: Georgia, serif;
  user-select: none;
  pointer-events: none;
  opacity: 0.7;
`

const TestimonialText = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-line;
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

/**
 * Seção Depoimentos — imagem à esquerda, cards à direita; CTA Agendar aula.
 * id="depoimentos" para scroll do botão "Ver Depoimentos".
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
            <TestimonialCard key={t.id}>
              <QuoteMark aria-hidden>"</QuoteMark>
              <TestimonialText>{t.text}</TestimonialText>
              <TestimonialMeta>
                <RatingStars rating={t.rating} size={16} aria-label={`${t.rating} estrelas`} />
                <TestimonialName>{t.name}</TestimonialName>
                {t.since && (
                  <TestimonialSince>Aluna desde {t.since}</TestimonialSince>
                )}
              </TestimonialMeta>
            </TestimonialCard>
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
