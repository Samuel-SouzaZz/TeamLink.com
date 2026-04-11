export const theme = {
  colors: {
    brand: '#A1122B',
    brandLight: '#C7375F',
    accent: '#B4FF50',
    accentText: '#0a0a0a',
    background: '#0a0a0a',
    surfaceElevated: 'rgba(255,255,255,0.05)',
    border: 'rgba(255,255,255,0.1)',
    text: '#f5f5f5',
    textMuted: 'rgba(245,245,245,0.6)',
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
  },
  typography: {
    fontHeading: "'Sora', system-ui, sans-serif",
    fontFamily: "'Inter', system-ui, sans-serif",
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
      semibold: 600,
      bold: 700,
    },
  },
  zIndex: {
    cta: 40,
    navbar: 50,
    overlay: 60,
    drawer: 61,
  },
  layout: {
    navbarHeight: '3.5rem',
  },
} as const

export type Theme = typeof theme
