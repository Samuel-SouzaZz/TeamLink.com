/**
 * Dados de demonstração.
 *
 * Existem só para as telas terem conteúdo enquanto o Supabase não está ligado.
 * Tudo aqui é tipado com os mesmos tipos do domínio real, então trocar por
 * consultas de verdade é substituir a origem, não reescrever as telas.
 *
 * Este arquivo inteiro sai quando as queries entrarem. Nada de lógica de
 * negócio aqui — apenas fixtures.
 */
import type {
  Appointment,
  PrivateNote,
  ScheduleSlot,
  Service,
  Student,
  Subscription,
  SubscriptionPlan,
  WaitlistEntry,
} from '../types/domain'

/**
 * Âncora estável para gerar datas relativas legíveis nas telas.
 *
 * Fica no escopo do módulo de propósito: lida uma vez, ela dá às telas um
 * "agora" que não muda entre renders. Chamar `new Date()` durante o render
 * produziria resultados instáveis a cada re-render.
 */
export const demoNow = new Date()

const now = demoNow

function atHour(dayOffset: number, hour: number, minute = 0): string {
  const date = new Date(now)
  date.setDate(date.getDate() + dayOffset)
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}

const plusMinutes = (iso: string, minutes: number) =>
  new Date(new Date(iso).getTime() + minutes * 60_000).toISOString()

/* ── Serviços ───────────────────────────────────────────────────────────── */

export const demoServices: Service[] = [
  {
    id: 'svc-turma',
    name: 'Turma Feminina',
    kind: 'group_class',
    durationMinutes: 60,
    capacity: 12,
    active: true,
  },
  {
    id: 'svc-personal',
    name: 'Personal Individual',
    kind: 'personal',
    durationMinutes: 60,
    capacity: 1,
    active: true,
  },
]

/* ── Planos ─────────────────────────────────────────────────────────────── */

export const demoPlans: SubscriptionPlan[] = [
  {
    id: 'plan-turma',
    name: 'Turma Feminina',
    description: 'Duas aulas por semana, terças e quintas às 19h.',
    priceCents: 10_000,
    billingPeriod: 'monthly',
    classesPerWeek: 2,
    active: true,
  },
  {
    id: 'plan-personal',
    name: 'Personal Individual',
    description: 'Acompanhamento individualizado, horários combinados.',
    priceCents: 40_000,
    billingPeriod: 'monthly',
    classesPerWeek: null,
    active: true,
  },
]

/* ── Alunas ─────────────────────────────────────────────────────────────── */

export const demoStudents: Student[] = [
  {
    id: 'stu-1',
    profileId: 'demo-student',
    fullName: 'Isabella Macedo',
    email: 'isabella@exemplo.com',
    phone: '(32) 98888-1010',
    status: 'active',
    joinedAt: atHour(-210, 19),
    archivedAt: null,
    createdAt: atHour(-210, 19),
    updatedAt: atHour(-4, 10),
  },
  {
    id: 'stu-2',
    fullName: 'Marina Duarte',
    profileId: null,
    email: 'marina@exemplo.com',
    phone: '(32) 98888-2020',
    status: 'active',
    joinedAt: atHour(-120, 19),
    archivedAt: null,
    createdAt: atHour(-120, 19),
    updatedAt: atHour(-9, 10),
  },
  {
    id: 'stu-3',
    fullName: 'Camila Rezende',
    profileId: null,
    email: 'camila@exemplo.com',
    phone: '(32) 98888-3030',
    status: 'active',
    joinedAt: atHour(-60, 19),
    archivedAt: null,
    createdAt: atHour(-60, 19),
    updatedAt: atHour(-2, 10),
  },
  {
    id: 'stu-4',
    fullName: 'Letícia Barros',
    profileId: null,
    email: 'leticia@exemplo.com',
    phone: null,
    status: 'archived',
    joinedAt: atHour(-400, 19),
    archivedAt: atHour(-30, 12),
    createdAt: atHour(-400, 19),
    updatedAt: atHour(-30, 12),
  },
]

/** A aluna representada pela sessão de demonstração. */
export const demoCurrentStudent = demoStudents[0]

/* ── Assinaturas ────────────────────────────────────────────────────────── */

