import type { NavItem } from '../types'

export const SLOGAN = 'Sua melhor versão começa no tatame.'

export const links = {
  whatsapp: {
    label: 'WhatsApp',
    href: 'https://wa.me/5532984583098?text=Oi!%20Gostaria%20de%20agendar%20uma%20aula%20experimental%20de%20Muay%20Thai.',
    ariaLabel: 'Abrir conversa no WhatsApp',
  },
  whatsappReserva: {
    label: 'Reservar vaga',
    href: 'https://wa.me/5532984583098?text=Gostaria%20de%20reservar%20minha%20vaga%20na%20turma%20feminina!',
    ariaLabel: 'Reservar vaga na turma feminina pelo WhatsApp',
  },
  whatsappPersonal: {
    label: 'Agendar avaliação',
    href: 'https://wa.me/5532983098?text=Quero%20agendar%20uma%20avaliação%20para%20personal%20training!',
    ariaLabel: 'Agendar avaliação para personal training pelo WhatsApp',
  },
  instagram: {
    label: 'Instagram',
    href: 'https://www.instagram.com/karolcascelli',
    ariaLabel: 'Abrir perfil no Instagram',
  },
  tiktok: {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@karolcascelli',
    ariaLabel: 'Abrir perfil no TikTok',
  },
  maps: {
    label: 'Abrir no Maps',
    href: 'https://www.google.com/maps/search/?api=1&query=Rua+Virgínia+Napoleão+39+Napoleão+Juiz+de+Fora+MG',
    ariaLabel: 'Abrir localização no Google Maps',
  },
} as const

export const navItems: NavItem[] = [
  { label: 'Programas', href: '#programas' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'História', href: '#historia' },
  { label: 'Depoimentos', href: '#depoimentos' },
]

export const ADDRESS = 'Rua Virgínia Napoleão, nº 39, Napoleão — 2º andar, Juiz de Fora/MG'
