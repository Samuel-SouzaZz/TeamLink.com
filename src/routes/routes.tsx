import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

import { AppLayout } from '../layouts/AppLayout'
import { Home } from '../pages/Home'
import { RequireAuth, RequireRole } from './guards'
import { Loadable } from './Loadable'

/**
 * Tabela de rotas.
 *
 * Separada de `createBrowserRouter` para poder ser verificada sem navegador —
 * ver `routes.test.ts`.
 *
 * O site institucional é carregado de forma síncrona: é o que quase toda visita
 * abre, e ele já foi otimizado para LCP. Todo o resto pende de `AuthBoundary`,
 * uma rota sem caminho próprio carregada com `lazy()`. É ela que traz o
 * `AuthProvider` e, por tabela, o `@supabase/supabase-js` — nada disso entra no
 * chunk inicial de quem só quer ver a página da Karol.
 */

const AuthBoundary = lazy(() => import('../features/auth/AuthBoundary'))

const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'))
const ActivateSubscriptionPage = lazy(
  () => import('../features/auth/pages/ActivateSubscriptionPage'),
)
const RecoverPasswordPage = lazy(() => import('../features/auth/pages/RecoverPasswordPage'))

const StudentLayout = lazy(() =>
  import('../layouts/StudentLayout').then((m) => ({ default: m.StudentLayout })),
)
const StudentHomePage = lazy(() => import('../features/booking/pages/StudentHomePage'))
const BookingPage = lazy(() => import('../features/booking/pages/BookingPage'))
const StudentHistoryPage = lazy(() => import('../features/booking/pages/StudentHistoryPage'))
const StudentProfilePage = lazy(() => import('../features/students/pages/StudentProfilePage'))

const AdminLayout = lazy(() =>
  import('../layouts/AdminLayout').then((m) => ({ default: m.AdminLayout })),
)
const AdminHomePage = lazy(() => import('../features/admin/pages/AdminHomePage'))
const AdminSchedulePage = lazy(() => import('../features/admin/pages/AdminSchedulePage'))
const StudentsListPage = lazy(() => import('../features/students/pages/StudentsListPage'))
const StudentDetailPage = lazy(() => import('../features/students/pages/StudentDetailPage'))
const PlansPage = lazy(() => import('../features/subscriptions/pages/PlansPage'))
const AdminMorePage = lazy(() => import('../features/admin/pages/AdminMorePage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

export const routes: RouteObject[] = [
  {
    id: 'institucional',
    path: '/',
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    ),
  },

  {
    // Rota sem caminho: agrupa tudo que precisa de sessão sem prefixar a URL.
    id: 'portal',
    element: (
      <Loadable>
        <AuthBoundary />
      </Loadable>
    ),
    children: [
      /* ── Área pública do portal ─────────────────────────────────────── */
      { id: 'login', path: 'login', element: <Loadable><LoginPage /></Loadable> },
      { id: 'ativar', path: 'ativar', element: <Loadable><ActivateSubscriptionPage /></Loadable> },
      {
        id: 'recuperar-senha',
        path: 'recuperar-senha',
        element: <Loadable><RecoverPasswordPage /></Loadable>,
      },

      /* ── Portal da aluna ────────────────────────────────────────────── */
      {
        id: 'aluna',
        path: 'app',
        element: (
          <Loadable>
            <RequireAuth>
              <RequireRole role="student">
                <StudentLayout />
              </RequireRole>
            </RequireAuth>
          </Loadable>
        ),
        children: [
          { id: 'aluna-inicio', index: true, element: <Loadable><StudentHomePage /></Loadable> },
          { id: 'aluna-agendar', path: 'agendar', element: <Loadable><BookingPage /></Loadable> },
          {
            id: 'aluna-historico',
            path: 'historico',
            element: <Loadable><StudentHistoryPage /></Loadable>,
          },
          {
            id: 'aluna-perfil',
            path: 'perfil',
            element: <Loadable><StudentProfilePage /></Loadable>,
          },
        ],
      },

      /* ── Painel da Karol ────────────────────────────────────────────── */
      {
        id: 'admin',
        path: 'admin',
        element: (
          <Loadable>
            <RequireAuth>
              <RequireRole role="admin">
                <AdminLayout />
              </RequireRole>
            </RequireAuth>
          </Loadable>
        ),
        children: [
          { id: 'admin-inicio', index: true, element: <Loadable><AdminHomePage /></Loadable> },
          {
            id: 'admin-agenda',
            path: 'agenda',
            element: <Loadable><AdminSchedulePage /></Loadable>,
          },
          {
            id: 'admin-alunas',
            path: 'alunas',
            element: <Loadable><StudentsListPage /></Loadable>,
          },
          {
            id: 'admin-ficha',
            path: 'alunas/:studentId',
            element: <Loadable><StudentDetailPage /></Loadable>,
          },
          { id: 'admin-planos', path: 'planos', element: <Loadable><PlansPage /></Loadable> },
          { id: 'admin-mais', path: 'mais', element: <Loadable><AdminMorePage /></Loadable> },
        ],
      },

      { id: 'nao-encontrada', path: '*', element: <Loadable><NotFoundPage /></Loadable> },
    ],
  },
]
