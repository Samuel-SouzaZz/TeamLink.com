/**
 * Modelo de domínio do portal de agendamento.
 *
 * Espelha as tabelas de `supabase/migrations`. Todos os instantes são strings
 * ISO 8601 em UTC, exatamente como saem do Postgres (`timestamptz`); a
 * conversão para America/Sao_Paulo acontece só na exibição (`src/lib/datetime`).
 *
 * Nenhum tipo aqui carrega dado físico, medida corporal ou informação de saúde
 * — isso ficou para a fase de avaliações.
 */

/* ── Alunas ─────────────────────────────────────────────────────────────── */

export const STUDENT_STATUSES = ['active', 'archived'] as const
export type StudentStatus = (typeof STUDENT_STATUSES)[number]

export interface Student {
  id: string
  profileId: string | null
  fullName: string
  email: string
  phone: string | null
  status: StudentStatus
  /**
   * Não existe campo de observação aqui, e é de propósito: as anotações da Karol
   * moram em `private_notes`, com RLS que só libera para ela. Uma coluna de
   * texto livre em `students` vazaria num `select *` da própria aluna.
   */
  joinedAt: string
  archivedAt: string | null
  createdAt: string
  updatedAt: string
}

/* ── Serviços e horários ────────────────────────────────────────────────── */

export const SERVICE_KINDS = ['group_class', 'personal'] as const
export type ServiceKind = (typeof SERVICE_KINDS)[number]

export interface Service {
  id: string
  name: string
  kind: ServiceKind
  durationMinutes: number
  capacity: number
  active: boolean
}

export interface ScheduleSlot {
  id: string
  serviceId: string
  startsAt: string
  endsAt: string
  capacity: number
  bookedCount: number
  cancelledAt: string | null
}

/* ── Agendamentos ───────────────────────────────────────────────────────── */

export const APPOINTMENT_STATUSES = [
  'scheduled',
  'confirmed',
  'cancelled',
  'completed',
  'no_show',
] as const
export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number]

export interface Appointment {
  id: string
  slotId: string
  studentId: string
  serviceId: string
  status: AppointmentStatus
  startsAt: string
  endsAt: string
  cancelledAt: string | null
  cancellationReason: string | null
  createdAt: string
}

export const ATTENDANCE_STATUSES = ['present', 'absent', 'excused'] as const
export type AttendanceStatus = (typeof ATTENDANCE_STATUSES)[number]

export interface AttendanceRecord {
  id: string
  appointmentId: string
  studentId: string
  status: AttendanceStatus
  recordedAt: string
}

/* ── Assinaturas ────────────────────────────────────────────────────────── */

export const SUBSCRIPTION_STATUSES = [
  'pending',
  'active',
  'past_due',
  'cancelled',
] as const
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number]

export interface SubscriptionPlan {
  id: string
  name: string
  description: string | null
  priceCents: number
  billingPeriod: 'monthly'
  classesPerWeek: number | null
  active: boolean
}

export interface Subscription {
  id: string
  studentId: string
  planId: string
  status: SubscriptionStatus
  currentPeriodStart: string | null
  currentPeriodEnd: string | null
  cancelledAt: string | null
  createdAt: string
}

/** Só assinatura ativa libera novo agendamento. */
export function canBook(status: SubscriptionStatus): boolean {
  return status === 'active'
}

/* ── Lista de espera ────────────────────────────────────────────────────── */

export interface WaitlistEntry {
  id: string
  slotId: string
  studentId: string
  createdAt: string
}

/* ── Anotações privadas (exclusivas da Karol) ───────────────────────────── */

export interface PrivateNote {
  id: string
  studentId: string
  authorId: string
  body: string
  createdAt: string
}
