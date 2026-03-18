import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Instagram } from 'lucide-react'
import { WhatsAppIcon } from './icons/WhatsAppIcon'
import { openWhatsApp } from '../services/whatsapp'
import { links, SLOGAN } from '../data/site'
import { Container } from './ui/Container'
import { logoTransparent } from '../assets/Logo'
import { TiktokIcon } from './icons/TiktokIcon'

const FooterEl = styled.footer`
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xl} 0;
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  @media (min-width: 640px) { flex-direction: row; }
`

const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  @media (min-width: 640px) { align-items: flex-start; }
`

const FooterLogoLink = styled(Link)`
  display: block;
  line-height: 0;
`

const FooterLogo = styled.img`
  height: 2.5rem;
  width: auto;
  object-fit: contain;
  @media (min-width: 768px) {
    height: 2.75rem;
  }
`

const Slogan = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.muted};
`

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const FooterLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 0;
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.size.base};
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition: color 0.2s;
  &:hover { color: ${({ theme }) => theme.colors.text}; }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.brand}; outline-offset: 2px; }
`

const FooterAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color 0.2s;
  &:hover { color: ${({ theme }) => theme.colors.text}; }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.brand}; outline-offset: 2px; }
`

export function Footer() {
  const handleWhatsApp = () => openWhatsApp(links.whatsapp.href)

  return (
    <FooterEl>
      <Container>
        <Inner>
          <FooterBrand>
            <FooterLogoLink to="/" aria-label="Team Link - Início">
              <FooterLogo src={logoTransparent} alt="" aria-hidden />
            </FooterLogoLink>
            <Slogan>{SLOGAN}</Slogan>
          </FooterBrand>
          <Links>
            <FooterLink type="button" onClick={handleWhatsApp} aria-label={links.whatsapp.ariaLabel}>
              <WhatsAppIcon size={18} />
              {links.whatsapp.label}
            </FooterLink>
            <FooterAnchor href={links.instagram.href} target="_blank" rel="noopener noreferrer" aria-label={links.instagram.ariaLabel}>
              <Instagram size={18} strokeWidth={2} aria-hidden />
              {links.instagram.label}
            </FooterAnchor>
            <FooterAnchor href={links.tiktok.href} target="_blank" rel="noopener noreferrer" aria-label={links.tiktok.ariaLabel}>
              <TiktokIcon size={18} strokeWidth={2} />
              {links.tiktok.label}
            </FooterAnchor>
          </Links>
        </Inner>
      </Container>
    </FooterEl>
  )
}