export const demoSubscriptions: Subscription[] = [
  {
    id: 'sub-1',
    studentId: 'stu-1',
    planId: 'plan-turma',
    status: 'active',
    currentPeriodStart: atHour(-12, 0),
    currentPeriodEnd: atHour(18, 0),
    cancelledAt: null,
    createdAt: atHour(-210, 19),
  },
  {
    id: 'sub-2',
    studentId: 'stu-2',
    planId: 'plan-turma',
    status: 'active',
    currentPeriodStart: atHour(-5, 0),
    currentPeriodEnd: atHour(25, 0),
    cancelledAt: null,
    createdAt: atHour(-120, 19),
  },
  {
    id: 'sub-3',
    studentId: 'stu-3',
    planId: 'plan-turma',
    status: 'pending',
    currentPeriodStart: null,
    currentPeriodEnd: null,
    cancelledAt: null,
    createdAt: atHour(-3, 15),
  },
  {
    id: 'sub-4',
    studentId: 'stu-4',
    planId: 'plan-turma',
    status: 'cancelled',
    currentPeriodStart: atHour(-90, 0),
    currentPeriodEnd: atHour(-30, 0),
    cancelledAt: atHour(-30, 12),
    createdAt: atHour(-400, 19),
  },
]

/* ── Horários e agendamentos ────────────────────────────────────────────── */

const slot = (id: string, dayOffset: number, hour: number, booked: number): ScheduleSlot => {
  const startsAt = atHour(dayOffset, hour)
  return {
    id,
    serviceId: 'svc-turma',
    startsAt,
    endsAt: plusMinutes(startsAt, 60),
    capacity: 12,
    bookedCount: booked,
    cancelledAt: null,
  }
}

export const demoSlots: ScheduleSlot[] = [
  slot('slot-today', 0, 19, 8),
  slot('slot-2', 2, 19, 12),
  slot('slot-3', 5, 19, 4),
  slot('slot-4', 7, 19, 1),
  slot('slot-5', 9, 19, 0),
]

const appointment = (
  id: string,
  slotId: string,
  studentId: string,
  status: Appointment['status'],
  dayOffset: number,
  hour = 19,
): Appointment => {
  const startsAt = atHour(dayOffset, hour)
  return {
    id,
    slotId,
    studentId,
    serviceId: 'svc-turma',
    status,
    startsAt,
    endsAt: plusMinutes(startsAt, 60),
    cancelledAt: status === 'cancelled' ? atHour(dayOffset - 1, 10) : null,
    cancellationReason: status === 'cancelled' ? 'Imprevisto de trabalho' : null,
    createdAt: atHour(dayOffset - 7, 10),
  }
}

export const demoAppointments: Appointment[] = [
  appointment('apt-1', 'slot-today', 'stu-1', 'confirmed', 0),
  appointment('apt-2', 'slot-today', 'stu-2', 'confirmed', 0),
  appointment('apt-3', 'slot-today', 'stu-3', 'scheduled', 0),
  appointment('apt-4', 'slot-2', 'stu-1', 'scheduled', 2),
  appointment('apt-5', 'slot-3', 'stu-2', 'scheduled', 5),
  appointment('apt-past-1', 'slot-past-1', 'stu-1', 'completed', -2),
  appointment('apt-past-2', 'slot-past-2', 'stu-1', 'completed', -5),
  appointment('apt-past-3', 'slot-past-3', 'stu-1', 'cancelled', -9),
  appointment('apt-past-4', 'slot-past-4', 'stu-1', 'completed', -12),
  appointment('apt-past-5', 'slot-past-5', 'stu-1', 'no_show', -16),
]

export const demoWaitlist: WaitlistEntry[] = [
  { id: 'wl-1', slotId: 'slot-2', studentId: 'stu-3', createdAt: atHour(-1, 9) },
]

/* ── Anotações privadas (nunca visíveis para a aluna) ───────────────────── */

export const demoPrivateNotes: PrivateNote[] = [
  {
    id: 'note-1',
    studentId: 'stu-1',
    authorId: 'demo-admin',
    body: 'Evoluiu bem no clinch. Trabalhar defesa de chute baixo nas próximas aulas.',
    createdAt: atHour(-5, 20, 30),
  },
  {
    id: 'note-2',
    studentId: 'stu-1',
    authorId: 'demo-admin',
    body: 'Avisou que viaja na primeira semana do mês que vem.',
    createdAt: atHour(-1, 21),
  },
]

/* ── Consultas auxiliares usadas pelas telas ────────────────────────────── */

export const findStudent = (id: string) => demoStudents.find((s) => s.id === id) ?? null

export const findSubscriptionByStudent = (studentId: string) =>
  demoSubscriptions.find((s) => s.studentId === studentId) ?? null

export const findPlan = (id: string) => demoPlans.find((p) => p.id === id) ?? null

export const appointmentsByStudent = (studentId: string) =>
  demoAppointments.filter((a) => a.studentId === studentId)

export const isUpcoming = (appointment: Appointment) =>
  new Date(appointment.startsAt).getTime() >= now.getTime() &&
  appointment.status !== 'cancelled'
