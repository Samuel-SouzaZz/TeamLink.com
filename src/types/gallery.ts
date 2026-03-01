/**
 * Types da galeria — categoria como union type
 */

export type GalleryCategory = 'treino' | 'turma' | 'tecnica' | 'sparring'

export interface GalleryItem {
  id: string
  src: string
  alt: string
  category: GalleryCategory
  /** Opcional: URL da imagem em alta resolução para o lightbox */
  srcFull?: string
}
