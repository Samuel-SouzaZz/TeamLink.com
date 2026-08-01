import styled from 'styled-components'

import { AppointmentStatusPill } from '../../../components/portal'
import { formatShortDate, formatTime, formatWeekday } from '../../../lib/datetime'
import type { Appointment } from '../../../types/domain'

const Row = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  &:last-child {
    border-bottom: none;
  }
`

const When = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 52px;
  padding: 6px 8px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const Day = styled.span`
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
`

const Time = styled.span`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Info = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
`

const Title = styled.span`
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.text};
`

const Meta = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: capitalize;
`

export function AppointmentRow({
  appointment,
  title,
}: {
  appointment: Appointment
  title: string
}) {
  return (
    <Row>
      <When>
        <Day>{formatShortDate(appointment.startsAt)}</Day>
        <Time>{formatTime(appointment.startsAt)}</Time>
      </When>
      <Info>
        <Title>{title}</Title>
        <Meta>{formatWeekday(appointment.startsAt)}</Meta>
      </Info>
      <AppointmentStatusPill status={appointment.status} />
    </Row>
  )
}

export const AppointmentList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`
