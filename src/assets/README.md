# Imagens — Otimização e uso

## Pastas

- **`src/assets/hero/`** — Imagem do banner principal (Hero).
- **`src/assets/gallery/`** — Fotos da galeria (grid + lightbox).

## Arquivos atuais

- **Hero:** `hero.png` (placeholder 1×1). Substitua por sua imagem (ex.: `hero.webp`).
- **Galeria:** `gallery-1.png` … `gallery-8.png` (placeholders). Substitua por fotos reais.

Depois de trocar os arquivos, atualize os imports em:
- `src/assets/hero/index.ts` (ex.: `import heroMain from './hero.webp'`)
- `src/assets/gallery/index.ts` (ex.: `import gallery1 from './gallery-1.webp'`)

## Tamanhos sugeridos

| Uso    | Largura      | Formato |
|--------|--------------|---------|
| Hero   | 1600–1920 px | .webp ou .jpg |
| Galeria| 1000–1200 px | .webp ou .jpg |

## Converter para .webp

- **Online:** use [squoosh.app](https://squoosh.app) (arraste a imagem e exporte como WebP).
- **Linha de comando (Node):** `npx sharp-cli -i foto.jpg -o foto.webp` (se tiver sharp-cli).
- **Ferramentas:** GIMP, Photoshop, XnConvert etc. permitem exportar em WebP.

O Vite faz o build normalmente com `.png`, `.jpg` ou `.webp`; o formato não muda os imports no código.

## Lightbox em alta resolução

Em `src/data/gallery.ts`, cada item pode ter `srcFull` (opcional). Se existir, o lightbox usa `srcFull`; caso contrário usa `src`. Para usar alta resolução, importe uma versão maior em `src/assets/gallery/` (ex.: `gallery-1-full.webp`) e defina `srcFull: gallery1Full` no item.
