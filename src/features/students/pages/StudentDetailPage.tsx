import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Archive, ArrowLeft, CalendarPlus, EyeOff, Pencil } from 'lucide-react'
import styled from 'styled-components'

import {
  Button,
  Card,
  CardLabel,
  EmptyState,
  ErrorState,
  PageHeading,
  PortalPage,
  StatusPill,
  StudentStatusPill,
  SubscriptionStatusPill,
} from '../../../components/portal'
import { formatAppointmentLabel, formatLongDate } from '../../../lib/datetime'
import {
  appointmentsByStudent,
  demoPrivateNotes,
  findPlan,
  findStudent,
  findSubscriptionByStudent,
  isUpcoming,
} from '../../../lib/demo-data'
import { AppointmentList, AppointmentRow } from '../../booking/components/AppointmentRow'

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`

const Pills = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const Stats = styled.div`
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  font-size: ${({ theme }) => theme.typography.size.sm};

  &:last-child {
    border-bottom: none;
  }
`

const RowLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`

const RowValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  text-align: right;
`

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
`

const Tabs = styled.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Tab = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  min-height: 38px;
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

const NoteItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  &:last-child {
    border-bottom: none;
  }
`

const NoteBody = styled.p`
  margin: 0 0 4px;
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.text};
`

const NoteDate = styled.span`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const NoteList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const PrivacyWarning = styled.p`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0 0 10px;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.warning};

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ComingSoon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px 16px;
  text-align: center;
`

