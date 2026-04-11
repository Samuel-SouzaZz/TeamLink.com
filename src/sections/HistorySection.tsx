import styled from 'styled-components'
import { Container, SectionTitle } from '../components/ui'
import { sobreImage } from '../assets/Sobre'
import { timeline } from '../data/metrics'

const Section = styled.section`
  padding: 40px 16px;
  background-color: ${({ theme }) => theme.colors.background};

  @media (min-width: 768px) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
  }
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
  background: ${({ theme }) => theme.colors.brand};
  border: 3px solid ${({ theme }) => theme.colors.background};
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
    max-height: 520px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
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
        <SectionTitle
          title="A História da Karol"
          subtitle="Do primeiro treino à turma feminina: uma trajetória de evolução."
          id="historia-title"
        />
        <Grid>
          <TimelineWrap>
            {timeline.map((event) => (
              <TimelineItem key={event.year}>
                <TimelineDot aria-hidden />
                <TimelineYear>{event.year}</TimelineYear>
                <TimelineTitle>{event.title}</TimelineTitle>
                <TimelineDesc>{event.description}</TimelineDesc>
              </TimelineItem>
            ))}
          </TimelineWrap>
          <ImageWrapper>
            <Image
              src={sobreImage}
              alt="Karol Cascelli — instrutora de Muay Thai"
              loading="lazy"
              width={600}
              height={800}
              decoding="async"
            />
          </ImageWrapper>
        </Grid>
      </Container>
    </Section>
  )
}
