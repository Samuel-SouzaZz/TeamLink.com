import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'styled-components', '@radix-ui/react-dialog'],
          icons: ['lucide-react'],
          // Separado do código da aplicação para que um deploy de rotina não
          // invalide o cache do roteador, que quase nunca muda.
          router: ['react-router-dom'],
          // Só é baixado nas rotas do portal — nomeado aqui para o chunk ter
          // um nome estável e reconhecível no relatório de build.
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
})