const ComingSoonText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 24rem;
`

type Tab = 'resumo' | 'historico' | 'anotacoes' | 'avaliacoes'

const TABS: { value: Tab; label: string }[] = [
  { value: 'resumo', label: 'Resumo' },
  { value: 'historico', label: 'Histórico' },
  { value: 'anotacoes', label: 'Anotações' },
  { value: 'avaliacoes', label: 'Avaliações' },
]

export default function StudentDetailPage() {
  const { studentId } = useParams<{ studentId: string }>()
  const [tab, setTab] = useState<Tab>('resumo')

  const student = studentId ? findStudent(studentId) : null

  if (!student) {
    return (
      <PortalPage>
        <ErrorState
          title="Aluna não encontrada"
          description="O cadastro pode ter sido arquivado ou o endereço está incorreto."
          action={
            <Button as={Link} to="/admin/alunas" $variant="ghost">
              Voltar para a lista
            </Button>
          }
        />
      </PortalPage>
    )
  }

  const subscription = findSubscriptionByStudent(student.id)
  const plan = subscription ? findPlan(subscription.planId) : null
  const appointments = appointmentsByStudent(student.id)

  const nextAppointment = appointments
    .filter(isUpcoming)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))[0]

  const stats = {
    total: appointments.filter((a) => a.status === 'completed').length,
    cancelled: appointments.filter((a) => a.status === 'cancelled').length,
    noShow: appointments.filter((a) => a.status === 'no_show').length,
  }

  const notes = demoPrivateNotes.filter((note) => note.studentId === student.id)
  const history = [...appointments].sort((a, b) => b.startsAt.localeCompare(a.startsAt))

  return (
    <PortalPage>
      <BackLink to="/admin/alunas">
        <ArrowLeft size={16} aria-hidden />
        Alunas
      </BackLink>

      <PageHeading title={student.fullName} subtitle={student.email} />

      <Pills>
        <StudentStatusPill status={student.status} />
        {subscription && <SubscriptionStatusPill status={subscription.status} />}
      </Pills>

      <Tabs role="tablist" aria-label="Seções da ficha">
        {TABS.map(({ value, label }) => (
          <Tab
            key={value}
            type="button"
            role="tab"
            aria-selected={tab === value}
            $active={tab === value}
            onClick={() => setTab(value)}
          >
            {label}
          </Tab>
        ))}
      </Tabs>

      {tab === 'resumo' && (
        <>
          <Card>
            <Stats>
              <Stat>
                <StatValue>{stats.total}</StatValue>
                <StatLabel>Aulas</StatLabel>
              </Stat>
              <Stat>
                <StatValue>{stats.cancelled}</StatValue>
                <StatLabel>Cancelamentos</StatLabel>
              </Stat>
              <Stat>
                <StatValue>{stats.noShow}</StatValue>
                <StatLabel>Faltas</StatLabel>
              </Stat>
            </Stats>
          </Card>

          <Card>
            <CardLabel>Próxima aula</CardLabel>
            <Row>
              <RowLabel>Quando</RowLabel>
              <RowValue style={{ textTransform: 'capitalize' }}>
                {nextAppointment ? formatAppointmentLabel(nextAppointment.startsAt) : '—'}
              </RowValue>
            </Row>
          </Card>

          <Card>
            <Head>
              <CardLabel>Assinatura</CardLabel>
              {subscription && <SubscriptionStatusPill status={subscription.status} />}
            </Head>
            <Row>
              <RowLabel>Plano</RowLabel>
              <RowValue>{plan?.name ?? '—'}</RowValue>
            </Row>
            <Row>
              <RowLabel>Aluna desde</RowLabel>
              <RowValue>{formatLongDate(student.joinedAt)}</RowValue>
            </Row>
            <Row>
              <RowLabel>Telefone</RowLabel>
              <RowValue>{student.phone ?? '—'}</RowValue>
            </Row>
            {student.archivedAt && (
              <Row>
                <RowLabel>Arquivada em</RowLabel>
                <RowValue>{formatLongDate(student.archivedAt)}</RowValue>
              </Row>
            )}
          </Card>

          <Actions>
            <Button type="button" $block>
              <CalendarPlus size={18} aria-hidden />
              Agendar aula
            </Button>
            <Button type="button" $variant="ghost" $block>
              <Pencil size={18} aria-hidden />
              Editar cadastro
            </Button>
            <Button type="button" $variant="danger" $block>
              <Archive size={18} aria-hidden />
              {student.status === 'archived' ? 'Reativar cadastro' : 'Arquivar cadastro'}
            </Button>
          </Actions>
        </>
      )}

      {tab === 'historico' && (
        <Card>
          <CardLabel>{history.length} registro(s)</CardLabel>
          {history.length > 0 ? (
            <AppointmentList>
              {history.map((appointment) => (
                <AppointmentRow
                  key={appointment.id}
                  appointment={appointment}
                  title="Turma Feminina"
                />
              ))}
            </AppointmentList>
          ) : (
            <EmptyState title="Sem aulas registradas" />
          )}
        </Card>
      )}

      {tab === 'anotacoes' && (
        <Card>
          <PrivacyWarning>
            <EyeOff size={14} aria-hidden />
            <span>Visível apenas para você. A aluna nunca tem acesso a estas anotações.</span>
          </PrivacyWarning>
          {notes.length > 0 ? (
            <NoteList>
              {notes
                .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                .map((note) => (
                  <NoteItem key={note.id}>
                    <NoteBody>{note.body}</NoteBody>
                    <NoteDate>{formatLongDate(note.createdAt)}</NoteDate>
                  </NoteItem>
                ))}
            </NoteList>
          ) : (
            <EmptyState title="Nenhuma anotação" />
          )}
          <Button type="button" $variant="ghost" $block style={{ marginTop: 12 }}>
            Nova anotação
          </Button>
        </Card>
      )}

      {tab === 'avaliacoes' && (
        <Card>
          <ComingSoon>
            <StatusPill tone="neutral">Em breve</StatusPill>
            <ComingSoonText>
              O módulo de avaliações ainda não está disponível. Ele foi deixado para uma fase
              seguinte porque envolve dados sensíveis, que exigem uma decisão específica sobre
              consentimento e retenção.
            </ComingSoonText>
          </ComingSoon>
        </Card>
      )}
    </PortalPage>
  )
}
