import styled from 'styled-components'

export const Container = styled.div<{ $maxWidth?: string; $center?: boolean }>`
  width: 100%;
  max-width: ${({ $maxWidth = '1200px' }) => $maxWidth};
  margin-left: ${({ $center = true }) => ($center ? 'auto' : '0')};
  margin-right: ${({ $center = true }) => ($center ? 'auto' : '0')};
  padding-left: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing.md};

  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.spacing.lg};
    padding-right: ${({ theme }) => theme.spacing.lg};
  }
`
