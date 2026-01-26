import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild', // WICHTIG: esbuild statt terser verwenden
    outDir: 'dist'
  }
})
