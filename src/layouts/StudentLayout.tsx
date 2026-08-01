import { CalendarPlus, History, House, User } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import { PortalShell } from './portal/PortalShell'
import type { BottomNavItem } from './portal/BottomNav'

const NAV_ITEMS: BottomNavItem[] = [
  { to: '/app', label: 'Início', icon: House, end: true },
  { to: '/app/agendar', label: 'Agendar', icon: CalendarPlus },
  { to: '/app/historico', label: 'Histórico', icon: History },
  { to: '/app/perfil', label: 'Perfil', icon: User },
]

export function StudentLayout() {
  return (
    <PortalShell areaName="Minha área" navItems={NAV_ITEMS} navLabel="Navegação da aluna">
      <Outlet />
    </PortalShell>
  )
}
