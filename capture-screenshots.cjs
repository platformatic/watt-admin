const { chromium } = require('playwright')
const path = require('path')

async function captureScreenshots() {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2
  })

  // CPU Example Screenshots
  console.log('Opening example-cpu.html...')
  const cpuPage = await context.newPage()
  await cpuPage.goto(`file://${path.join(__dirname, 'example-cpu.html')}`)
  await cpuPage.waitForLoadState('networkidle')
  await cpuPage.waitForTimeout(1000)

  // Screenshot 1: Hero/Metrics dashboard
  console.log('Capturing metrics dashboard screenshot...')
  await cpuPage.screenshot({
    path: 'screenshot-metrics-dashboard.png',
    fullPage: false
  })

  // Screenshot 2: CPU Flamegraph - navigate to flamegraph tab
  console.log('Navigating to flamegraph...')
  const flamegraphButton = cpuPage.locator('button[title="Flamegraph"]')
  await flamegraphButton.click()
  await cpuPage.waitForTimeout(1000)

  // Click Next to show more flamegraph data
  console.log('Clicking Next on CPU flamegraph...')
  const cpuNextButton = cpuPage.getByText('next', { exact: true })
  await cpuNextButton.click()
  await cpuPage.waitForTimeout(1000)

  console.log('Capturing CPU flamegraph screenshot...')
  await cpuPage.screenshot({
    path: 'screenshot-cpu-flamegraph.png',
    fullPage: false
  })

  // Heap Example Screenshots
  console.log('Opening example-heap.html...')
  const heapPage = await context.newPage()
  await heapPage.goto(`file://${path.join(__dirname, 'example-heap.html')}`)
  await heapPage.waitForLoadState('networkidle')
  await heapPage.waitForTimeout(1000)

  // Navigate to flamegraph for heap
  console.log('Navigating to heap flamegraph...')
  const heapFlamegraphButton = heapPage.locator('button[title="Flamegraph"]')
  await heapFlamegraphButton.click()
  await heapPage.waitForTimeout(1000)

  // Click Next to show more flamegraph data
  console.log('Clicking Next on heap flamegraph...')
  const heapNextButton = heapPage.getByText('next', { exact: true })
  await heapNextButton.click()
  await heapPage.waitForTimeout(1000)

  console.log('Capturing heap flamegraph screenshot...')
  await heapPage.screenshot({
    path: 'screenshot-heap-flamegraph.png',
    fullPage: false
  })

  // Screenshot of services page
  console.log('Navigating to services page...')
  await cpuPage.goto(`file://${path.join(__dirname, 'example-cpu.html')}#/services`)
  await cpuPage.waitForLoadState('networkidle')
  await cpuPage.waitForTimeout(1000)

  console.log('Capturing services metrics screenshot...')
  await cpuPage.screenshot({
    path: 'screenshot-services-metrics.png',
    fullPage: false
  })

  await browser.close()
  console.log('Done! Screenshots saved.')
}

captureScreenshots().catch(console.error)
