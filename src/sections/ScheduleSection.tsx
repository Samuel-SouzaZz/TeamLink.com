import styled from 'styled-components'
import { CalendarDays, MapPin, Clock } from 'lucide-react'
import { Container } from '../components/ui'
import { links } from '../data/site'
import { schedule, personalNote } from '../data/metrics'
import turmaFoto from '../assets/gallery/turma-feminina.webp'

const Section = styled.section`
  padding: 40px 16px;
  background-color: ${({ theme }) => theme.colors.background};

  @media (min-width: 768px) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
  }
`

const SectionHeading = styled.h2`
  text-align: center;
  margin: 0 0 24px;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  font-style: italic;

  @media (min-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`

const ScheduleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (min-width: 768px) {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

const BlockHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const HeaderIcon = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
`

const BlockTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.xl};
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  overflow: hidden;

  @media (min-width: 768px) {
    border-radius: 12px;
  }
`

const Th = styled.th`
  text-align: left;
  padding: 10px 14px;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.textMuted};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (min-width: 768px) {
    padding: 14px 20px;
    font-size: ${({ theme }) => theme.typography.size.sm};
  }
`

const Td = styled.td`
  padding: 10px 14px;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);

  tr:last-child & { border-bottom: none; }

  @media (min-width: 768px) {
    padding: 14px 20px;
    font-size: ${({ theme }) => theme.typography.size.base};
  }
`

const TurmaBadge = styled.span`
  display: inline-block;
  padding: 3px 10px;
  font-size: 0.6875rem;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.accentText};
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radius.full};
  white-space: nowrap;

  @media (min-width: 768px) {
    padding: 4px 14px;
    font-size: ${({ theme }) => theme.typography.size.sm};
  }
`

const Note = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};

  svg { flex-shrink: 0; opacity: 0.6; }

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.sm};
    gap: 8px;
  }
`

const LocationBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (min-width: 768px) {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

const LocationImageWrap = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);

  @media (min-width: 768px) {
    aspect-ratio: 16 / 10;
    border-radius: 16px;
  }
`

const LocationImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const LocationName = styled.h4`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.lg};
  }
`

const LocationAddress = styled.p`
  margin: 4px 0 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;

  @media (min-width: 768px) {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.size.sm};
    line-height: 1.6;
  }
`

const MapsBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 20px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.15s, background-color 0.2s, border-color 0.2s;

  @media (min-width: 768px) {
    padding: 14px 24px;
    font-size: ${({ theme }) => theme.typography.size.base};
    border-radius: 12px;
  }

  &:hover { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.3); transform: translateY(-2px); }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.text}; outline-offset: 2px; }
`

export function ScheduleSection() {
  const handleMaps = () => {
    window.open(links.maps.href, '_blank', 'noopener,noreferrer')
  }

  return (
    <Section id="agenda" aria-labelledby="agenda-title">
      <Container>
        <SectionHeading id="agenda-title">Agenda &amp; Local</SectionHeading>
        <Grid>
          <ScheduleBlock>
            <BlockHeader>
              <HeaderIcon aria-hidden><CalendarDays size={20} strokeWidth={2} /></HeaderIcon>
              <BlockTitle>Horários das turmas</BlockTitle>
            </BlockHeader>
            <Table>
              <thead>
                <tr>
                  <Th>Dia</Th>
                  <Th>Horário</Th>
                  <Th>Turma</Th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.day}>
                    <Td>{row.day}</Td>
                    <Td>{row.time}</Td>
                    <Td><TurmaBadge>{row.class}</TurmaBadge></Td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Note>
              <Clock size={13} strokeWidth={2} aria-hidden />
              {personalNote}
            </Note>
          </ScheduleBlock>

          <LocationBlock>
            <BlockHeader>
              <HeaderIcon aria-hidden><MapPin size={20} strokeWidth={2} /></HeaderIcon>
              <BlockTitle>Onde treinamos</BlockTitle>
            </BlockHeader>
            <LocationImageWrap>
              <LocationImage
                src={turmaFoto}
                alt="Turma feminina de Muay Thai na Team Link"
                loading="lazy"
                width={800}
                height={500}
                decoding="async"
              />
            </LocationImageWrap>
            <div>
              <LocationName>Team Link – Muay Thai</LocationName>
              <LocationAddress>
                Rua Virgínia Napoleão, nº 39, Napoleão — 2º andar<br />
                Juiz de Fora, MG
              </LocationAddress>
            </div>
            <MapsBtn type="button" onClick={handleMaps} aria-label={links.maps.ariaLabel}>
              Abrir no Maps
            </MapsBtn>
          </LocationBlock>
        </Grid>
      </Container>
    </Section>
  )
}
