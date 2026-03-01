# Deploy — Karol Muay Thai

## Comandos locais

```bash
npm run dev     # Desenvolvimento (http://localhost:5173)
npm run build   # Build de produção → pasta dist/
npm run preview # Servir dist/ localmente para testar
```

## Deploy (Vercel ou Netlify)

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Variáveis de ambiente:** nenhuma obrigatória (site estático, sem backend).

### React Router (SPA)

- **Vercel:** o template de Vite/React já usa fallback para `index.html`; rotas como `/sobre` e `/contato` funcionam.
- **Netlify:** o arquivo `public/_redirects` já está configurado: `/* /index.html 200`. Copiado para `dist` no build.

## SEO e Open Graph

- As metas (title, description, og:*, twitter:card) estão em `index.html`.
- **Imagem de compartilhamento:** coloque uma imagem em **`public/og.jpg`** (recomendado: 1200×630 px). Assim o link do site terá preview em redes sociais e mensageiros.

## Checklist antes do deploy

- [ ] Trocar placeholders em `src/assets/hero/` e `src/assets/gallery/` pelas fotos reais (ver `src/assets/README.md`).
- [ ] Adicionar `public/og.jpg` para preview em redes sociais.
- [ ] Atualizar número do WhatsApp e @ do Instagram em `src/data/site.ts`.
- [ ] Rodar `npm run build` e `npm run preview` para testar.
