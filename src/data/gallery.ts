/**
 * Galeria — auto-descoberta de imagens via import.meta.glob.
 *
 * Para adicionar fotos: basta jogar o arquivo em src/assets/gallery/
 * Extensões suportadas: jpg, jpeg, png, webp
 * Reinicie o servidor dev (npm run dev) após adicionar novas fotos.
 */
import type { GalleryItem } from '../types/gallery'

const modules = import.meta.glob<{ default: string }>(
  '../assets/gallery/*.{jpg,jpeg,png,webp}',
  { eager: true },
)

export const galleryItems: GalleryItem[] = Object.entries(modules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, mod], index) => ({
    id: String(index + 1),
    src: mod.default,
    alt: `Foto ${index + 1} — treino de Muay Thai na Team Link`,
    category: 'treino' as const,
  }))
