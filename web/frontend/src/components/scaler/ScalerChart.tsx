import React, { useId, useMemo, useState } from 'react'
import * as d3 from 'd3'
import styles from './ScalerChart.module.css'
import typographyStyles from '../../styles/Typography.module.css'
import { useElementSize } from '../../hooks/useElementSize'
import { COLORS, FORECAST_MS, formatMetric, last, WINDOW_MS, type ChartName, type MetricView, type Point } from './model'

// The chart fills its card; below this it would stop being readable.
const MIN_HEIGHT = 140
const MARGIN = { left: 56, top: 22, right: 16, bottom: 20 }

interface ScalerChartProps {
  name: ChartName
  now: number
  view: MetricView
  initTimeoutMs: number
}

// Continue the last forecast segment to the right edge, within the axis.
function extendForecast (forecast: Point[], end: number, yMax: number): Point[] {
  const final = last(forecast)
  if (!final || final.timestamp >= end) return forecast
  const previous = forecast[forecast.length - 2]
  let value = final.value
  if (previous && final.timestamp > previous.timestamp) {
    value += (final.value - previous.value) / (final.timestamp - previous.timestamp) * (end - final.timestamp)
  }
  return [...forecast, { timestamp: end, value: Math.max(0, Math.min(yMax, value)) }]
}

function yDomainMax (name: ChartName, view: MetricView): number {
  if (name === 'elu') return 1
  const values = [...view.history, ...view.forecast].map(point => point.value)
  const max = Math.max(name === 'workers' ? 2 : 1024 * 1024, view.threshold ?? 0, ...values)
  return name === 'workers' ? Math.ceil(max * 1.15) : max * 1.12
}

