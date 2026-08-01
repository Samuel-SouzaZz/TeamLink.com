import type { ReactNode } from 'react'
import { LogOut } from 'lucide-react'
import styled from 'styled-components'

import { Logo } from '../../components/portal/Logo'
import { useAuth } from '../../features/auth/AuthContext'
import { DEMO_MODE } from '../../features/auth/demoMode'
import { focusRing } from '../../styles/mixins'
import { BottomNav, type BottomNavItem } from './BottomNav'

const Root = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
`

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.navbar};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: ${({ theme }) => theme.layout.portalHeaderHeight};
  padding: 0 16px;
  background-color: rgba(10, 10, 10, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const AreaName = styled.span`
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
`

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`

const SignOutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.layout.touchTarget};
  height: ${({ theme }) => theme.layout.touchTarget};
  margin-right: -10px;
  color: ${({ theme }) => theme.colors.textMuted};
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: rgba(255, 255, 255, 0.08);
  }

  ${focusRing('accent')}
`

const Main = styled.main`
  flex: 1;
  padding-bottom: calc(
    ${({ theme }) => theme.layout.bottomNavHeight} + env(safe-area-inset-bottom, 0px) + 16px
  );
`

const DemoBanner = styled.p`
  margin: 0;
  padding: 6px 16px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.accentText};
  background-color: ${({ theme }) => theme.colors.warning};
`

export function PortalShell({
  areaName,
  navItems,
  navLabel,
  children,
}: {
  areaName: string
  navItems: BottomNavItem[]
  navLabel: string
  children: ReactNode
}) {
  const { signOut } = useAuth()

  return (
    <Root>
      {DEMO_MODE && <DemoBanner>Modo demonstração — dados simulados</DemoBanner>}

      <Header>
        <Brand>
          <Logo variant="compact" />
          <AreaName>{areaName}</AreaName>
        </Brand>
        <SignOutButton type="button" onClick={signOut} aria-label="Sair da conta">
          <LogOut size={20} aria-hidden />
        </SignOutButton>
      </Header>

      <Main>{children}</Main>

      <BottomNav items={navItems} label={navLabel} />
    </Root>
  )
}
