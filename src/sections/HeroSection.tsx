import styled, { keyframes } from 'styled-components'
import { WhatsAppIcon } from '../components/icons'

import { openExternal, scrollToId } from '../lib/browser'
import { alpha } from '../styles/color'
import { focusRing, inlineCtaBase, inlineCtaDesktop } from '../styles/mixins'
import { links, SLOGAN } from '../data/site'
import { kpis, heroChips } from '../data/metrics'

const HERO_FALLBACK = '/hero.webp'

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`

const HeroWrap = styled.section`
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 20px 32px;
  text-align: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
  contain: layout paint;

  @media (min-width: 768px) {
    justify-content: center;
    min-height: 100vh;
    text-align: left;
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
    padding-top: calc(${({ theme }) => theme.layout.navbarHeight} + ${({ theme }) => theme.spacing['2xl']});
  }
`

const HeroPicture = styled.picture`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: block;
`

const HeroBg = styled.img`
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
    to top,
    rgba(10, 10, 10, 0.92) 0%,
    rgba(10, 10, 10, 0.5) 40%,
    rgba(10, 10, 10, 0.25) 100%
  );

  @media (min-width: 768px) {
    background:
      radial-gradient(
        circle at 75% 65%,
        ${({ theme }) => alpha(theme.colors.accent, 0.1)} 0%,
        ${({ theme }) => alpha(theme.colors.accent, 0)} 45%
      ),
      linear-gradient(
        135deg,
        rgba(10, 10, 10, 0.78) 0%,
        rgba(10, 10, 10, 0.42) 100%
      );
  }
`

const HeroGlow = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    position: absolute;
    z-index: 1;
    bottom: -160px;
    left: -120px;
    width: 520px;
    height: 520px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      ${({ theme }) => alpha(theme.colors.brand, 0.35)} 0%,
      ${({ theme }) => alpha(theme.colors.brand, 0)} 65%
    );
    filter: blur(40px);
    pointer-events: none;
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 48rem;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeInUp} 0.8s ease-out both;

  @media (min-width: 768px) {
    margin-left: 0;
    margin-right: auto;
  }

  @media (min-width: 1024px) {
    max-width: 56rem;
  }
`

const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 9vw, 4.5rem);
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.05;
  letter-spacing: -0.02em;
`

const HeroSub = styled.span`
  display: block;
  margin-top: 6px;
  margin-bottom: 8px;
  font-size: clamp(0.9375rem, 3vw, 1.5rem);
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.accent};
  font-style: italic;

  @media (min-width: 768px) {
    margin-top: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`

const HeroSlogan = styled.p`
  margin: 0 0 16px;
  font-size: clamp(0.8125rem, 2.5vw, 1.125rem);
  color: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
  justify-content: center;

  @media (min-width: 768px) {
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    justify-content: flex-start;
  }
`

const Chip = styled.span`
  display: inline-block;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.text};
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: ${({ theme }) => theme.radius.full};

  @media (min-width: 768px) {
    padding: 6px 16px;
    font-size: ${({ theme }) => theme.typography.size.sm};
  }
`

const KpiRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  justify-content: center;

  @media (min-width: 768px) {
    gap: 3rem;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    justify-content: flex-start;
  }
`

const KpiItem = styled.div`
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`

const KpiValue = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: clamp(1.25rem, 5vw, 2.25rem);
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1.1;
  letter-spacing: -0.01em;

  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }
`

const KpiLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.sm};
  }
`

const CtaGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  align-items: stretch;

  @media (min-width: 768px) {
    flex-direction: row;
    width: auto;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const AccentBtn = styled.button`
  ${inlineCtaBase}
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentText};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  box-shadow: 0 6px 24px ${({ theme }) => alpha(theme.colors.accent, 0.18)};
  transition: transform 0.18s ease, filter 0.18s ease, box-shadow 0.25s ease;

  ${inlineCtaDesktop}

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.08);
    box-shadow: 0 10px 32px ${({ theme }) => alpha(theme.colors.accent, 0.32)};
  }
  &:active { transform: translateY(0); box-shadow: 0 4px 16px ${({ theme }) => alpha(theme.colors.accent, 0.18)}; }
  ${focusRing('accent')}
`

const DarkBtn = styled.button`
  ${inlineCtaBase}
  background-color: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  transition: transform 0.15s, background-color 0.2s, border-color 0.2s;

  ${inlineCtaDesktop}

  &:hover { background-color: rgba(255, 255, 255, 0.14); border-color: rgba(255, 255, 255, 0.3); transform: translateY(-2px); }
  &:active { transform: translateY(0); }
  ${focusRing('text')}
`

export function HeroSection() {
  const handleCta = () => openExternal(links.whatsapp.href)
  const handleVerAgenda = () => scrollToId('agenda')

  return (
    <HeroWrap id="hero">
      <HeroPicture>
        <source
          type="image/avif"
          srcSet="/hero/hero-768.avif 768w, /hero/hero-1280.avif 1280w"
          sizes="(min-width: 1280px) 1280px, 100vw"
        />
        <source
          type="image/webp"
          srcSet="/hero/hero-768.webp 768w, /hero/hero-1280.webp 1280w"
          sizes="(min-width: 1280px) 1280px, 100vw"
        />
        <HeroBg
          src={HERO_FALLBACK}
          alt=""
          aria-hidden
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1536}
          height={1024}
        />
      </HeroPicture>
      <HeroOverlay aria-hidden />
      <HeroGlow aria-hidden />
      <HeroContent>
        <HeroTitle>Karol Cascelli</HeroTitle>
        <HeroSub>Muay Thai &amp; Personal</HeroSub>
        <HeroSlogan>{SLOGAN}</HeroSlogan>
        <Chips>
          {heroChips.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </Chips>
        <KpiRow>
          {kpis.map((k) => (
            <KpiItem key={k.label}>
              <KpiValue>{k.value}</KpiValue>
              <KpiLabel>{k.label}</KpiLabel>
            </KpiItem>
          ))}
        </KpiRow>
        <CtaGroup>
          <AccentBtn type="button" onClick={handleCta} aria-label="Falar no WhatsApp">
            <WhatsAppIcon size={18} />
            Falar no WhatsApp
          </AccentBtn>
          <DarkBtn type="button" onClick={handleVerAgenda} aria-label="Ver agenda de aulas">
            Ver agenda
          </DarkBtn>
        </CtaGroup>
      </HeroContent>
    </HeroWrap>
  )
}
