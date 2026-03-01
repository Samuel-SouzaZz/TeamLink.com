import { useState } from 'react'
import styled from 'styled-components'
import type { GalleryItem } from '../types/gallery'
import { galleryItems } from '../data/gallery'
import { LightboxModal } from '../components/LightboxModal'
import { Container } from '../components/ui/Container'
import { SectionTitle } from '../components/ui/SectionTitle'

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
`

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin: 0;
  padding: 0;
  list-style: none;
  @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(4, 1fr); }
`

const GridItem = styled.li``

const ImageButton = styled.button`
  display: block;
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0;
  cursor: pointer;
  position: relative;
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.brand}; outline-offset: 2px; }
`

const ImageInner = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
`

const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  ${ImageButton}:hover & {
    transform: scale(1.1);
  }
  @media (prefers-reduced-motion: reduce) {
    ${ImageButton}:hover & {
      transform: none;
    }
  }
`

const Overlay = styled.span`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s;
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  ${ImageButton}:hover & { opacity: 1; }
`

export function GallerySection() {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)

  return (
    <Section id="galeria" aria-labelledby="gallery-heading">
      <Container>
        <SectionTitle title="Galeria" id="gallery-heading" />
        <Grid>
          {galleryItems.map((item) => (
            <GridItem key={item.id}>
              <ImageButton type="button" onClick={() => setLightboxItem(item)}>
                <ImageInner>
                  <Thumb
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    width={400}
                    height={300}
                  />
                  <Overlay aria-hidden />
                </ImageInner>
              </ImageButton>
            </GridItem>
          ))}
        </Grid>
      </Container>
      <LightboxModal item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </Section>
  )
}
