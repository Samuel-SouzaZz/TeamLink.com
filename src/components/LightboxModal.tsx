import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import type { GalleryItem } from '../types/gallery'
import { Modal } from './ui/Modal'
import { X } from 'lucide-react'

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: min(96vw, 72rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  @media (min-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const ImageCard = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  @media (min-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const StyledImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 82vh;
  max-height: 82dvh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  @media (min-width: 768px) {
    max-height: 88vh;
    max-height: 88dvh;
  }
`

const Caption = styled.p`
  margin: ${({ theme }) => theme.spacing.md} 0 0;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  line-height: 1.4;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.size.base};
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: scale(1.05);
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand};
    outline-offset: 2px;
  }
`

export interface LightboxModalProps {
  item: GalleryItem | null
  onClose: () => void
}

export function LightboxModal({ item, onClose }: LightboxModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (item) closeRef.current?.focus()
  }, [item])

  return (
    <Modal
      isOpen={!!item}
      onClose={onClose}
      aria-label="Visualização da imagem da galeria"
    >
      {item && (
        <ImageWrapper>
          <ImageCard>
            <CloseButton
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Fechar"
            >
              <X size={22} strokeWidth={2.5} aria-hidden />
            </CloseButton>
            <StyledImage
              src={item.srcFull ?? item.src}
              alt={item.alt}
              draggable={false}
            />
          </ImageCard>
          <Caption>{item.alt}</Caption>
        </ImageWrapper>
      )}
    </Modal>
  )
}
