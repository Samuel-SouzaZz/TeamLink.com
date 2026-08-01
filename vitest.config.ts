import { defineConfig } from 'vitest/config'

/**
 * Configuração separada da do Vite de produção, de propósito: o build do site
 * não deve carregar nada de teste.
 *
 * Ambiente `node` porque os testes desta suíte são de lógica pura — leitura de
 * claims e decisão de rota. O que depende de banco (RLS) é testado em pgTAP,
 * onde dá para exercitar as políticas de verdade.
 */
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
