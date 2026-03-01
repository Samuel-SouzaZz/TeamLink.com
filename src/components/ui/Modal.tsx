import { useEffect, useState, type ReactNode } from 'react'
import styled from 'styled-components'

const Overlay = styled.div<{ $mounted: boolean }>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  background: ${({ theme }) => theme.colors.overlay};
  opacity: ${({ $mounted }) => ($mounted ? 1 : 0)};
  transition: opacity 0.3s ease;
`

const Content = styled.div<{ $mounted: boolean }>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay + 1};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  pointer-events: none;
  overflow: hidden;
`

const ContentInner = styled.div`
  pointer-events: auto;
  max-height: 100vh;
  max-height: 100dvh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  'aria-label': string
  children: ReactNode
}

export function Modal({ isOpen, onClose, 'aria-label': ariaLabel, children }: ModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      const prevHtml = document.documentElement.style.overflow
      const prevBody = document.body.style.overflow
      const prevBodyPosition = document.body.style.position
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      const raf = requestAnimationFrame(() => setMounted(true))
      return () => {
        cancelAnimationFrame(raf)
        document.documentElement.style.overflow = prevHtml
        document.body.style.overflow = prevBody
        document.body.style.position = prevBodyPosition
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        window.scrollTo(0, scrollY)
      }
    }
    setMounted(false)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <>
      <Overlay $mounted={mounted} role="presentation" onClick={onClose} aria-hidden />
      <Content $mounted={mounted} onClick={handleBackdrop} role="dialog" aria-modal="true" aria-label={ariaLabel}>
        <ContentInner onClick={(e) => e.stopPropagation()}>{children}</ContentInner>
      </Content>
    </>
  )
}
