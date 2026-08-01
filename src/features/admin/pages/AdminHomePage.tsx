import { CalendarPlus, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
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
import { formatAppointmentLabel, formatTime } from '../../../lib/datetime'
import { isSameZonedDay } from '../../../lib/datetime'
import {
  demoAppointments,
  demoNow,
  demoStudents,
  demoSubscriptions,
  demoWaitlist,
  findStudent,
  isUpcoming,
} from '../../../lib/demo-data'

const Metrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`

const Metric = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const MetricValue = styled.span`
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size['2xl']};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1.1;
`

const MetricLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
`

const CardLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.accent};

  &:hover {
    text-decoration: underline;
  }
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
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  &:last-child {
    border-bottom: none;
  }
`

const Time = styled.span`
  min-width: 44px;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
`

const Name = styled.span`
  flex: 1;
  min-width: 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const NextLine = styled.p`
  margin: 6px 0 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.accent};
  text-transform: capitalize;
`

const Muted = styled.p`
  margin: 6px 0 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

export default function AdminHomePage() {
  const today = demoNow.toISOString()

  const todayAppointments = demoAppointments
    .filter(
      (appointment) =>
        appointment.status !== 'cancelled' && isSameZonedDay(appointment.startsAt, today),
    )
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))

  const nextAppointment = demoAppointments
    .filter(isUpcoming)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))[0]

  const activeStudents = demoStudents.filter((student) => student.status === 'active').length
  const pendingSubscriptions = demoSubscriptions.filter(
    (subscription) => subscription.status === 'pending' || subscription.status === 'past_due',
  ).length

  return (
    <PortalPage>
      <PageHeading title="Início" subtitle="Resumo do dia." />

      <Metrics>
        <Metric>
          <MetricValue>{activeStudents}</MetricValue>
          <MetricLabel>Alunas ativas</MetricLabel>
        </Metric>
        <Metric>
          <MetricValue>{pendingSubscriptions}</MetricValue>
          <MetricLabel>Assinaturas pendentes</MetricLabel>
        </Metric>
      </Metrics>

      <Card>
        <CardLabel>Próxima aula</CardLabel>
        {nextAppointment ? (
          <NextLine>{formatAppointmentLabel(nextAppointment.startsAt)}</NextLine>
        ) : (
          <Muted>Nenhuma aula marcada.</Muted>
        )}
      </Card>

      <Card>
        <Head>
          <CardLabel>Aulas de hoje</CardLabel>
          <CardLink to="/admin/agenda">
            Agenda <ChevronRight size={14} aria-hidden />
          </CardLink>
        </Head>
        {todayAppointments.length > 0 ? (
          <List>
            {todayAppointments.map((appointment) => {
              const student = findStudent(appointment.studentId)
              return (
                <Row key={appointment.id}>
                  <Time>{formatTime(appointment.startsAt)}</Time>
                  <Name>{student?.fullName ?? 'Aluna'}</Name>
                  <StatusPill tone={appointment.status === 'confirmed' ? 'success' : 'neutral'}>
                    {appointment.status === 'confirmed' ? 'Confirmada' : 'Agendada'}
                  </StatusPill>
                </Row>
              )
            })}
          </List>
        ) : (
          <EmptyState title="Nenhuma aula hoje" description="Aproveite para descansar." />
        )}
      </Card>

      <Card>
        <Head>
          <CardLabel>Lista de espera</CardLabel>
        </Head>
        {demoWaitlist.length > 0 ? (
          <List>
            {demoWaitlist.map((entry) => {
              const student = findStudent(entry.studentId)
              return (
                <Row key={entry.id}>
                  <Name>{student?.fullName ?? 'Aluna'}</Name>
                  <StatusPill tone="warning">Aguardando vaga</StatusPill>
                </Row>
              )
            })}
          </List>
        ) : (
          <EmptyState title="Ninguém na espera" />
        )}
      </Card>

      <Button as={Link} to="/admin/agenda" $block>
        <CalendarPlus size={18} aria-hidden />
        Novo agendamento
      </Button>
    </PortalPage>
  )
}
