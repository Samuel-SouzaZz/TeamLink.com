import { useMemo, useState } from 'react'
import type { GalleryCategory } from '../types/gallery'
import { galleryItems } from '../data/gallery'

const ALL: GalleryCategory | 'todos' = 'todos'

export function useGalleryFilter() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | 'todos'>(ALL)

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'todos') return galleryItems
    return galleryItems.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  const counts = useMemo(() => {
    const map: Record<GalleryCategory | 'todos', number> = {
      todos: galleryItems.length,
      treino: galleryItems.filter((i) => i.category === 'treino').length,
      turma: galleryItems.filter((i) => i.category === 'turma').length,
      tecnica: galleryItems.filter((i) => i.category === 'tecnica').length,
      sparring: galleryItems.filter((i) => i.category === 'sparring').length,
    }
    return map
  }, [])

  return {
    selectedCategory,
    setSelectedCategory,
    filteredItems,
    counts,
  }
}
