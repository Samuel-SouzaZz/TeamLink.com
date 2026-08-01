import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, UserPlus } from 'lucide-react'
import styled from 'styled-components'

import {
  Button,
  EmptyState,
  Field,
  PageHeading,
  PortalPage,
  StudentStatusPill,
  SubscriptionStatusPill,
} from '../../../components/portal'
import { demoStudents, findSubscriptionByStudent } from '../../../lib/demo-data'
import type { StudentStatus } from '../../../types/domain'

const Filters = styled.div`
  display: flex;
  gap: 8px;
`

const FilterButton = styled.button<{ $active: boolean }>`
  flex: 1;
  min-height: 38px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  border-radius: ${({ theme }) => theme.radius.full};
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;

  color: ${({ theme, $active }) => ($active ? theme.colors.accentText : theme.colors.textMuted)};
  background: ${({ theme, $active }) => ($active ? theme.colors.accent : 'transparent')};
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.accent : 'rgba(255, 255, 255, 0.16)')};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const RowLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.xl};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: background-color 0.2s, border-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.18);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`

const Avatar = styled.span`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(180, 255, 80, 0.14);
  border: 1px solid rgba(180, 255, 80, 0.3);
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: 0.8125rem;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
`

const Info = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Name = styled.span`
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Pills = styled.span`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`

const Chevron = styled(ChevronRight)`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Count = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const FILTERS: { value: StudentStatus; label: string }[] = [
  { value: 'active', label: 'Ativas' },
  { value: 'archived', label: 'Arquivadas' },
]

export default function StudentsListPage() {
  const [status, setStatus] = useState<StudentStatus>('active')
  const [query, setQuery] = useState('')

  const students = useMemo(() => {
    const term = query.trim().toLowerCase()
    return demoStudents
      .filter((student) => student.status === status)
      .filter(
        (student) =>
          term.length === 0 ||
          student.fullName.toLowerCase().includes(term) ||
          student.email.toLowerCase().includes(term),
      )
      .sort((a, b) => a.fullName.localeCompare(b.fullName, 'pt-BR'))
  }, [status, query])

  return (
    <PortalPage>
      <PageHeading title="Alunas" subtitle="Cadastro completo da turma." />

      <Field
        label="Buscar"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Nome ou e-mail"
        aria-label="Buscar aluna por nome ou e-mail"
      />

      <Filters role="group" aria-label="Filtrar por situação">
        {FILTERS.map(({ value, label }) => (
          <FilterButton
            key={value}
            type="button"
            $active={status === value}
            aria-pressed={status === value}
            onClick={() => setStatus(value)}
          >
            {label}
          </FilterButton>
        ))}
      </Filters>

      <Count>{students.length} aluna(s)</Count>

      {students.length > 0 ? (
        <List>
          {students.map((student) => {
            const subscription = findSubscriptionByStudent(student.id)
            return (
              <li key={student.id}>
                <RowLink to={`/admin/alunas/${student.id}`}>
                  <Avatar aria-hidden>{initials(student.fullName)}</Avatar>
                  <Info>
                    <Name>{student.fullName}</Name>
                    <Pills>
                      <StudentStatusPill status={student.status} />
                      {subscription && <SubscriptionStatusPill status={subscription.status} />}
                    </Pills>
                  </Info>
                  <Chevron size={18} aria-hidden />
                </RowLink>
              </li>
            )
          })}
        </List>
      ) : (
        <EmptyState
          title="Nenhuma aluna encontrada"
          description={query ? 'Tente outro termo de busca.' : undefined}
        />
      )}

      <Button type="button" $block>
        <UserPlus size={18} aria-hidden />
        Cadastrar aluna
      </Button>
    </PortalPage>
  )
}
