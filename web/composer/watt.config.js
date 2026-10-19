import { createGatewayConfig } from '@platformatic/gateway'

export default createGatewayConfig({
  server: { hostname: '127.0.0.1', port: Number(process.env.WATT_ADMIN_PORT || 4042) },
  applications: [
    {
      id: 'backend',
      openapi: { url: '/documentation/json', prefix: '/api' },
      proxy: { ws: {}, prefix: '/api' }
    },
    { id: 'frontend', proxy: { prefix: '/' } }
  ],
  refreshTimeout: 1000,
  watch: true
})
