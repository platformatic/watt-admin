import { join } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

const envDir = join(__dirname, '..', '..')
// https://vitejs.dev/config/
export default defineConfig({
  envDir,
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    target: 'esnext',
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 100000000,
  },
  server: {
    host: '127.0.0.1'
  }
})
