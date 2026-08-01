import { useMemo, useState } from 'react'
import styled from 'styled-components'

import {
  Card,
  CardLabel,
  EmptyState,
  PageHeading,
  PortalPage,
} from '../../../components/portal'
import { appointmentsByStudent, demoCurrentStudent } from '../../../lib/demo-data'
import type { AppointmentStatus } from '../../../types/domain'
import { AppointmentList, AppointmentRow } from '../components/AppointmentRow'

const PAGE_SIZE = 8

const Filters = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const FilterButton = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  min-height: 36px;
  padding: 6px 14px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  border-radius: ${({ theme }) => theme.radius.full};
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;

  color: ${({ theme, $active }) => ($active ? theme.colors.accentText : theme.colors.textMuted)};
  background: ${({ theme, $active }) => ($active ? theme.colors.accent : 'transparent')};
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.accent : 'rgba(255, 255, 255, 0.16)')};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`

const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: center;
`

const StatValue = styled.span`
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.xl};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.accent};
`

const StatLabel = styled.span`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const MoreButton = styled.button`
  min-height: ${({ theme }) => theme.layout.touchTarget};
  width: 100%;
  margin-top: 8px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: ${({ theme }) => theme.radius.lg};
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`

type Filter = 'all' | Extract<AppointmentStatus, 'completed' | 'cancelled' | 'no_show'>

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'completed', label: 'Realizadas' },
  { value: 'cancelled', label: 'Canceladas' },
  { value: 'no_show', label: 'Faltas' },
]

export default function StudentHistoryPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const all = useMemo(
    () =>
      appointmentsByStudent(demoCurrentStudent.id).sort((a, b) =>
        b.startsAt.localeCompare(a.startsAt),
      ),
    [],
  )

  const filtered = filter === 'all' ? all : all.filter((a) => a.status === filter)
  const page = filtered.slice(0, visible)

  const stats = {
    total: all.filter((a) => a.status === 'completed').length,
    cancelled: all.filter((a) => a.status === 'cancelled').length,
    noShow: all.filter((a) => a.status === 'no_show').length,
  }

  return (
    <PortalPage>
      <PageHeading title="Histórico" subtitle="Todas as suas aulas, do mais recente ao antigo." />

      <Card>
        <Summary>
          <Stat>
            <StatValue>{stats.total}</StatValue>
            <StatLabel>Realizadas</StatLabel>
          </Stat>
          <Stat>
            <StatValue>{stats.cancelled}</StatValue>
            <StatLabel>Canceladas</StatLabel>
          </Stat>
          <Stat>
            <StatValue>{stats.noShow}</StatValue>
            <StatLabel>Faltas</StatLabel>
          </Stat>
        </Summary>
      </Card>

      <Filters role="group" aria-label="Filtrar histórico">
        {FILTERS.map(({ value, label }) => (
          <FilterButton
            key={value}
            type="button"
            $active={filter === value}
            aria-pressed={filter === value}
            onClick={() => {
              setFilter(value)
              setVisible(PAGE_SIZE)
            }}
          >
            {label}
          </FilterButton>
        ))}
      </Filters>

      <Card>
        <CardLabel>{filtered.length} aula(s)</CardLabel>
        {page.length > 0 ? (
          <>
            <AppointmentList>
              {page.map((appointment) => (
                <AppointmentRow
                  key={appointment.id}
                  appointment={appointment}
                  title="Turma Feminina"
                />
              ))}
            </AppointmentList>
            {visible < filtered.length && (
              <MoreButton type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                Carregar mais
              </MoreButton>
            )}
          </>
        ) : (
          <EmptyState title="Nenhuma aula neste filtro" />
        )}
      </Card>
    </PortalPage>
  )
}
