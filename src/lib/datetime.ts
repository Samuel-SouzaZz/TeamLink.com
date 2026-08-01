/**
 * Formatação de datas.
 *
 * O banco guarda tudo em UTC (`timestamptz`). Toda exibição passa por aqui com
 * o fuso fixado em America/Sao_Paulo, para que o horário não mude conforme o
 * relógio do aparelho de quem está olhando.
 */

const TIME_ZONE = 'America/Sao_Paulo'
const LOCALE = 'pt-BR'

const withZone = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(LOCALE, { ...options, timeZone: TIME_ZONE })

const timeFormatter = withZone({ hour: '2-digit', minute: '2-digit' })
const dayFormatter = withZone({ day: '2-digit', month: '2-digit' })
const longDateFormatter = withZone({ day: '2-digit', month: 'long', year: 'numeric' })
const weekdayFormatter = withZone({ weekday: 'long' })

/** `19:00` */
export const formatTime = (iso: string) => timeFormatter.format(new Date(iso))

/** `04/08` */
export const formatShortDate = (iso: string) => dayFormatter.format(new Date(iso))

/** `4 de agosto de 2026` */
export const formatLongDate = (iso: string) => longDateFormatter.format(new Date(iso))

/** `terça-feira` */
export const formatWeekday = (iso: string) => weekdayFormatter.format(new Date(iso))

/** `terça-feira, 04/08 às 19:00` */
export function formatAppointmentLabel(iso: string) {
  return `${formatWeekday(iso)}, ${formatShortDate(iso)} às ${formatTime(iso)}`
}

/** Chave `YYYY-MM-DD` do dia em São Paulo — usada para agrupar por data. */
export function toZonedDayKey(iso: string) {
  // en-CA formata como YYYY-MM-DD, que ordena corretamente como string.
  return new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(new Date(iso))
}

export function isSameZonedDay(a: string, b: string) {
  return toZonedDayKey(a) === toZonedDayKey(b)
}

/** Formata centavos como `R$ 100,00`. */
export function formatPrice(cents: number) {
  return new Intl.NumberFormat(LOCALE, { style: 'currency', currency: 'BRL' }).format(cents / 100)
}
