import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    port: 5174, 
  },
  root: './frontend',
  build: {
    outDir: '../dist', 
    emptyOutDir: true
  },
  publicDir: './public', 
  plugins: [react()]
})