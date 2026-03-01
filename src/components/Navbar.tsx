import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { Menu, X, MessageCircle, Instagram } from 'lucide-react'
import { openWhatsApp } from '../services/whatsapp'
import { navItems, links } from '../data/site'
import { Container } from './ui/Container'
import { Button } from './ui/Button'
import { logoTransparent } from '../assets/Logo'
import { TiktokIcon } from './icons/TiktokIcon'

const DRAWER_ID = 'nav-drawer'

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.navbar};
  background-color: ${({ theme }) => theme.colors.surface};
  background-image: linear-gradient(to bottom, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surface}99%, transparent 100%);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Nav = styled.nav`
  height: ${({ theme }) => theme.layout.navbarHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-decoration: none;
  &:hover { opacity: 0.9; }
`

const LogoImg = styled.img`
  height: 2.25rem;
  width: auto;
  object-fit: contain;
  display: block;
  @media (min-width: 768px) {
    height: 2.5rem;
  }
`

const LogoText = styled.span`
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  font-size: ${({ theme }) => theme.typography.size.lg};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.025em;
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

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color 0.2s;
  &:hover { color: ${({ theme }) => theme.colors.text}; }
`

const DesktopCta = styled.div`
  display: none;
  @media (min-width: 768px) { display: block; }
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

/* Radix Dialog como Sheet/Drawer — overlay e conteúdo */
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
  background-color: ${({ theme }) => theme.colors.surface};
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

const DrawerLogo = styled.img`
  height: 2rem;
  width: auto;
  object-fit: contain;
`

const DrawerTitle = styled.span`
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

const DrawerNavLink = styled(Link)`
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
  const location = useLocation()

  const closeMenu = () => setOpen(false)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const handleAgendar = () => openWhatsApp(links.whatsapp.href)

  return (
    <Header>
      <Container>
        <Nav aria-label="Principal">
          <LogoLink to="/">
            <LogoImg src={logoTransparent} alt="Team Link" />
            <LogoText>Team Link</LogoText>
          </LogoLink>
          <NavList>
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink to={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </NavList>
          <DesktopCta>
            <Button variant="primary" size="md" leftIcon={MessageCircle} onClick={handleAgendar}>
              Agendar aula
            </Button>
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
                  <DrawerLogo src={logoTransparent} alt="" aria-hidden />
                  <DrawerTitle>Menu</DrawerTitle>
                  <Dialog.Close asChild>
                    <DrawerCloseBtn type="button" aria-label="Fechar menu">
                      <X size={20} strokeWidth={2} aria-hidden />
                    </DrawerCloseBtn>
                  </Dialog.Close>
                </DrawerHeader>
                <DrawerNav>
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <DrawerNavLink to={item.href} onClick={closeMenu}>
                        {item.label}
                      </DrawerNavLink>
                    </li>
                  ))}
                </DrawerNav>
                <DrawerFooter>
                  <Button
                    fullWidth
                    variant="primary"
                    size="md"
                    leftIcon={MessageCircle}
                    onClick={() => {
                      handleAgendar()
                      closeMenu()
                    }}
                  >
                    Agendar aula
                  </Button>
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
