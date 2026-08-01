import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export interface BottomNavItem {
  to: string
  label: string
  icon: LucideIcon
  /** Marca ativo só na correspondência exata — usado na raiz de cada área. */
  end?: boolean
}

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.bottomNav};
  display: flex;
  justify-content: center;
  gap: 2px;
  height: calc(${({ theme }) => theme.layout.bottomNavHeight} + env(safe-area-inset-bottom, 0px));
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background-color: rgba(10, 10, 10, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`

const Item = styled(NavLink)`
  flex: 1 1 0;
  max-width: 96px;
  min-height: ${({ theme }) => theme.layout.touchTarget};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 6px 4px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  font-size: 0.6875rem;
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  transition: color 0.2s;

  &.active {
    color: ${({ theme }) => theme.colors.accent};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: -2px;
    border-radius: ${({ theme }) => theme.radius.md};
  }
`

export function BottomNav({ items, label }: { items: BottomNavItem[]; label: string }) {
  return (
    <Nav aria-label={label}>
      {items.map(({ to, label: itemLabel, icon: Icon, end }) => (
        <Item key={to} to={to} end={end}>
          {({ isActive }) => (
            <>
              <Icon size={20} aria-hidden strokeWidth={isActive ? 2.4 : 1.8} />
              <span>{itemLabel}</span>
            </>
          )}
        </Item>
      ))}
    </Nav>
  )
}
