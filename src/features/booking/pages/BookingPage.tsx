import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Users } from 'lucide-react'
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
import { formatShortDate, formatTime, formatWeekday } from '../../../lib/datetime'
import {
  appointmentsByStudent,
  demoCurrentStudent,
  demoNow,
  demoSlots,
  findSubscriptionByStudent,
} from '../../../lib/demo-data'
import { canBook, type ScheduleSlot } from '../../../types/domain'

const SlotList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const SlotCard = styled.li<{ $disabled: boolean }>`
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};
`

const SlotBody = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const SlotWhen = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const SlotDay = styled.span`
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
  text-transform: capitalize;
`

const SlotMeta = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Blocked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Muted = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`

function seatsLeft(slot: ScheduleSlot) {
  return Math.max(0, slot.capacity - slot.bookedCount)
}

/**
 * Escolha de horário.
 *
 * As checagens aqui (assinatura ativa, vaga disponível, já agendada) são de
 * interface. A garantia de verdade — capacidade e duplicidade — está em
 * constraints e numa função transacional no Postgres; o React só evita que a
 * aluna descubra o erro depois de tocar no botão.
 */
export default function BookingPage() {
  const student = demoCurrentStudent
  const subscription = findSubscriptionByStudent(student.id)
  const allowed = subscription ? canBook(subscription.status) : false

  const bookedSlotIds = new Set(
    appointmentsByStudent(student.id)
      .filter((appointment) => appointment.status !== 'cancelled')
      .map((appointment) => appointment.slotId),
  )

  const [requestedSlotId, setRequestedSlotId] = useState<string | null>(null)

  const upcomingSlots = demoSlots
    .filter((slot) => !slot.cancelledAt && new Date(slot.startsAt) > demoNow)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))

  if (!allowed) {
    return (
      <PortalPage>
        <PageHeading title="Agendar" />
        <Card>
          <Blocked>
            <CardLabel>Assinatura necessária</CardLabel>
            <Muted>
              Novos agendamentos ficam disponíveis com a assinatura ativa. Seu histórico
              continua acessível normalmente.
            </Muted>
            <Button as={Link} to="/app" $variant="ghost" $block>
              Voltar ao início
            </Button>
          </Blocked>
        </Card>
      </PortalPage>
    )
  }

  return (
    <PortalPage>
      <PageHeading title="Agendar" subtitle="Escolha um horário da turma feminina." />

      {upcomingSlots.length === 0 ? (
        <EmptyState
          title="Nenhum horário aberto"
          description="Assim que a Karol publicar novas turmas, elas aparecem aqui."
        />
      ) : (
        <SlotList>
          {upcomingSlots.map((slot) => {
            const remaining = seatsLeft(slot)
            const alreadyBooked = bookedSlotIds.has(slot.id)
            const full = remaining === 0
            const disabled = alreadyBooked || full
            const requested = requestedSlotId === slot.id

            return (
              <SlotCard key={slot.id} $disabled={disabled}>
                <Card>
                  <SlotBody>
                    <SlotWhen>
                      <SlotDay>
                        {formatWeekday(slot.startsAt)}, {formatShortDate(slot.startsAt)}
                      </SlotDay>
                      <SlotMeta>
                        {formatTime(slot.startsAt)} · <Users size={12} aria-hidden />
                        {full ? 'Turma cheia' : `${remaining} vagas`}
                      </SlotMeta>
                    </SlotWhen>

                    {alreadyBooked ? (
                      <StatusPill tone="success">Já agendada</StatusPill>
                    ) : requested ? (
                      <StatusPill tone="success">Solicitado</StatusPill>
                    ) : (
                      <Button
                        type="button"
                        $variant={full ? 'ghost' : 'accent'}
                        onClick={() => setRequestedSlotId(slot.id)}
                      >
                        {full ? 'Lista de espera' : 'Reservar'}
                        {!full && <Check size={16} aria-hidden />}
                      </Button>
                    )}
                  </SlotBody>
                </Card>
              </SlotCard>
            )
          })}
        </SlotList>
      )}

      <Muted>
        Confirmação e cancelamento seguem as regras combinadas com a Karol. Esta tela ainda usa
        dados de demonstração.
      </Muted>
    </PortalPage>
  )
}
