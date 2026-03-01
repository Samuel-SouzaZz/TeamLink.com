import styled from 'styled-components'
import type { GalleryCategory } from '../types/gallery'
import { Button } from './ui/Button'

const CATEGORY_LABELS: Record<GalleryCategory | 'todos', string> = {
  todos: 'Todos',
  treino: 'Treino',
  turma: 'Turma',
  tecnica: 'Técnica',
  sparring: 'Sparring',
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

export interface CategoryFilterProps {
  selectedCategory: GalleryCategory | 'todos'
  onSelect: (category: GalleryCategory | 'todos') => void
  counts: Record<GalleryCategory | 'todos', number>
}

export function CategoryFilter({
  selectedCategory,
  onSelect,
  counts,
}: CategoryFilterProps) {
  const categories: (GalleryCategory | 'todos')[] = [
    'todos',
    'treino',
    'turma',
    'tecnica',
    'sparring',
  ]

  return (
    <Wrapper>
      {categories.map((cat) => {
        const isActive = selectedCategory === cat
        const count = counts[cat]
        return (
          <Button
            key={cat}
            variant={isActive ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onSelect(cat)}
            aria-pressed={isActive}
          >
            {CATEGORY_LABELS[cat]} <span style={{ opacity: 0.8 }}>({count})</span>
          </Button>
        )
      })}
    </Wrapper>
  )
}
