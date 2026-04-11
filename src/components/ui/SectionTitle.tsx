import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`

const Title = styled.h2`
  margin: 0 0 4px;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: clamp(1.375rem, 5vw, ${({ theme }) => theme.typography.size['3xl']});
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.base};
  }
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
