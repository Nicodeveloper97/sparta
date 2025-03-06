import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs', // Asegúrate de que se esté utilizando el archivo correcto de configuración de PostCSS
  },
})
