import styled from 'styled-components'
import { surface } from '../../styles/mixins'

/** Superfície padrão do portal — mesma linguagem visual dos cards do site. */
export const Card = styled.div`
  ${surface}
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 16px;
`

export const CardTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
`

export const CardLabel = styled.p`
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`
