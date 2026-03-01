/**
 * Data layer — Conteúdo do site (textos, links, navegação)
 * Facilita trocar textos/fotos sem mexer no layout.
 */

import type { NavItem } from '../types'

export const SLOGAN = 'Sua melhor versão começa no tatame.'

export const links = {
  whatsapp: {
    label: 'WhatsApp',
    href: 'https://wa.me/5511999999999', // substituir pelo número real
    ariaLabel: 'Abrir conversa no WhatsApp',
  },
  instagram: {
    label: 'Instagram',
    href: 'https://instagram.com/karolmuaythai', // substituir pelo @ real
    ariaLabel: 'Abrir perfil no Instagram',
  },
  tiktok: {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@karolmuaythai', // substituir pelo @ real
    ariaLabel: 'Abrir perfil no TikTok',
  },
} as const

export const navItems: NavItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
]
