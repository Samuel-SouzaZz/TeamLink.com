import styled from 'styled-components'
import { MessageCircle } from 'lucide-react'

import { openWhatsApp } from '../services/whatsapp'
import { Button } from '../components/ui/Button'
import { heroMain } from '../assets/hero'
import { logoTransparent } from '../assets/Logo'
import { links, SLOGAN } from '../data/site'

const HeroWrap = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: calc(${({ theme }) => theme.layout.navbarHeight} + ${({ theme }) => theme.spacing.lg});
  padding-left: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};

  @media (min-width: 768px) {
    min-height: 70vh;
    text-align: left;
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
    padding-top: calc(${({ theme }) => theme.layout.navbarHeight} + ${({ theme }) => theme.spacing.xl});
  }
`

const HeroBg = styled.img`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
`

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 56rem;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 768px) {
    margin-left: 0;
    margin-right: auto;
  }
`

const HeroLogo = styled.img`
  height: 3rem;
  width: auto;
  object-fit: contain;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: block;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    height: 4rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    margin-left: 0;
  }
`

const HeroTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size['5xl']};
  }
`

const HeroSubtitle = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  font-size: clamp(1rem, 3.5vw, 1.25rem);
  color: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.xl};
  }
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`

const Chip = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.text};
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
`

const CtaGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  align-items: center;

  & > button {
    width: 100%;
    max-width: 320px;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    width: auto;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
    & > button {
      width: auto;
      max-width: none;
    }
  }
`

const CHIPS = ['Turma Feminina', 'Desde 2015', 'Team Link'] as const

export function HeroSection() {
  const handleCta = () => openWhatsApp(links.whatsapp.href)
  const handleVerGaleria = () => {
    document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <HeroWrap>
      <HeroBg
        src={heroMain}
        alt=""
        aria-hidden
        fetchPriority="high"
        loading="eager"
        decoding="async"
        width={1920}
        height={1080}
      />
      <HeroOverlay aria-hidden />
      <HeroContent>
        <HeroLogo
          src={logoTransparent}
          alt="Team Link"
          width={160}
          height={64}
          loading="eager"
          decoding="async"
        />
        <HeroTitle>Karol Cascelli</HeroTitle>
        <HeroSubtitle>{SLOGAN}</HeroSubtitle>
        <Chips>
          {CHIPS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </Chips>
        <CtaGroup>
          <Button
            variant="primary"
            size="lg"
            leftIcon={MessageCircle}
            onClick={handleCta}
            aria-label="Agendar aula experimental pelo WhatsApp"
          >
            Agendar aula experimental
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={handleVerGaleria}
            aria-label="Rolar até a seção Galeria"
          >
            Ver galeria
          </Button>
        </CtaGroup>
      </HeroContent>
    </HeroWrap>
  )
}
