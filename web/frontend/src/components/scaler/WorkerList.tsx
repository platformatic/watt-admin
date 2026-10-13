import React from 'react'
import * as d3 from 'd3'
import styles from './WorkerList.module.css'
import typographyStyles from '../../styles/Typography.module.css'
import { COLORS, formatMetric, METRICS, WORKER_WINDOW_MS, workerIndex, workerPoints, type MetricName, type ScalerApplication, type ScalerWorkerMetric } from './model'

const WIDTH = 160
const HEIGHT = 48

function age (now: number, timestamp: number): string {
  const seconds = Math.max(0, Math.floor((now - timestamp) / 1000))
  return seconds < 60 ? `${seconds}s ago` : `${Math.floor(seconds / 60)}m ${seconds % 60}s ago`
}

function Sparkline ({ name, metric, now, threshold }: { name: MetricName, metric?: ScalerWorkerMetric, now: number, threshold: number | null }): React.ReactElement {
  const points = workerPoints(metric, now)
  const max = Math.max(name === 'elu' ? 1 : 1024 * 1024, threshold ?? 0, ...points.map(point => point.value)) * 1.1
  const x = d3.scaleLinear().domain([now - WORKER_WINDOW_MS, now]).range([2, WIDTH - 2])
  const y = d3.scaleLinear().domain([0, max]).range([HEIGHT - 3, 3])
  const line = d3.line<{ timestamp: number, value: number }>().x(point => x(point.timestamp)).y(point => y(point.value))

  return (
    <svg className={styles.sparkline} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio='none' role='img' aria-label={`${name} samples`}>
      {threshold !== null && <line x1={0} x2={WIDTH} y1={y(threshold)} y2={y(threshold)} stroke={COLORS.threshold} className={styles.threshold} />}
      {points.length > 1 && <path d={line(points) ?? ''} stroke={COLORS[name]} className={styles.series} />}
    </svg>
  )
}

function WorkerList ({ application, now }: { application: ScalerApplication, now: number }): React.ReactElement {
  if (!application.workers.length) {
    return <p className={`${styles.empty} ${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>No live workers.</p>
  }

  return (
    <div className={styles.list}>
      {application.workers.map(worker => {
        const overloaded = METRICS.some(name => {
          const threshold = application.metrics[name]?.threshold
          return typeof threshold === 'number' && (worker.metrics[name]?.lastValue ?? 0) > threshold
        })
        return (
          <article key={worker.id} className={styles.worker}>
            <div className={styles.header}>
              <p className={`${typographyStyles.desktopBodySmall} ${typographyStyles.semibold} ${typographyStyles.textWhite}`}>Worker {workerIndex(worker.id)}</p>
              {overloaded && <span className={styles.overloaded} title='Last measurement above threshold' />}
            </div>
            <p className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>Started {age(now, worker.startTime)}</p>
            <div className={styles.metrics}>
              {METRICS.map(name => {
                const metric = worker.metrics[name]
                const configured = Boolean(application.metrics[name])
                return (
                  <div key={name} className={styles.metric}>
                    <div className={styles.metricTitle}>
                      <span className={`${typographyStyles.desktopOtherOverlineSmallest} ${typographyStyles.textWhite}`}>{name.toUpperCase()}</span>
                      <span className={typographyStyles.desktopBodySmall} style={{ color: COLORS[name] }}>{formatMetric(name, metric?.lastValue)}</span>
                    </div>
                    <Sparkline name={name} metric={metric} now={now} threshold={application.metrics[name]?.threshold ?? null} />
                    {!metric && (
                      <span className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>
                        {configured ? 'Awaiting first sample' : 'Not configured'}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default WorkerList
