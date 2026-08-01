import { Suspense, type ReactNode } from 'react'

import { LoadingState } from '../components/portal'

/**
 * Fronteira de carregamento de uma rota preguiçosa.
 *
 * Cada tela tem a sua, e não uma única no topo: assim o esqueleto aparece só na
 * área de conteúdo, e o cabeçalho e a navegação inferior continuam na tela
 * durante a troca de página.
 */
export function Loadable({ children }: { children: ReactNode }) {
  return <Suspense fallback={<LoadingState rows={4} />}>{children}</Suspense>
}
