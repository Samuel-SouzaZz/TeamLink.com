import { CalendarDays, Ellipsis, House, Tag, Users } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import { PortalShell } from './portal/PortalShell'
import type { BottomNavItem } from './portal/BottomNav'

const NAV_ITEMS: BottomNavItem[] = [
  { to: '/admin', label: 'Início', icon: House, end: true },
  { to: '/admin/agenda', label: 'Agenda', icon: CalendarDays },
  { to: '/admin/alunas', label: 'Alunas', icon: Users },
  { to: '/admin/planos', label: 'Planos', icon: Tag },
  { to: '/admin/mais', label: 'Mais', icon: Ellipsis },
]

export function AdminLayout() {
  return (
    <PortalShell areaName="Painel" navItems={NAV_ITEMS} navLabel="Navegação administrativa">
      <Outlet />
    </PortalShell>
  )
}
