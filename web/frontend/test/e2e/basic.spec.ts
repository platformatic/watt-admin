import { glob } from 'glob'
import path from 'path'
import fs from 'fs/promises'
import { test, expect, type Page } from '@playwright/test'

const __dirname = import.meta.dirname

const sendScalarReq = async (page: Page) => await page.locator('button.scalar-button').filter({ hasText: 'send' }).click()

const closeScalarModal = async (page: Page) => {
  await page.keyboard.press('Escape')
  await page.locator('[class*="_closeButton_"]').click()
}

const getMetricValue = async (page: Page, key: string): Promise<number> => {
  const element = page.locator(`[data-testid="tooltip-value-${key}"]`).first()
  const count = await element.count()
  if (count === 0) {
    return 0
  }
  return parseInt(await element.textContent() || '0')
}

test.describe('Basic E2E tests', () => {
  const metricsPath = path.join(__dirname, '..', '..', 'dist', 'index.html')
  let metricsData: Buffer<ArrayBufferLike>

  test.beforeAll(async () => {
    metricsData = await fs.readFile(metricsPath)
  })
  test.afterAll(async () => {
    await fs.writeFile(metricsPath, metricsData)
    await Promise.all((await glob(path.join(__dirname, '..', '..', 'dist', '*-profile-*.pb'))).map(file => fs.unlink(file)))
  })
  test('should load the main functionalities', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // home
    await expect(page).toHaveTitle(/Watt admin/)
    await expect(page.locator('body')).toBeVisible()
    await expect(page.getByText('@platformatic/watt-admin')).toBeVisible()
    await expect(page.getByText('Metrics')).toBeVisible()
    await expect(page.getByText('Services (3)')).toBeVisible()
    await expect(page.getByText('backend')).toHaveCount(1)
    await expect(page.getByText('frontend')).toHaveCount(1)
    await expect(page.getByText('composer')).toHaveCount(1)
    await expect(page.getByText('gateway')).toHaveCount(1)
    await expect(page.getByText('RUNNING')).toBeVisible()
    await expect(page.getByText('3.15.0')).toBeVisible()
    await expect(page.getByText('http://127.0.0.1:5042')).toBeVisible()

    const metricCharts = page.getByTestId('metric-chart')
    const chartCount = await metricCharts.count()
    expect(chartCount).toBe(7)

    // To have the tooltip, we need to hover on all of the metric charts
    for (let i = 0; i < chartCount; i++) {
      const chart = metricCharts.nth(i)
      const boundingBox = await chart.boundingBox()
      if (boundingBox) {
        await chart.hover({ position: { x: boundingBox.width - 1, y: 1 } })
      }
    }
    expect(await getMetricValue(page, 'connections')).toBeGreaterThanOrEqual(0)
    expect(await getMetricValue(page, 'rps')).toBeGreaterThanOrEqual(0)
    expect(await getMetricValue(page, 'rss')).toBeGreaterThanOrEqual(1)
    expect(await getMetricValue(page, 'total-heap')).toBeGreaterThanOrEqual(1)
    expect(await getMetricValue(page, 'heap-used')).toBeGreaterThanOrEqual(1)
    expect(await getMetricValue(page, 'new-space')).toBeGreaterThanOrEqual(1)
    expect(await getMetricValue(page, 'old-space')).toBeGreaterThanOrEqual(1)
    expect(await getMetricValue(page, 'elu')).toBeGreaterThanOrEqual(1)
    expect(await getMetricValue(page, 'idle')).toBeGreaterThanOrEqual(1)
    expect(await getMetricValue(page, 'open')).toBeGreaterThanOrEqual(1)
    expect(await getMetricValue(page, 'p90')).toBeGreaterThanOrEqual(0)
    expect(await getMetricValue(page, 'p95')).toBeGreaterThanOrEqual(0)
    expect(await getMetricValue(page, 'p99')).toBeGreaterThanOrEqual(0)

    await page.getByText('Record start').click()
    expect(await getMetricValue(page, 'rss')).toBeGreaterThanOrEqual(0)
    expect(await getMetricValue(page, 'total-heap')).toBeGreaterThanOrEqual(0)
    expect(await getMetricValue(page, 'heap-used')).toBeGreaterThanOrEqual(0)
    expect(await getMetricValue(page, 'new-space')).toBeGreaterThanOrEqual(0)
    expect(await getMetricValue(page, 'old-space')).toBeGreaterThanOrEqual(0)
    expect(await getMetricValue(page, 'elu')).toBeGreaterThanOrEqual(0)
    expect(await getMetricValue(page, 'idle')).toBeGreaterThanOrEqual(0)
    expect(await getMetricValue(page, 'open')).toBeGreaterThanOrEqual(0)
    await page.getByText('Record stop').click({ timeout: 1000 })

    await page.waitForLoadState('load') // reload
    await expect(page.getByText('Record start')).toBeVisible()
    await page.getByText('Load').click()
    expect(await getMetricValue(page, 'rss')).toBeGreaterThanOrEqual(0)

    await expect(page.getByText('Live')).toBeVisible()
    await page.getByText('Live').click()
    expect(await getMetricValue(page, 'rss')).toBeGreaterThanOrEqual(0)

    await page.locator('button[title="Flamegraph"]').click()
    await page.getByText('frontend').click()
    await page.getByText('backend').click()
    await page.getByText('composer').click()
    await expect(page.getByText('Flamegraph')).toBeVisible()
    await expect(page.getByText('frames')).toBeVisible()
    await page.goto('/#/')

    // services
    await page.goto('/#/services')
    await page.getByText('Show Aggregated Metrics').waitFor()
    await expect(page.getByText('backend Memory')).toHaveCount(1)
    await expect(page.getByText('Entrypoint Latency')).toHaveCount(1)
    await expect(page.getByText('Entrypoint Nodejs')).toHaveCount(1)
    await page.getByText('frontend').click()
    await expect(page.getByText('frontend CPU & ELU')).toHaveCount(1)
    await page.getByText('(Entrypoint)').click()
    await expect(page.getByText('composer Latency')).toHaveCount(1)
    await expect(page.getByText('composer Requests')).toHaveCount(1)
    await expect(page.getByText('composer Nodejs')).toHaveCount(1)
    await expect(page.getByText('composer Undici')).toHaveCount(1)
    await expect(page.getByText('composer Websocket')).toHaveCount(1)
    await expect(page.getByText('Heap Used')).toHaveCount(1)
    await expect(page.getByText('Old Space')).toHaveCount(1)
    await expect(page.getByText('Queued')).toHaveCount(1)
    await expect(page.getByText('Pending')).toHaveCount(1)
    await expect(page.getByText('Connections')).toHaveCount(1)

    // logs
    await page.goto('/#/logs')
    await page.getByText('Select all services').waitFor()
    await page.getByText('Trace').click()
    await page.getByText('Raw').click()
    await page.getByText('Pretty').click()
    await page.getByText('Select all services').click()

    // frontend (no Open API)
    await page.goto('/#/')
    await page.getByText('Service Type: vite').click()
    await page.getByText('This service has no OpenAPI Schema').waitFor()
    await expect(page.getByText('Open it at http://127.0.0.1:5042/api/proxy')).toHaveCount(1)
    await closeScalarModal(page)

    // composer (Scalar)
    await page.getByText('App Entrypoint').click()
    await page.getByText('Platformatic Gateway').waitFor()
    await page
      .locator('[id="tag/default/get/api/runtimes"]')
      .locator('.show-api-client-button')
      .click()
    await sendScalarReq(page)
    await page.getByText('200 OK').waitFor()
    await closeScalarModal(page)

    // backend (Scalar)
    await page.getByText('Service Type: service').click()
    await page.getByText('This is a service built on top of Platformatic').waitFor()
    await page
      .locator('[id="tag/default/get/runtimes"]')
      .locator('.show-api-client-button')
      .click()
    await sendScalarReq(page)
    await page.getByText('200 OK').waitFor()
    await closeScalarModal(page)

    // back the the home and restart
    await page.goto('/#/')
    await expect(page.getByText('RUNNING')).toHaveCount(1)
    const documentationButton = page.locator('[title="Documentation"]')
    await expect(documentationButton).toBeVisible()
    await expect(documentationButton).toBeEnabled()
    await documentationButton.click()
    await page.getByText('Restart').click()
    await page.getByText('Restarting...').waitFor()
  })
})
