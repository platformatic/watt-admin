import { join, resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const envDir = join(__dirname, '..', '..')
// https://vitejs.dev/config/
export default defineConfig({
  envDir,
  plugins: [react()],
  build: {
    sourcemap: true
  },
  server: {
    host: '127.0.0.1'
  }
})