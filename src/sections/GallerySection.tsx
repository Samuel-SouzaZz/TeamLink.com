import { useState, lazy, Suspense } from 'react'
import styled from 'styled-components'

import { Container, SectionTitle } from '../components/ui'
import { galleryItems } from '../data/gallery'

const LightboxModal = lazy(() =>
  import('../components/LightboxModal').then((m) => ({ default: m.LightboxModal }))
)

const Section = styled.section`
  padding: 40px 16px;
  background-color: ${({ theme }) => theme.colors.background};

  @media (min-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const GridItem = styled.li``

const ImageButton = styled.button`
  display: block;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0;
  cursor: pointer;
  position: relative;

  @media (min-width: 768px) {
    aspect-ratio: 4/3;
    border-radius: ${({ theme }) => theme.radius.lg};
  }

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
  @media (prefers-reduced-motion: reduce) { transition: none; }
  ${ImageButton}:hover & { transform: scale(1.07); }
  @media (prefers-reduced-motion: reduce) {
    ${ImageButton}:hover & { transform: none; }
  }
`

const ThumbOverlay = styled.span`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  opacity: 0;
  transition: opacity 0.25s;
  @media (prefers-reduced-motion: reduce) { transition: none; }
  ${ImageButton}:hover & { opacity: 1; }
`

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  return (
    <Section id="galeria" aria-labelledby="gallery-heading">
      <Container>
        <SectionTitle title="Galeria" id="gallery-heading" />
        <Grid>
          {galleryItems.map((item, idx) => (
            <GridItem key={item.id}>
              <ImageButton
                type="button"
                aria-label={`Abrir foto: ${item.alt}`}
                onClick={() => setLightboxIndex(idx)}
              >
                <ImageInner>
                  <Thumb src={item.src} alt={item.alt} loading="lazy" decoding="async" width={400} height={400} />
                  <ThumbOverlay aria-hidden />
                </ImageInner>
              </ImageButton>
            </GridItem>
          ))}
        </Grid>
      </Container>

      {lightboxIndex >= 0 && (
        <Suspense fallback={null}>
          <LightboxModal
            index={lightboxIndex}
            allItems={galleryItems}
            onClose={() => setLightboxIndex(-1)}
          />
        </Suspense>
      )}
    </Section>
  )
}
