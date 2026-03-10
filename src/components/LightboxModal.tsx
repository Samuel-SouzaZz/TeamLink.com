/**
 * LightboxModal — Yet Another React Lightbox com plugins:
 *   Counter   (ex.: "3 / 7")
 *   Captions  (legenda via slide.description)
 *   Thumbnails (faixa de miniaturas na base)
 *
 * Estilo: variáveis CSS do YARL sobrescritas para o tema dark premium do site.
 * Não usa Tailwind; customizações via createGlobalStyle (styled-components).
 */
import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

import { createGlobalStyle } from 'styled-components'
import type { GalleryItem } from '../types/gallery'

/* ── Overrides de CSS (variáveis do YARL) ───────────────────────────── */
const YarlTheme = createGlobalStyle`
  /* Fundo escuro sofisticado */
  :root {
    --yarl__color_backdrop: rgba(0, 0, 0, 0.94);

    /* Botões */
    --yarl__button_filter: none;
    --yarl__color_button: rgba(255, 255, 255, 0.82);
    --yarl__color_button_active: #ffffff;
    --yarl__color_button_disabled: rgba(255, 255, 255, 0.22);

    /* Slide sem padding excessivo */
    --yarl__slide_captions_container_background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.72) 0%,
      transparent 100%
    );

    /* Counter */
    --yarl__counter_filter: none;
  }

  /* ── Backdrop / portal ─────────────────────────────────────────── */
  .yarl__root {
    background: var(--yarl__color_backdrop);
    backdrop-filter: blur(4px);
  }

  /* ── Imagem centralizada, sem borda visível ─────────────────────── */
  .yarl__slide_image {
    border-radius: 6px;
    max-height: 88dvh;
    object-fit: contain;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.55);
  }

  /* Remove a borda pesada padrão ao redor do slide */
  .yarl__slide {
    padding: 2rem 3.5rem;
  }
  @media (max-width: 640px) {
    .yarl__slide {
      padding: 0.75rem 0;
    }
  }

  /* ── Botões modernos ────────────────────────────────────────────── */
  .yarl__button {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(8px);
    transition: background 0.2s, transform 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.16);
      transform: scale(1.07);
    }
    &:focus-visible {
      outline: 2px solid #b91c1c;
      outline-offset: 2px;
    }
  }

  /* Botão fechar — canto superior direito, um pouco maior */
  .yarl__button[data-testid="fullscreen"]  { display: none; }

  /* ── Counter ────────────────────────────────────────────────────── */
  .yarl__counter {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: rgba(255, 255, 255, 0.85);
    background: rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: 9999px;
    padding: 3px 12px;
    backdrop-filter: blur(6px);
    pointer-events: none;
  }

  /* ── Captions ───────────────────────────────────────────────────── */
  .yarl__captions_container {
    padding: 0.5rem 1.25rem 1rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.78);
    line-height: 1.5;
    text-align: center;
  }

  /* ── Thumbnails ─────────────────────────────────────────────────── */
  .yarl__thumbnails_container {
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(8px);
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    padding: 6px 0 8px;
  }

  .yarl__thumbnails_thumbnail {
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.10);
    opacity: 0.52;
    transition: opacity 0.2s, border-color 0.2s;
    overflow: hidden;
  }
  .yarl__thumbnails_thumbnail:hover {
    opacity: 0.8;
  }
  .yarl__thumbnails_thumbnail_active {
    border-color: #b91c1c !important;
    opacity: 1;
    box-shadow: 0 0 0 2px rgba(185, 28, 28, 0.38);
  }
`

/* ── Conversão para o formato de slides do YARL ─────────────────────── */
function toSlides(items: GalleryItem[]) {
  return items.map((item) => ({
    src: item.srcFull ?? item.src,
    description: item.alt,
  }))
}

/* ── Props ──────────────────────────────────────────────────────────── */
export interface LightboxModalProps {
  index: number          // -1 = fechado
  allItems: GalleryItem[]
  onClose: () => void
}

export function LightboxModal({ index, allItems, onClose }: LightboxModalProps) {
  const slides = toSlides(allItems)

  return (
    <>
      <YarlTheme />
      <Lightbox
        open={index >= 0}
        index={index}
        close={onClose}
        slides={slides}
        plugins={[Counter, Captions, Thumbnails]}
        animation={{ fade: 220, swipe: 320 }}
        captions={{ descriptionTextAlign: 'center', showToggle: false }}
        thumbnails={{
          position: 'bottom',
          width: 80,
          height: 56,
          border: 0,
          gap: 8,
          imageFit: 'cover',
          vignette: true,
        }}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: 'transparent' },
          root: { '--yarl__slide_captions_container_padding': '0' },
        }}
      />
    </>
  )
}
