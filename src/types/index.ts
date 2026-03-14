export interface NavItem {
  label: string
  href: string
}

export interface Link {
  label: string
  href: string
  ariaLabel?: string
}

export interface Testimonial {
  id: string
  name: string
  since?: string
  text: string
  rating: number
}
