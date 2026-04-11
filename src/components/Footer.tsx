import styled from 'styled-components'
import { Instagram } from 'lucide-react'
import { WhatsAppIcon } from './icons/WhatsAppIcon'
import { links, SLOGAN } from '../data/site'
import { Container } from './ui/Container'
import { TiktokIcon } from './icons/TiktokIcon'

const FooterEl = styled.footer`
  background-color: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 0;

  @media (min-width: 640px) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.lg};
    padding: ${({ theme }) => theme.spacing.xl} 0;
  }
`

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  @media (min-width: 640px) {
    align-items: flex-start;
    gap: 4px;
  }
`

const BrandName = styled.span`
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: 640px) {
    font-size: ${({ theme }) => theme.typography.size.base};
  }
`

const Slogan = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: 640px) {
    font-size: ${({ theme }) => theme.typography.size.sm};
  }
`

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.2s;

  @media (min-width: 640px) {
    width: 36px;
    height: 36px;
  }

  &:hover { color: ${({ theme }) => theme.colors.text}; }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.brand}; outline-offset: 2px; border-radius: 4px; }
`

const BottomRow = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 14px 0;
  text-align: center;

  @media (min-width: 640px) {
    padding: ${({ theme }) => theme.spacing.md} 0;
  }
`

const Copyright = styled.p`
  margin: 0;
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: 640px) {
    font-size: ${({ theme }) => theme.typography.size.sm};
  }
`

export function Footer() {
  return (
    <FooterEl>
      <Container>
        <TopRow>
          <Brand>
            <BrandName>Karol Cascelli | Team Link</BrandName>
            <Slogan>{SLOGAN}</Slogan>
          </Brand>
          <SocialIcons>
            <IconLink
              href={links.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={links.whatsapp.ariaLabel}
            >
              <WhatsAppIcon size={18} />
            </IconLink>
            <IconLink
              href={links.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={links.instagram.ariaLabel}
            >
              <Instagram size={18} strokeWidth={2} aria-hidden />
            </IconLink>
            <IconLink
              href={links.tiktok.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={links.tiktok.ariaLabel}
            >
              <TiktokIcon size={18} strokeWidth={2} />
            </IconLink>
          </SocialIcons>
        </TopRow>
        <BottomRow>
          <Copyright>&copy; 2026 Karol Cascelli. Todos os direitos reservados.</Copyright>
        </BottomRow>
      </Container>
    </FooterEl>
  )
}
