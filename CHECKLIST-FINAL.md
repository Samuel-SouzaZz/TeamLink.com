# Checklist final — Migração styled-components e remoção do Tailwind

## A) Varredura

### Resultado da busca em `src/`

- **`className=`**  
  Encontrado apenas em:
  - `src/components/ui/Button.tsx` — `className={clsx(className)}`: prop opcional para o consumidor (não são classes Tailwind).
  - `src/components/ui/Card.tsx` — `className={className}` em `CardBox`: prop opcional (não são classes Tailwind).

- **`tailwind`**  
  Encontrado apenas em:
  - `src/styles/globals.css` — linha 1: `@import "tailwindcss";`

- **`@apply` / `@layer`**  
  Apenas em `src/styles/globals.css` (diretivas Tailwind no base).

Nenhum componente em `src/` usa classes utilitárias Tailwind (flex, grid, px-, bg-, etc.). O único uso real do Tailwind é o arquivo de estilos globais.

---

## 1) Lista final: arquivos ainda com Tailwind

| Arquivo | Motivo |
|--------|--------|
| **`src/styles/globals.css`** | Contém `@import "tailwindcss"`, `@theme { ... }` e `@layer base { ... }` com `@apply`. É o único arquivo que depende do Tailwind. |

**Resumo:** Nenhum outro arquivo em `src/` usa Tailwind. Layout, About e Contact estão 100% em styled-components. Home, Navbar, Footer, CtaWhatsApp, GallerySection, CategoryFilter, LightboxModal e componentes em `ui/` também usam apenas styled-components (ou CSS-in-JS). Os `className` em Button e Card são API opcional, não Tailwind.

---

## 2) Confirmações — 100% styled-components

| Arquivo | Status |
|--------|--------|
| **`src/layouts/AppLayout.tsx`** | ✅ Sem `className` / sem Tailwind. Usa `LayoutRoot` e `Main` com `theme.layout.navbarHeight`. |
| **`src/pages/About.tsx`** | ✅ Sem `className` / sem Tailwind. Constantes no topo, wrappers styled no próprio arquivo. |
| **`src/pages/Contact.tsx`** | ✅ Sem `className` / sem Tailwind. Mesmo padrão da About. |

---

## 3) Passos para remover o Tailwind com segurança

Só execute quando não houver mais dependência do Tailwind (hoje só `globals.css`).

### 1. Ajustar `src/styles/globals.css`

- Remover a linha: `@import "tailwindcss";`
- Remover o bloco `@theme { ... }` (as variáveis já estão em `src/styles/theme.ts` e no GlobalStyle).
- Substituir o `@layer base` por estilos equivalentes sem Tailwind, por exemplo:

```css
/* src/styles/globals.css — após remover Tailwind */
html {
  scroll-behavior: smooth;
}
body {
  margin: 0;
  background-color: #0a0a0a;
  color: #fafafa;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

(Opcional: se o `GlobalStyle` do styled-components já definir `body` e `html`, você pode deixar `globals.css` vazio ou só com comentário.)

### 2. Remover o plugin do Vite

Em **`vite.config.ts`**:

- Apagar o import: `import tailwindcss from '@tailwindcss/vite'`
- Apagar `tailwindcss()` do array `plugins`.

### 3. Desinstalar dependências

```bash
npm uninstall tailwindcss @tailwindcss/vite
```

### 4. Verificação final

- Buscar em `src/` por: `@import "tailwindcss"`, `@apply`, `@layer` → não deve haver resultados.
- Rodar `npm run build` e `npm run dev` e conferir se a UI e o tema dark continuam corretos.

---

## 4) Checklist de teste final

Use este checklist após qualquer mudança (incluindo a remoção do Tailwind).

### Rotas

- [ ] `/` — Home carrega (Hero, Sobre, Turma, Galeria, Depoimentos, CTA).
- [ ] `/sobre` — About carrega (cabeçalho, História, Valores, Para quem é, CTA).
- [ ] `/contato` — Contact carrega (cabeçalho, 3 cards, CTA).
- [ ] Links do menu (Início, Sobre, Contato) e logo levam às rotas corretas.

### WhatsApp

- [ ] Navbar (desktop): “Agendar aula” abre o WhatsApp.
- [ ] Navbar (mobile/drawer): “Agendar aula” no drawer abre o WhatsApp.
- [ ] CTA flutuante (botão verde) abre o WhatsApp.
- [ ] Home: “Falar no WhatsApp” abre o WhatsApp.
- [ ] About: “Agendar aula experimental” abre o WhatsApp com a mensagem combinada.
- [ ] Contact: “Abrir WhatsApp” no card e “Agendar aula experimental” no CTA abrem o WhatsApp com as mensagens corretas.

### Instagram

- [ ] Footer: link Instagram abre em nova aba.
- [ ] Contact: “Abrir Instagram” no card abre em nova aba.

### Modal e menu

- [ ] Galeria: clique em uma imagem abre o lightbox; fechar por X, clique fora e ESC.
- [ ] Menu mobile: botão ☰ abre o drawer; fechar por overlay, X, link ou ESC; scroll do body trava com menu aberto.

### Build e lint

- [ ] `npm run build` — termina sem erros.
- [ ] `npm run dev` — app sobe; navegação e estilos ok.
- [ ] (Opcional) `npm run lint` — sem erros que impeçam o uso.

---

## 5) Melhorias já aplicadas

- **Altura da Navbar no theme**  
  Em `src/styles/theme.ts` foi adicionado `layout.navbarHeight: '3.5rem'`.  
  Em `src/layouts/AppLayout.tsx`, o `Main` usa `padding-top: ${({ theme }) => theme.layout.navbarHeight}` para não ficar atrás da navbar fixa.

- **Tokens do tema**  
  Cores e espaçamentos já estão centralizados em `theme.ts` (brand, background, surface, text, muted, border, etc.) e usados nos componentes.

### Opcional (não feito neste passo)

- **Alias `@` para imports**  
  No Vite: `resolve.alias: { '@': path.resolve(__dirname, 'src') }`.  
  No TypeScript: `"paths": { "@/*": ["./src/*"] }`.  
  Assim dá para usar `import { Button } from '@/components/ui/Button'` em vez de `../components/ui/Button`.

---

## Resumo

- **Arquivos ainda com Tailwind:** apenas **`src/styles/globals.css`**.
- **AppLayout, About e Contact:** 100% styled-components, sem Tailwind.
- **Remoção do Tailwind:** seguir a seção 3 (globals.css → vite.config → `npm uninstall` → validar build/dev).
- **Validação:** usar a seção 4 (rotas, WhatsApp, Instagram, modal, menu, build e, se quiser, lint).
