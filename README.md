# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

---

## Galeria — Trocar placeholders por fotos reais

### 1. Onde ficam as imagens

- **Opção A – Pasta `public`**  
  Coloque as fotos em `public/galeria/` (ex.: `public/galeria/treino-1.jpg`).  
  No código use: `src: '/galeria/treino-1.jpg'`.

- **Opção B – Import no código (recomendado para otimização)**  
  Coloque as fotos em `src/assets/galeria/` e importe em `src/data/gallery.ts`:

```ts
// src/data/gallery.ts
import type { GalleryItem } from '../types/gallery'
import treino1 from '../assets/galeria/treino-1.jpg'
import turma1 from '../assets/galeria/turma-1.jpg'

export const galleryItems: GalleryItem[] = [
  { id: '1', src: treino1, alt: 'Treino de Muay Thai', category: 'treino' },
  // ...
]
```

No Vite, `import img from './foto.jpg'` devolve a URL pública da imagem após o build.

### 2. Checklist

- [ ] Criar pasta `src/assets/galeria/` (ou `public/galeria/`) e colar as fotos.
- [ ] Renomear arquivos de forma consistente (ex.: `treino-1.jpg`, `turma-2.jpg`).
- [ ] Em `src/data/gallery.ts`, trocar cada placeholder por import ou por path `/galeria/...`.
- [ ] Ajustar `alt` de cada item para descrever a imagem (acessibilidade e SEO).
- [ ] Manter `category` em cada item como `'treino' | 'turma' | 'tecnica' | 'sparring'`.
- [ ] Para lightbox em alta resolução: usar a mesma URL ou uma segunda URL (ex.: `srcFull`) no type e no modal.
- [ ] Rodar `npm run build` e testar a galeria e o lightbox.

---

## Design system + styled-components

### Comandos de instalação (já executados)

```bash
npm install styled-components lucide-react clsx
npm install -D @types/styled-components
```

### Estrutura de estilos

- **`src/styles/theme.ts`** — Cores, spacing, radius, typography, zIndex.
- **`src/styles/GlobalStyle.ts`** — `createGlobalStyle` (reset + body).
- **`src/styles/styled.d.ts`** — Extensão do `DefaultTheme` para TypeScript.
- **`src/components/ui/`** — Container, Button, SectionTitle, Card, Modal (todos com styled-components).

O app está envolvido em `ThemeProvider` e `GlobalStyle` em `main.tsx`. O Tailwind continua em `globals.css` para migração gradual.

### Checklist de validação

- [ ] **Dev:** `npm run dev` — abrir o site, testar Navbar (desktop + menu mobile), Footer, CTA WhatsApp, Galeria (filtro + lightbox), CTA final da Home.
- [ ] **Build:** `npm run build` — deve concluir sem erros.
- [ ] **Acessibilidade:** Menu mobile (ESC, overlay, foco no fechar); Lightbox (ESC, clique fora, foco no fechar).

### Migração gradual Tailwind → styled-components

1. **Já migrados:** Navbar, Footer, CtaWhatsApp, CategoryFilter, GallerySection, LightboxModal (Modal base), Home (seções com styled + Button).
2. **Próximos passos:** Trocar o restante das páginas para usar apenas `ui/` e styled-components, removendo classes Tailwind.
3. **Remover Tailwind quando:** Não houver mais `className` com Tailwind; então remover `tailwindcss`, `@tailwindcss/vite` e o `@import "tailwindcss"` de `globals.css`.
