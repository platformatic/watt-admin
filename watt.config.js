export default {
  logger: { level: 'info' },
  metrics: { hostname: '127.0.0.1', port: 0 },
  applications: [
    { id: 'backend', path: './web/backend', nodeOptions: '--import=amaro/strip' },
    { id: 'composer', path: './web/composer' },
    { id: 'frontend', path: './web/frontend' }
  ]
}
