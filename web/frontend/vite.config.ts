import { join } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

const __dirname = import.meta.dirname

// https://vitejs.dev/config/
export default defineConfig({
  envDir: join(__dirname, '..', '..'),
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    target: 'esnext',
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 100000000,
    sourcemap: 'inline'
  },
  server: {
    host: '127.0.0.1'
  }
})
