import styled from 'styled-components'

import { WhatsAppIcon } from '../components/icons'
import { Container, SectionTitle, Reveal } from '../components/ui'
import { RatingStars } from '../components/RatingStars'
import { openExternal } from '../lib/browser'
import { alpha } from '../styles/color'
import { focusRing, inlineCtaBase, sectionPadding, surface } from '../styles/mixins'
import { testimonials } from '../data/testimonials'
import { links } from '../data/site'

const Section = styled.section`
  ${sectionPadding}
  background-color: ${({ theme }) => theme.colors.background};
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
  position: relative;
  ${surface}
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  @media (min-width: 768px) {
    border-radius: 20px;
    padding: 28px 24px;
    gap: 16px;

    &:hover {
      transform: translateY(-4px);
      border-color: ${({ theme }) => alpha(theme.colors.brandLight, 0.35)};
      box-shadow: 0 20px 40px -20px ${({ theme }) => alpha(theme.colors.brand, 0.4)};
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
  ${inlineCtaBase}
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
  ${focusRing('accent')}
`

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export function TestimonialsSection() {
  const handleCta = () => openExternal(links.whatsapp.href)

  return (
    <Section id="depoimentos" aria-labelledby="depoimentos-title">
      <Container>
        <Reveal>
          <SectionTitle
            title="O que elas dizem"
            subtitle="Depoimentos reais de alunas que transformaram suas vidas através do Muay Thai."
            id="depoimentos-title"
          />
        </Reveal>
        <Grid>
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 120}>
              <Card>
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
            </Reveal>
          ))}
        </Grid>
        <Reveal>
          <CtaWrap>
            <AccentCta type="button" onClick={handleCta} aria-label="Quero fazer parte — agendar pelo WhatsApp">
              <WhatsAppIcon size={18} />
              Quero fazer parte
            </AccentCta>
          </CtaWrap>
        </Reveal>
      </Container>
    </Section>
  )
}
