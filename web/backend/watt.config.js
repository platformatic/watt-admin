import { createServiceConfig } from '@platformatic/service'

export default createServiceConfig({
  server: { hostname: '127.0.0.1', port: 0 },
  openapi: true,
  watch: true,
  plugins: {
    paths: [
      { path: './plugins', encapsulate: false },
      './routes'
    ]
  }
})
