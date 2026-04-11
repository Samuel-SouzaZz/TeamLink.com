import styled from 'styled-components'

import { WhatsAppIcon } from '../components/icons/WhatsAppIcon'
import { Container } from '../components/ui'
import { RatingStars } from '../components/RatingStars'
import { testimonials } from '../data/testimonials'
import { links } from '../data/site'

const Section = styled.section`
  padding: 40px 16px;
  background-color: ${({ theme }) => theme.colors.background};

  @media (min-width: 768px) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
  }
`

const SectionHeading = styled.h2`
  text-align: center;
  margin: 0 0 4px;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  font-style: italic;

  @media (min-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`

const SectionSub = styled.p`
  text-align: center;
  margin: 0 0 24px;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.typography.size.base};
  }
`

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

const Card = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.3s ease, border-color 0.3s ease;

  @media (min-width: 768px) {
    border-radius: 20px;
    padding: 28px 24px;
    gap: 16px;

    &:hover {
      transform: translateY(-4px);
      border-color: rgba(255, 255, 255, 0.2);
    }
  }
`

const StarsWrap = styled.div`
  display: flex;
`

const QuoteText = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
  flex: 1;

  &::before { content: '\u201C'; }
  &::after  { content: '\u201D'; }

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.sm};
    line-height: 1.7;
  }
`

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
`

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.brand}, ${({ theme }) => theme.colors.brandLight});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  font-size: 0.6875rem;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: ${({ theme }) => theme.typography.size.sm};
  }
`

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const AuthorName = styled.span`
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.size.sm};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.base};
  }
`

const AuthorSince = styled.span`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.sm};
  }
`

const CtaWrap = styled.div`
  text-align: center;
  margin-top: 24px;

  @media (min-width: 768px) {
    margin-top: ${({ theme }) => theme.spacing.xl};
  }
`

const AccentCta = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentText};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  transition: transform 0.15s, filter 0.15s;
  width: 100%;
  max-width: 280px;

  @media (min-width: 768px) {
    width: auto;
    max-width: none;
    padding: 14px 28px;
    font-size: ${({ theme }) => theme.typography.size.base};
  }

  &:hover { transform: translateY(-2px); filter: brightness(1.08); }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.accent}; outline-offset: 2px; }
`

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export function TestimonialsSection() {
  const handleCta = () => {
    window.open(links.whatsapp.href, '_blank', 'noopener,noreferrer')
  }

  return (
    <Section id="depoimentos" aria-labelledby="depoimentos-title">
      <Container>
        <SectionHeading id="depoimentos-title">O que elas dizem</SectionHeading>
        <SectionSub>Depoimentos reais de alunas que transformaram suas vidas através do Muay Thai</SectionSub>
        <Grid>
          {testimonials.map((t) => (
            <Card key={t.id}>
              <StarsWrap>
                <RatingStars rating={t.rating} size={16} aria-label={`${t.rating} estrelas`} />
              </StarsWrap>
              <QuoteText>{t.text}</QuoteText>
              <AuthorRow>
                <Avatar aria-hidden>{getInitials(t.name)}</Avatar>
                <AuthorInfo>
                  <AuthorName>{t.name}</AuthorName>
                  {t.since && <AuthorSince>Desde {t.since}</AuthorSince>}
                </AuthorInfo>
              </AuthorRow>
            </Card>
          ))}
        </Grid>
        <CtaWrap>
          <AccentCta type="button" onClick={handleCta} aria-label="Quero fazer parte — agendar pelo WhatsApp">
            <WhatsAppIcon size={18} />
            Quero fazer parte
          </AccentCta>
        </CtaWrap>
      </Container>
    </Section>
  )
}
