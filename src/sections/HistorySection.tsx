import styled from 'styled-components'
import { Container, SectionTitle, Reveal } from '../components/ui'
import { alpha } from '../styles/color'
import { sectionPadding } from '../styles/mixins'
import { timeline } from '../data/metrics'

const SOBRE_WEBP = '/sobre.webp'
const SOBRE_AVIF = '/sobre.avif'

const Section = styled.section`
  ${sectionPadding}
  background-color: ${({ theme }) => theme.colors.background};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing['2xl']};
  }
`

const TimelineWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0.85rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.brand},
      ${({ theme }) => theme.colors.brandLight}
    );

    @media (min-width: 768px) {
      left: 1.5rem;
    }
  }
`

const TimelineItem = styled.div`
  position: relative;
  padding-left: 2.5rem;
  padding-bottom: 20px;

  @media (min-width: 768px) {
    padding-left: 4rem;
    padding-bottom: ${({ theme }) => theme.spacing.xl};
  }

  &:last-child { padding-bottom: 0; }
`

const TimelineDot = styled.div`
  position: absolute;
  left: 0.25rem;
  top: 0.2rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.brand},
    ${({ theme }) => theme.colors.brandLight}
  );
  border: 3px solid ${({ theme }) => theme.colors.background};
  box-shadow: 0 0 0 2px ${({ theme }) => alpha(theme.colors.brandLight, 0.25)},
    0 0 16px -2px ${({ theme }) => alpha(theme.colors.brand, 0.6)};
  z-index: 1;

  @media (min-width: 768px) {
    left: 0.75rem;
    width: 1.5rem;
    height: 1.5rem;
  }
`

const TimelineYear = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.xl};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 2px;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`

const TimelineTitle = styled.h3`
  margin: 0 0 2px;
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: 768px) {
    margin: 0 0 ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.typography.size.lg};
  }
`

const TimelineDesc = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.base};
    line-height: 1.6;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 280px;
  aspect-ratio: 3 / 4;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  justify-self: center;

  @media (min-width: 1024px) {
    order: 2;
    max-width: 100%;
    max-height: 560px;
    box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.6);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }
`

const Picture = styled.picture`
  display: block;
  width: 100%;
  height: 100%;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`

export function HistorySection() {
  return (
    <Section id="historia" aria-labelledby="historia-title">
      <Container>
        <Reveal>
          <SectionTitle
            title="A História da Karol"
            subtitle="Do primeiro treino à turma feminina: uma trajetória de evolução."
            id="historia-title"
          />
        </Reveal>
        <Grid>
          <TimelineWrap>
            {timeline.map((event, i) => (
              <Reveal key={event.year} delay={i * 150}>
                <TimelineItem>
                  <TimelineDot aria-hidden />
                  <TimelineYear>{event.year}</TimelineYear>
                  <TimelineTitle>{event.title}</TimelineTitle>
                  <TimelineDesc>{event.description}</TimelineDesc>
                </TimelineItem>
              </Reveal>
            ))}
          </TimelineWrap>
          <Reveal direction="right" delay={100}>
            <ImageWrapper>
              <Picture>
                <source type="image/avif" srcSet={SOBRE_AVIF} />
                <Image
                  src={SOBRE_WEBP}
                  alt="Karol Cascelli — instrutora de Muay Thai"
                  loading="lazy"
                  width={800}
                  height={1200}
                  decoding="async"
                />
              </Picture>
            </ImageWrapper>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  )
}
