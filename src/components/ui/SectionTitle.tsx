import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: center;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (min-width: 1024px) {
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  }
`

const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: clamp(1.5rem, 5vw, ${({ theme }) => theme.typography.size['3xl']});
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
  line-height: 1.15;

  @media (min-width: 1024px) {
    font-size: ${({ theme }) => theme.typography.size['4xl']};
  }
`

const Bar = styled.span`
  display: block;
  width: 36px;
  height: 3px;
  margin: 10px auto 0;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.brand},
    ${({ theme }) => theme.colors.accent}
  );

  @media (min-width: 768px) {
    width: 48px;
    margin-top: 14px;
  }
`

const Subtitle = styled.p`
  margin: 14px 0 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    margin-top: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.size.base};
  }

  @media (min-width: 1024px) {
    font-size: ${({ theme }) => theme.typography.size.lg};
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
      <Bar aria-hidden />
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Wrapper>
  )
}
