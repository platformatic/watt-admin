import { createViteConfig } from '@platformatic/vite'

export default createViteConfig({
  application: { basePath: '/', commands: { build: 'vite build' } },
  ssr: false
})
