/**
 * Tema do design system — cores, espaçamento, tipografia, raio
 */

export const theme = {
  colors: {
    brand: '#b91c1c',
    brandLight: '#dc2626',
    background: '#0a0a0a',
    surface: '#0a0a0a',
    surfaceElevated: '#171717',
    muted: '#737373',
    border: '#262626',
    text: '#fafafa',
    textMuted: '#a3a3a3',
    overlay: 'rgba(0, 0, 0, 0.6)',
    whatsapp: '#25D366',
    whatsappHover: '#20bd5a',
  },
  radius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    container: 'max(16px, (100vw - 1200px) / 2)',
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    size: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    weight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  zIndex: {
    navbar: 50,
    overlay: 60,
    drawer: 61,
    modal: 50,
    cta: 40,
  },
  layout: {
    navbarHeight: '3.5rem',
  },
} as const

export type Theme = typeof theme
