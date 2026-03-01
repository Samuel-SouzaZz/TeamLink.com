import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { App } from './App'
import { theme } from './styles/theme'
import { GlobalStyle } from './styles/GlobalStyle'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
