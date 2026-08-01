/**
 * Snapshot de regressão visual: renderiza a app no servidor e grava
 * o DOM + todo o CSS gerado pelo styled-components em um arquivo.
 *
 * Uso: node scripts/snapshot.mjs <arquivo-de-saida>
 *
 * Serve para comparar o resultado antes/depois de um refactor. As classes
 * geradas pelo styled-components mudam a cada build, então o diff deve ser
 * feito com os nomes de classe normalizados (ver scripts/snapshot-diff.mjs).
 */
import fs from 'node:fs'
import { createServer } from 'vite'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const out = process.argv[2]
if (!out) {
  console.error('uso: node scripts/snapshot.mjs <arquivo-de-saida>')
  process.exit(1)
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
  // styled-components precisa passar pelo Vite para que a app e este script
  // compartilhem a mesma instância — senão o ServerStyleSheet não coleta nada.
  ssr: { noExternal: ['styled-components'] },
})

try {
  const { ServerStyleSheet, ThemeProvider } = await vite.ssrLoadModule('styled-components')
  // Renderiza o que a rota `/` renderiza, e não `<App />`: desde que o portal
  // entrou, `App` monta o RouterProvider, que depende de histórico do navegador
  // e não faz sentido em SSR. O alvo desta comparação é a home institucional.
  const { AppLayout } = await vite.ssrLoadModule('/src/layouts/AppLayout.tsx')
  const { Home } = await vite.ssrLoadModule('/src/pages/Home.tsx')
  const { theme } = await vite.ssrLoadModule('/src/styles/theme.ts')
  const { GlobalStyle } = await vite.ssrLoadModule('/src/styles/GlobalStyle.ts')

  const sheet = new ServerStyleSheet()
  const html = renderToStaticMarkup(
    sheet.collectStyles(
      React.createElement(
        ThemeProvider,
        { theme },
        React.createElement(GlobalStyle),
        React.createElement(AppLayout, null, React.createElement(Home)),
      ),
    ),
  )
  const css = sheet.instance.toString()
  sheet.seal()

  fs.writeFileSync(out, `${html}\n\n/* ===== CSS ===== */\n${css}\n`)
  console.log(`snapshot gravado em ${out} (${html.length} bytes de DOM, ${css.length} de CSS)`)
} finally {
  await vite.close()
}
