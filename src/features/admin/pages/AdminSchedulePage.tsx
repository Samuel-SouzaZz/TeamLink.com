import { Fragment, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import styled from 'styled-components'

import {
  Button,
  Card,
  CardLabel,
  EmptyState,
  PageHeading,
  PortalPage,
  StatusPill,
} from '../../../components/portal'
import {
  formatLongDate,
  formatTime,
  formatWeekday,
  toZonedDayKey,
} from '../../../lib/datetime'
import { demoAppointments, demoNow, demoSlots, findStudent } from '../../../lib/demo-data'

/** Mantém a turma de ontem visível para a Karol lançar as presenças. */
const yesterday = new Date(demoNow.getTime() - 24 * 60 * 60 * 1000)

const DayGroup = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const DayHeading = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: capitalize;
`

const SlotHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
`

const SlotTime = styled.span`
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
`

const Occupancy = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const Row = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  &:last-child {
    border-bottom: none;
  }
`

const StudentLink = styled(Link)`
  flex: 1;
  min-width: 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`

const SmallButton = styled(Button)`
  flex: 1;
  min-height: 40px;
  padding: 8px 12px;
  font-size: 0.8125rem;
`

export default function AdminSchedulePage() {
  const grouped = useMemo(() => {
    const upcoming = demoSlots
      .filter((slot) => !slot.cancelledAt && new Date(slot.startsAt) >= yesterday)
      .sort((a, b) => a.startsAt.localeCompare(b.startsAt))

    const byDay = new Map<string, typeof upcoming>()
    for (const slot of upcoming) {
      const key = toZonedDayKey(slot.startsAt)
      const bucket = byDay.get(key)
      if (bucket) bucket.push(slot)
      else byDay.set(key, [slot])
    }
    return [...byDay.entries()]
  }, [])

  return (
    <PortalPage>
      <PageHeading title="Agenda" subtitle="Turmas abertas e quem está inscrita." />

      {grouped.length === 0 ? (
        <EmptyState
          title="Nenhuma turma aberta"
          description="Publique horários para que as alunas possam reservar."
        />
      ) : (
        grouped.map(([dayKey, slots]) => (
          <DayGroup key={dayKey}>
            <DayHeading>
              {formatWeekday(slots[0].startsAt)} · {formatLongDate(slots[0].startsAt)}
            </DayHeading>

            {slots.map((slot) => {
              const attendees = demoAppointments.filter(
                (appointment) =>
                  appointment.slotId === slot.id && appointment.status !== 'cancelled',
              )

              return (
                <Card key={slot.id}>
                  <SlotHead>
                    <SlotTime>{formatTime(slot.startsAt)}</SlotTime>
                    <Occupancy>
                      <Users size={13} aria-hidden />
                      {slot.bookedCount}/{slot.capacity}
                      {slot.bookedCount >= slot.capacity && (
                        <StatusPill tone="warning">Cheia</StatusPill>
                      )}
                    </Occupancy>
                  </SlotHead>

                  {attendees.length > 0 ? (
                    <List>
                      {attendees.map((appointment) => {
                        const student = findStudent(appointment.studentId)
                        return (
                          <Fragment key={appointment.id}>
                            <Row>
                              <StudentLink to={`/admin/alunas/${appointment.studentId}`}>
                                {student?.fullName ?? 'Aluna'}
                              </StudentLink>
                              <StatusPill
                                tone={appointment.status === 'confirmed' ? 'success' : 'neutral'}
                              >
                                {appointment.status === 'confirmed' ? 'Confirmada' : 'Agendada'}
                              </StatusPill>
                            </Row>
                          </Fragment>
                        )
                      })}
                    </List>
                  ) : (
                    <CardLabel>Nenhuma inscrita ainda</CardLabel>
                  )}

                  <Actions>
                    <SmallButton type="button" $variant="ghost">
                      Confirmar presenças
                    </SmallButton>
                    <SmallButton type="button" $variant="ghost">
                      Adicionar aluna
                    </SmallButton>
                  </Actions>
                </Card>
              )
            })}
          </DayGroup>
        ))
      )}
    </PortalPage>
  )
}
