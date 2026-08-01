import { CalendarPlus, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import {
  Button,
  Card,
  CardLabel,
  CardTitle,
  EmptyState,
  PageHeading,
  PortalPage,
  SectionStack,
  SubscriptionStatusPill,
} from '../../../components/portal'
import { formatAppointmentLabel, formatLongDate } from '../../../lib/datetime'
import {
  appointmentsByStudent,
  demoCurrentStudent,
  findPlan,
  findSubscriptionByStudent,
  isUpcoming,
} from '../../../lib/demo-data'
import { canBook } from '../../../types/domain'
import { AppointmentList, AppointmentRow } from '../components/AppointmentRow'

const NextClass = styled.p`
  margin: 6px 0 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.accent};
  text-transform: capitalize;
`

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

const Muted = styled.p`
  margin: 6px 0 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`

const PrivacyNote = styled.p`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`

const CardLink = styled(Link)`
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.accent};

  &:hover {
    text-decoration: underline;
  }
`

export default function StudentHomePage() {
  const student = demoCurrentStudent
  const subscription = findSubscriptionByStudent(student.id)
  const plan = subscription ? findPlan(subscription.planId) : null

  const appointments = appointmentsByStudent(student.id)
  const upcoming = appointments
    .filter(isUpcoming)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
  const nextAppointment = upcoming[0] ?? null

  const recent = appointments
    .filter((appointment) => !isUpcoming(appointment))
    .sort((a, b) => b.startsAt.localeCompare(a.startsAt))
    .slice(0, 3)

  const bookingAllowed = subscription ? canBook(subscription.status) : false

  const firstName = student.fullName.split(' ')[0]

  return (
    <PortalPage>
      <PageHeading title={`Oi, ${firstName}`} subtitle="Bom te ver por aqui." />

      <Card>
        <CardLabel>Próxima aula</CardLabel>
        {nextAppointment ? (
          <NextClass>{formatAppointmentLabel(nextAppointment.startsAt)}</NextClass>
        ) : (
          <Muted>Você ainda não tem aula marcada.</Muted>
        )}
      </Card>

      <Card>
        <Head>
          <CardLabel>Assinatura</CardLabel>
          {subscription && <SubscriptionStatusPill status={subscription.status} />}
        </Head>
        {subscription ? (
          <>
            <CardTitle as="p">{plan?.name ?? 'Plano'}</CardTitle>
            {subscription.currentPeriodEnd && subscription.status === 'active' && (
              <Muted>Renova em {formatLongDate(subscription.currentPeriodEnd)}.</Muted>
            )}
            {subscription.status === 'pending' && (
              <Muted>Aguardando confirmação do pagamento para liberar os agendamentos.</Muted>
            )}
            {subscription.status === 'cancelled' && (
              <Muted>
                Assinatura cancelada. Seu histórico continua disponível e a conta pode ser
                reativada quando você quiser voltar.
              </Muted>
            )}
          </>
        ) : (
          <Muted>Nenhuma assinatura encontrada.</Muted>
        )}
      </Card>

      <Button
        as={Link}
        to="/app/agendar"
        $block
        style={bookingAllowed ? undefined : { pointerEvents: 'none', opacity: 0.45 }}
        aria-disabled={!bookingAllowed}
      >
        <CalendarPlus size={18} aria-hidden />
        Agendar nova aula
      </Button>
      {!bookingAllowed && (
        <Muted>Ative sua assinatura para liberar novos agendamentos.</Muted>
      )}

      <SectionStack>
        <Card>
          <Head>
            <CardLabel>Histórico recente</CardLabel>
            <CardLink to="/app/historico">Ver tudo</CardLink>
          </Head>
          {recent.length > 0 ? (
            <AppointmentList>
              {recent.map((appointment) => (
                <AppointmentRow
                  key={appointment.id}
                  appointment={appointment}
                  title="Turma Feminina"
                />
              ))}
            </AppointmentList>
          ) : (
            <EmptyState
              title="Nada por aqui ainda"
              description="Suas aulas realizadas vão aparecer nesta lista."
            />
          )}
        </Card>
      </SectionStack>

      <PrivacyNote>
        <Lock size={14} aria-hidden />
        <span>
          Você vê apenas os seus dados. Nenhuma outra aluna tem acesso ao seu histórico.
        </span>
      </PrivacyNote>
    </PortalPage>
  )
}
