import { defineConfig, devices } from '@playwright/test'

const PORT = process.env.WATT_ADMIN_PORT || '5042'
const baseURL = `http://127.0.0.1:${PORT}`
const timeout = 60000

export default defineConfig({
  testDir: './test/e2e',
  fullyParallel: true,
  reporter: 'html',
  use: { baseURL, trace: 'on-first-retry' },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'cd ../.. && npm run clean && npm run build && npm run start',
    url: baseURL,
    timeout,
    stdout: 'pipe',
    stderr: 'pipe',
    env: { WATT_ADMIN_PORT: PORT, INCLUDE_ADMIN: '1', CI: '1' }
  },
  timeout
})
