import { css } from 'styled-components'
import type { Theme } from './theme'

type FocusColor = Extract<keyof Theme['colors'], 'accent' | 'text' | 'brand' | 'whatsapp'>

/**
 * Anel de foco padrão — aparece na navegação por teclado, não no clique.
 * `radius` só é necessário em elementos sem borda arredondada própria.
 */
export const focusRing = (color: FocusColor, offset = '2px', radius?: string) => css`
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors[color]};
    outline-offset: ${offset};
    ${radius && `border-radius: ${radius};`}
  }
`

/** Respiro vertical padrão das seções da home. */
export const sectionPadding = css`
  padding: 40px 16px;

  @media (min-width: 768px) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
  }
`

/** Superfície translúcida dos cards e da tabela de horários. */
export const surface = css`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
`

/** Tipografia comum a todos os botões de ação. */
export const ctaTypography = css`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`

/** CTAs que ficam lado a lado: hero, depoimentos e chamada final. */
export const inlineCtaBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  ${ctaTypography}
`

/** No desktop os CTAs inline param de esticar e ganham mais respiro. */
export const inlineCtaDesktop = css`
  @media (min-width: 768px) {
    padding: 14px 28px;
    font-size: ${({ theme }) => theme.typography.size.base};
    width: auto;
  }
`

/** CTAs que ocupam a largura toda do bloco: cards de programa e mapa. */
export const blockCtaBase = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

/** CTA fixado no rodapé do card de programa. */
export const cardCtaBase = css`
  ${blockCtaBase}
  padding: 14px 24px;
  margin-top: auto;
  ${ctaTypography}
`

/** No desktop o CTA do card cresce junto com o card. */
export const cardCtaDesktop = css`
  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.base};
    padding: 16px 24px;
    border-radius: 12px;
  }
`
