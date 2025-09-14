import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Configura el base path para GitHub Pages desde la raíz
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})