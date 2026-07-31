import styled from 'styled-components'
import { WhatsAppIcon } from './icons'
import { openExternal } from '../lib/browser'
import { focusRing } from '../styles/mixins'
import { links } from '../data/site'

const CtaButton = styled.button`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: ${({ theme }) => theme.zIndex.cta};
  width: 2.75rem;
  height: 2.75rem;
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => theme.colors.whatsapp};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: background-color 0.2s, transform 0.2s;

  @media (min-width: 768px) {
    bottom: ${({ theme }) => theme.spacing.lg};
    right: ${({ theme }) => theme.spacing.lg};
    width: 3.5rem;
    height: 3.5rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.whatsappHover};
    transform: scale(1.05);
  }
  ${focusRing('whatsapp')}
`

export function CtaWhatsApp() {
  const handleClick = () => openExternal(links.whatsapp.href)

  return (
    <CtaButton type="button" onClick={handleClick} aria-label={links.whatsapp.ariaLabel}>
      <WhatsAppIcon size={22} />
    </CtaButton>
  )
}
