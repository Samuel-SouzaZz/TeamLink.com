import { useState } from 'react'
import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { Menu, X, Instagram } from 'lucide-react'
import { WhatsAppIcon } from './icons/WhatsAppIcon'
import { navItems, links } from '../data/site'
import { Container } from './ui/Container'
import { TiktokIcon } from './icons/TiktokIcon'

const DRAWER_ID = 'nav-drawer'

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.navbar};
  background-color: rgba(10, 10, 10, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`

const Nav = styled.nav`
  height: ${({ theme }) => theme.layout.navbarHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LogoAnchor = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-decoration: none;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`

const LogoText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  font-size: ${({ theme }) => theme.typography.size.lg};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`

const NavList = styled.ul`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin: 0;
  padding: 0;
  list-style: none;
  @media (min-width: 768px) { display: flex; }
`

const NavAnchor = styled.a`
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  transition: color 0.2s;
  &:hover { color: ${({ theme }) => theme.colors.text}; }
`

const DesktopCta = styled.div`
  display: none;
  @media (min-width: 768px) { display: block; }
`

const NavWhatsAppBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentText};
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  cursor: pointer;
  transition: transform 0.15s, filter 0.15s;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.08);
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`

const HamburgerButton = styled.button`
  display: flex;
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover { background-color: rgba(255,255,255,0.1); }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.brand}; outline-offset: 2px; }
  @media (min-width: 768px) { display: none; }
`

const DialogOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  background: rgba(0, 0, 0, 0.6);
  animation: overlayShow 0.2s ease-out;

  @keyframes overlayShow {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`

const DialogContent = styled(Dialog.Content)`
  position: fixed;
  top: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.drawer};
  height: 100%;
  width: min(320px, 86vw);
  background-color: ${({ theme }) => theme.colors.background};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  outline: none;
  animation: contentSlide 0.3s ease-out;

  @keyframes contentSlide {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  &[data-state="closed"] {
    animation: contentSlideOut 0.25s ease-in forwards;
  }

  @keyframes contentSlideOut {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
`

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const DrawerBrand = styled.span`
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
`

const DrawerCloseBtn = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
  &:hover { color: ${({ theme }) => theme.colors.text}; background-color: rgba(255,255,255,0.1); }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.brand}; outline-offset: 2px; }
`

const DrawerNav = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const DrawerNavAnchor = styled.a`
  display: block;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.md};
  transition: color 0.2s, background-color 0.2s;
  &:hover { color: ${({ theme }) => theme.colors.text}; background-color: rgba(255,255,255,0.05); }
`

const DrawerFooter = styled.div`
  margin-top: auto;
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const DrawerAccentBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 18px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentText};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  transition: filter 0.15s;
  &:hover { filter: brightness(1.08); }
`

const DrawerSocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.md};
  transition: color 0.2s, background-color 0.2s;
  &:hover { color: ${({ theme }) => theme.colors.text}; background-color: rgba(255,255,255,0.05); }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.brand}; outline-offset: 2px; }
`

export function Navbar() {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  const handleAgendar = () => {
    window.open(links.whatsapp.href, '_blank', 'noopener,noreferrer')
  }

  const handleNavClick = (href: string) => {
    closeMenu()
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Header>
      <Container>
        <Nav aria-label="Principal">
          <LogoAnchor
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <LogoText>Karol Cascelli</LogoText>
          </LogoAnchor>

          <NavList>
            {navItems.map((item) => (
              <li key={item.href}>
                <NavAnchor
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                >
                  {item.label}
                </NavAnchor>
              </li>
            ))}
          </NavList>

          <DesktopCta>
            <NavWhatsAppBtn type="button" onClick={handleAgendar} aria-label="WhatsApp">
              <WhatsAppIcon size={16} />
              WhatsApp
            </NavWhatsAppBtn>
          </DesktopCta>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <HamburgerButton
                type="button"
                aria-expanded={open}
                aria-controls={DRAWER_ID}
                aria-label="Abrir menu de navegação"
              >
                <Menu size={24} strokeWidth={2} aria-hidden />
              </HamburgerButton>
            </Dialog.Trigger>
            <Dialog.Portal>
              <DialogOverlay />
              <DialogContent id={DRAWER_ID} aria-label="Menu de navegação">
                <DrawerHeader>
                  <DrawerBrand>Karol Cascelli</DrawerBrand>
                  <Dialog.Close asChild>
                    <DrawerCloseBtn type="button" aria-label="Fechar menu">
                      <X size={20} strokeWidth={2} aria-hidden />
                    </DrawerCloseBtn>
                  </Dialog.Close>
                </DrawerHeader>
                <DrawerNav>
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <DrawerNavAnchor
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavClick(item.href)
                        }}
                      >
                        {item.label}
                      </DrawerNavAnchor>
                    </li>
                  ))}
                </DrawerNav>
                <DrawerFooter>
                  <DrawerAccentBtn
                    type="button"
                    onClick={() => {
                      handleAgendar()
                      closeMenu()
                    }}
                    aria-label="Falar no WhatsApp"
                  >
                    <WhatsAppIcon size={18} />
                    WhatsApp
                  </DrawerAccentBtn>
                  <DrawerSocialLink
                    href={links.instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={links.instagram.ariaLabel}
                    onClick={closeMenu}
                  >
                    <Instagram size={20} strokeWidth={2} aria-hidden />
                    {links.instagram.label}
                  </DrawerSocialLink>
                  <DrawerSocialLink
                    href={links.tiktok.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={links.tiktok.ariaLabel}
                    onClick={closeMenu}
                  >
                    <TiktokIcon size={20} strokeWidth={2} />
                    {links.tiktok.label}
                  </DrawerSocialLink>
                </DrawerFooter>
              </DialogContent>
            </Dialog.Portal>
          </Dialog.Root>
        </Nav>
      </Container>
    </Header>
  )
}
