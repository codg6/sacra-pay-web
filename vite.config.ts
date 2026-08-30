import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// Configuração do Vite (equivalente ao angular.json, mas bem mais enxuto)
export default defineConfig({
  plugins: [
    react(),       // habilita suporte a JSX/React
    tailwindcss(), // habilita o Tailwind direto no build, sem PostCSS manual
  ],
  resolve: {
    alias: {
      // Permite importar com "@/algo" em vez de "../../../algo"
      // Isso é PADRÃO em projetos shadcn — evita imports relativos longos e confusos
      // "@": path.resolve(__dirname, "./src"),
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
})