function ScalerChart ({ name, now, view, initTimeoutMs }: ScalerChartProps): React.ReactElement {
  const id = useId()
  const [containerRef, { width, height: measuredHeight }] = useElementSize<HTMLDivElement>()
  const height = Math.max(MIN_HEIGHT, measuredHeight)
  const [hovered, setHovered] = useState<Point | null>(null)
  const isWorkers = name === 'workers'
  const color = COLORS[name]

  const chart = useMemo(() => {
    const right = Math.max(MARGIN.left + 1, width - MARGIN.right)
    const bottom = height - MARGIN.bottom
    const yMax = yDomainMax(name, view)
    const x = d3.scaleLinear().domain([now - WINDOW_MS, now + FORECAST_MS]).range([MARGIN.left, right])
    const y = d3.scaleLinear().domain([0, yMax]).range([bottom, MARGIN.top])
    const forecast = isWorkers ? view.forecast : extendForecast(view.forecast, now + FORECAST_MS, yMax)
    const curve = isWorkers ? d3.curveStepAfter : d3.curveLinear
    const line = d3.line<Point>().x(point => x(point.timestamp)).y(point => y(point.value)).curve(curve)
    const area = d3.area<Point>().x(point => x(point.timestamp)).y0(bottom).y1(point => y(point.value)).curve(curve)
    const ticks = isWorkers ? y.ticks(Math.min(5, yMax)).filter(Number.isInteger) : [0, yMax / 2, yMax]
    return { right, bottom, x, y, forecast, line, area, ticks }
  }, [width, height, name, view, now, isWorkers])

  const { right, bottom, x, y, forecast, line, area, ticks } = chart
  const points = [...view.history, ...forecast]
  const nowX = x(now)
  const initX = initTimeoutMs > 0 && initTimeoutMs < FORECAST_MS ? x(now + initTimeoutMs) : null

  function handlePointerMove (event: React.PointerEvent<SVGSVGElement>): void {
    const pointerX = event.clientX - event.currentTarget.getBoundingClientRect().left
    if (!points.length || pointerX < MARGIN.left || pointerX > right) return setHovered(null)
    setHovered(points.reduce((nearest, point) => Math.abs(x(point.timestamp) - pointerX) < Math.abs(x(nearest.timestamp) - pointerX) ? point : nearest))
  }

  return (
    <div ref={containerRef} className={styles.container}>
      {width > 0 && (
        <svg
          className={styles.chart}
          width={width}
          height={height}
          role='img'
          aria-label={`${name} chart`}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHovered(null)}
        >
          <defs>
            <linearGradient id={`${id}-fill`} x1={0} y1={0} x2={0} y2={1}>
              <stop offset='0%' stopColor={color} stopOpacity={0.25} />
              <stop offset='100%' stopColor={color} stopOpacity={0} />
            </linearGradient>
            <pattern id={`${id}-hatch`} width={7} height={7} patternUnits='userSpaceOnUse' patternTransform='rotate(45)'>
              <line x1={0} y1={0} x2={0} y2={7} className={styles.hatch} />
            </pattern>
            <clipPath id={`${id}-clip`}>
              <rect x={MARGIN.left} y={MARGIN.top} width={right - MARGIN.left} height={bottom - MARGIN.top} />
            </clipPath>
          </defs>

          <rect x={nowX} y={MARGIN.top} width={right - nowX} height={bottom - MARGIN.top} fill={`url(#${id}-hatch)`} />
          {ticks.map(tick => (
            <g key={tick}>
              <line x1={MARGIN.left} x2={right} y1={y(tick)} y2={y(tick)} className={styles.grid} />
              <text x={MARGIN.left - 8} y={y(tick) + 3} textAnchor='end' className={styles.axis}>{formatMetric(name, tick)}</text>
            </g>
          ))}
          {d3.range(-WINDOW_MS, FORECAST_MS + 1, 10000).filter(offset => offset !== 0).map(offset => (
            <text key={offset} x={x(now + offset)} y={height - 4} textAnchor='middle' className={styles.axis}>
              {`${offset > 0 ? '+' : ''}${offset / 1000}s`}
            </text>
          ))}

          <g clipPath={`url(#${id}-clip)`}>
            {view.threshold !== null && (
              <line x1={MARGIN.left} x2={right} y1={y(view.threshold)} y2={y(view.threshold)} stroke={COLORS.threshold} className={styles.dashed} />
            )}
            {view.history.length > 1 && <path d={area(view.history) ?? ''} fill={`url(#${id}-fill)`} />}
            {view.history.length > 1 && <path d={line(view.history) ?? ''} stroke={color} className={styles.series} />}
            {view.history.length === 1 && <circle cx={x(view.history[0].timestamp)} cy={y(view.history[0].value)} r={3} fill={color} />}
            {forecast.length > 1 && <path d={line(forecast) ?? ''} stroke={isWorkers ? 'white' : COLORS.forecast} className={`${styles.series} ${styles.dashed}`} />}
          </g>

          <line x1={nowX} x2={nowX} y1={MARGIN.top} y2={bottom} className={styles.now} />
          <text x={MARGIN.left} y={10} className={styles.region}>◄ PAST</text>
          <text x={right} y={10} textAnchor='end' className={styles.region}>{isWorkers ? 'SCHEDULED ►' : 'PREDICTED ►'}</text>
          <text x={nowX} y={MARGIN.top - 5} textAnchor='middle' className={styles.region}>NOW</text>
          {initX !== null && (
            <>
              <line x1={initX} x2={initX} y1={MARGIN.top} y2={bottom} className={styles.init} />
              {initX - nowX > 28 && <text x={initX} y={MARGIN.top - 5} textAnchor='middle' className={styles.region}>INIT</text>}
            </>
          )}
          {!points.length && (
            <text x={(MARGIN.left + right) / 2} y={(MARGIN.top + bottom) / 2} textAnchor='middle' className={styles.axis}>Waiting for measurements</text>
          )}
          {hovered && <line x1={x(hovered.timestamp)} x2={x(hovered.timestamp)} y1={MARGIN.top} y2={bottom} className={styles.crosshair} />}
        </svg>
      )}
      {hovered && (
        <div className={`${styles.tooltip} ${typographyStyles.desktopBodySmallest}`} style={{ left: x(hovered.timestamp), top: y(hovered.value) }}>
          {formatMetric(name, hovered.value)}
        </div>
      )}
    </div>
  )
}

export default ScalerChart
