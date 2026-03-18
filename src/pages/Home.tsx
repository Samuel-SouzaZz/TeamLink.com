import { WhatsAppIcon } from '../components/icons/WhatsAppIcon'
import styled from 'styled-components'

import { openWhatsApp } from '../services/whatsapp'
import { Button } from '../components/ui'
import {
  HeroSection,
  AboutPreviewSection,
  ContactSection,
  FemaleClassSection,
  TestimonialsSection,
  GallerySection,
} from '../sections'
import { links } from '../data/site'

const CtaSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
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
  font-size: ${({ theme }) => theme.typography.size['2xl']};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
`

const CtaText = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.size.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`

/**
 * Home — Hero → Sobre → Turma Feminina → Depoimentos → Galeria → CTA final.
 */
export function Home() {
  const handleCta = () => openWhatsApp(links.whatsapp.href)

  return (
    <>
      <HeroSection />
      <AboutPreviewSection />
      <ContactSection />
      <FemaleClassSection />
      <TestimonialsSection />
      <GallerySection />

      <CtaSection>
        <CtaInner>
          <CtaHeading>Venha treinar com a gente</CtaHeading>
          <CtaText>Agende uma aula experimental pelo WhatsApp.</CtaText>
          <Button variant="primary" size="lg" leftIcon={WhatsAppIcon} onClick={handleCta}>
            Falar no WhatsApp
          </Button>
        </CtaInner>
      </CtaSection>
    </>
  )
}
