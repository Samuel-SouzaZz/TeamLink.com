import { openWhatsApp } from '../services/whatsapp'
import { links } from '../data/site'
import { GallerySection } from '../sections/GallerySection'
import { HeroSection } from '../sections/HeroSection'
import { AboutPreviewSection } from '../sections/AboutPreviewSection'
import { FemaleClassSection } from '../sections/FemaleClassSection'
import { Button } from '../components/ui/Button'
import { MessageCircle } from 'lucide-react'
import styled from 'styled-components'

const Section = styled.section<{ $alt?: boolean }>`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, $alt }) => ($alt ? theme.colors.surfaceElevated : 'transparent')};
`

const AboutBlock = styled.div`
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const SectionTitleStyled = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.size['2xl']};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
`

const SectionText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`

const CtaBlock = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`

/**
 * Home — Compõe seções. Hero + Sobre (preview) + Turma Feminina + Depoimentos + Galeria + CTA final.
 */
export function Home() {
  const handleCta = () => openWhatsApp(links.whatsapp.href)

  return (
    <>
      <HeroSection />

      {/* Seção Sobre — fundo escuro, título, linha decorativa, subtítulo, botão "Saiba mais" → /sobre */}
      <AboutPreviewSection />

      {/* Seção Turma Feminina — duas colunas (imagem + conteúdo), chips, botão "Conheça a turma" → /contato */}
      <FemaleClassSection />

      <Section>
        <AboutBlock>
          <SectionTitleStyled>Depoimentos</SectionTitleStyled>
          <SectionText>Depoimentos de alunas em breve.</SectionText>
        </AboutBlock>
      </Section>

      <GallerySection />

      <Section $alt>
        <AboutBlock>
          <SectionTitleStyled>Venha treinar com a gente</SectionTitleStyled>
          <SectionText style={{ marginBottom: '1.5rem' }}>
            Agende uma aula experimental pelo WhatsApp.
          </SectionText>
          <CtaBlock>
            <Button variant="primary" size="lg" leftIcon={MessageCircle} onClick={handleCta}>
              Falar no WhatsApp
            </Button>
          </CtaBlock>
        </AboutBlock>
      </Section>
    </>
  )
}
