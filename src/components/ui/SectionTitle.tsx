import styled from 'styled-components'

const Wrapper = styled.section`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Title = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.size['2xl']};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size['3xl']};
  }
`

const Subtitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.base};
  color: ${({ theme }) => theme.colors.textMuted};
`

export interface SectionTitleProps {
  title: string
  subtitle?: string
  id?: string
}

export function SectionTitle({ title, subtitle, id }: SectionTitleProps) {
  return (
    <Wrapper>
      <Title id={id}>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Wrapper>
  )
}
