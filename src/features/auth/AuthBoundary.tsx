import { Outlet } from 'react-router-dom'

import { AuthProvider } from './AuthProvider'

/**
 * Fronteira de autenticação do portal.
 *
 * Existe para que o `AuthProvider` — e, com ele, o `@supabase/supabase-js` que
 * ele importa — fique fora do caminho de quem abre só o site institucional.
 * Envolvendo a aplicação inteira, o cliente do Supabase acabaria no chunk
 * inicial e o visitante pagaria o download de um sistema que não vai usar.
 *
 * Como esta rota é carregada com `lazy()`, nada disso é baixado antes de
 * alguém tocar em `/login`, `/app` ou `/admin`.
 */
export default function AuthBoundary() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
