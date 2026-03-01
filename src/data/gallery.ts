import type { GalleryItem } from '../types/gallery'
import { gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7 } from '../assets/gallery'

export const galleryItems: GalleryItem[] = [
  { id: '1', src: gallery1, alt: 'Treino de Muay Thai', category: 'treino' },
  { id: '2', src: gallery2, alt: 'Turma feminina', category: 'turma' },
  { id: '3', src: gallery3, alt: 'Técnica de chute', category: 'tecnica' },
  { id: '4', src: gallery4, alt: 'Sparring leve', category: 'sparring' },
  { id: '5', src: gallery5, alt: 'Aquecimento na turma', category: 'treino' },
  { id: '6', src: gallery6, alt: 'Grupo na academia', category: 'turma' },
  { id: '7', src: gallery7, alt: 'Demonstração de joelhada', category: 'tecnica' },
]
