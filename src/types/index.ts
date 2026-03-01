/**
 * Model / Types layer — DTOs e interfaces do domínio
 */

export interface NavItem {
  label: string
  href: string
}

export interface Link {
  label: string
  href: string
  ariaLabel?: string
}

export interface GalleryItem {
  id: string
  src: string
  alt: string
  category: string
  title?: string
}

export interface Testimonial {
  id: string
  name: string
  role?: string
  text: string
  avatar?: string
}
