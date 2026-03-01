import { openWhatsApp } from '../services/whatsapp'
import { links } from '../data/site'
import { GallerySection } from '../sections/GallerySection'
import { HeroSection } from '../sections/HeroSection'
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

const AboutSectionWrap = styled.section`
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
`

const AboutBlockInner = styled.div`
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.xl};

  &:first-of-type {
    padding-top: 0;
  }
`

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: 0;
  max-width: 24rem;
  margin-left: auto;
  margin-right: auto;
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
 * Home — Compõe seções. Hero + Sobre + Galeria (id="galeria") + Depoimentos + CTA final.
 */
export function Home() {
  const handleCta = () => openWhatsApp(links.whatsapp.href)

  return (
    <>
      <HeroSection />

      <AboutSectionWrap>
        <AboutBlockInner>
          <SectionTitleStyled>Sobre</SectionTitleStyled>
          <SectionText>
            Treinos de Muay Thai com foco na turma feminina. Team Link.
          </SectionText>
        </AboutBlockInner>
        <Divider aria-hidden />
        <AboutBlockInner>
          <SectionTitleStyled>Turma Feminina</SectionTitleStyled>
          <SectionText>Espaço dedicado às mulheres no tatame.</SectionText>
        </AboutBlockInner>
      </AboutSectionWrap>

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
