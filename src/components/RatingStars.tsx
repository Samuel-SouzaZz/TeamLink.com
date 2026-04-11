import styled from 'styled-components'
import { Star } from 'lucide-react'

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: ${({ theme }) => theme.colors.textMuted};
`

const StarIcon = styled(Star)<{ $filled?: boolean }>`
  flex-shrink: 0;
  color: ${({ theme, $filled }) => ($filled ? theme.colors.accent : 'rgba(255,255,255,0.15)')};
  fill: ${({ theme, $filled }) => ($filled ? theme.colors.accent : 'transparent')};
`

export interface RatingStarsProps {
  rating: number
  max?: number
  size?: number
  'aria-label'?: string
}

/**
 * Exibe estrelas de avaliação (1 a max). Preenche conforme rating.
 */
export function RatingStars({
  rating,
  max = 5,
  size = 18,
  'aria-label': ariaLabel = `Avaliação: ${rating} de ${max} estrelas`,
}: RatingStarsProps) {
  const filled = Math.min(max, Math.max(0, Math.round(rating)))
  return (
    <Wrapper role="img" aria-label={ariaLabel}>
      {Array.from({ length: max }, (_, i) => (
        <StarIcon key={i} size={size} $filled={i < filled} aria-hidden />
      ))}
    </Wrapper>
  )
}
