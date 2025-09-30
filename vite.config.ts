import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  // Para desarrollo local, usar '/' como base
  // Para GitHub Pages, usar '/nanosynth-website/' como base
  const base = process.env.NODE_ENV === 'production' && process.env.VITE_BASE_URL 
    ? process.env.VITE_BASE_URL 
    : '/'

  return {
    plugins: [react()],
    base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
  }
})