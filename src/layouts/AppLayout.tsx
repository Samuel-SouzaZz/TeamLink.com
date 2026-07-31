import type { ReactNode } from 'react'
import styled from 'styled-components'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { CtaWhatsApp } from '../components/CtaWhatsApp'

const LayoutRoot = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
`

const Main = styled.main`
  flex: 1;
  padding-top: ${({ theme }) => theme.layout.navbarHeight};
`

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutRoot>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
      <CtaWhatsApp />
    </LayoutRoot>
  )
}
