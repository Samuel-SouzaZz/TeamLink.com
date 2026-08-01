import styled from 'styled-components'
import logoUrl from '../../assets/brand/karol-cascelli-logo.png'

/**
 * Logo oficial da Team Link / Karol Cascelli.
 *
 * `emblem` é o uso completo (login e ativação) e `compact` é a versão reduzida
 * dos cabeçalhos.
 *
 * O arquivo é a mesma arte de `src/assets/logo/logo.png`, reamostrada de
 * 1024px para 320px. O original tem 1,86 MB — peso que não se justifica numa
 * tela de login aberta no 4G, sendo que 320px já cobre o maior uso (96px em
 * tela de densidade tripla).
 */
const Image = styled.img<{ $size: number }>`
  width: auto;
  height: ${({ $size }) => $size}px;
  object-fit: contain;
`

export function Logo({ variant = 'compact' }: { variant?: 'emblem' | 'compact' }) {
  const size = variant === 'emblem' ? 96 : 32

  return (
    <Image
      src={logoUrl}
      alt="Team Link — Karol Cascelli"
      $size={size}
      width={size}
      height={size}
      decoding="async"
    />
  )
}
