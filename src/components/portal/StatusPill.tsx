import styled from 'styled-components'
import { alpha } from '../../styles/color'
import type { AppointmentStatus, StudentStatus, SubscriptionStatus } from '../../types/domain'

export type StatusTone = 'success' | 'warning' | 'danger' | 'neutral'

const Pill = styled.span<{ $tone: StatusTone }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  line-height: 1.4;
  white-space: nowrap;

  ${({ theme, $tone }) => {
    if ($tone === 'neutral') {
      return `
        color: ${theme.colors.textMuted};
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
      `
    }
    const color = theme.colors[$tone]
    return `
      color: ${color};
      background: ${alpha(color, 0.12)};
      border: 1px solid ${alpha(color, 0.35)};
    `
  }}
`

export function StatusPill({ tone, children }: { tone: StatusTone; children: string }) {
  return <Pill $tone={tone}>{children}</Pill>
}

/* ── Traduções de status para rótulo + tom ──────────────────────────────── */

const SUBSCRIPTION_LABELS: Record<SubscriptionStatus, { label: string; tone: StatusTone }> = {
  active: { label: 'Ativa', tone: 'success' },
  pending: { label: 'Pendente', tone: 'warning' },
  past_due: { label: 'Em atraso', tone: 'warning' },
  cancelled: { label: 'Cancelada', tone: 'danger' },
}

const APPOINTMENT_LABELS: Record<AppointmentStatus, { label: string; tone: StatusTone }> = {
  scheduled: { label: 'Agendada', tone: 'neutral' },
  confirmed: { label: 'Confirmada', tone: 'success' },
  completed: { label: 'Realizada', tone: 'success' },
  cancelled: { label: 'Cancelada', tone: 'danger' },
  no_show: { label: 'Falta', tone: 'danger' },
}

const STUDENT_LABELS: Record<StudentStatus, { label: string; tone: StatusTone }> = {
  active: { label: 'Ativa', tone: 'success' },
  archived: { label: 'Arquivada', tone: 'neutral' },
}

export const SubscriptionStatusPill = ({ status }: { status: SubscriptionStatus }) => (
  <StatusPill tone={SUBSCRIPTION_LABELS[status].tone}>
    {SUBSCRIPTION_LABELS[status].label}
  </StatusPill>
)

export const AppointmentStatusPill = ({ status }: { status: AppointmentStatus }) => (
  <StatusPill tone={APPOINTMENT_LABELS[status].tone}>
    {APPOINTMENT_LABELS[status].label}
  </StatusPill>
)

export const StudentStatusPill = ({ status }: { status: StudentStatus }) => (
  <StatusPill tone={STUDENT_LABELS[status].tone}>{STUDENT_LABELS[status].label}</StatusPill>
)
