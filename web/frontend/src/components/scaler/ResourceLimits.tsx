import React from 'react'
import styles from './ResourceLimits.module.css'
import typographyStyles from '../../styles/Typography.module.css'
import { formatBytes, type AvailableScaler, type ResourceSegment, resourceUsage } from './model'

interface ResourceLimitsProps {
  scaler: AvailableScaler
  onSelect: (applicationId: string) => void
}

// Spread hues by the golden angle so neighbouring applications stay distinct.
function applicationColor (index: number): string {
  return `hsl(${(210 + index * 137.508) % 360} 55% 30%)`
}

function Track ({ segments, describe, colors, onSelect, limitAt }: {
  segments: ResourceSegment[]
  describe: (segment: ResourceSegment) => string
  colors: Map<string, string>
  onSelect: (applicationId: string) => void
  limitAt?: number
}): React.ReactElement {
  return (
    <div className={styles.track} role='group'>
      {segments.map((segment, index) => {
        const label = describe(segment)
        const style = { flexGrow: segment.value, backgroundColor: segment.application && colors.get(segment.application), '--slots': segment.value } as React.CSSProperties
        const content = <span className={styles.segmentLabel}>{label}</span>
        return segment.application
          ? <button key={index} type='button' className={`${styles.segment} ${styles[segment.kind]}`} style={style} title={label} aria-label={label} onClick={() => onSelect(segment.application!)}>{content}</button>
          : <div key={index} className={`${styles.segment} ${styles[segment.kind]}`} style={style} title={label}>{content}</div>
      })}
      {limitAt !== undefined && <span className={styles.limit} style={{ left: `${limitAt * 100}%` }} title='Configured limit' />}
    </div>
  )
}

function Row ({ title, summary, children }: { title: string, summary?: string, children: React.ReactNode }): React.ReactElement {
  return (
    <div className={styles.row}>
      <div className={styles.rowHeader}>
        <p className={`${typographyStyles.desktopBodySmall} ${typographyStyles.semibold} ${typographyStyles.textWhite}`}>{title}</p>
        {summary && <p className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>{summary}</p>}
      </div>
      {children}
    </div>
  )
}

function ResourceLimits ({ scaler, onSelect }: ResourceLimitsProps): React.ReactElement {
  const { workers, memory } = resourceUsage(scaler)
  const colors = new Map(scaler.applications.map((application, index) => [application.id, applicationColor(index)]))

  let workerSummary = `${workers.live} running · ${workers.available} available / ${workers.limit} slots`
  if (workers.scheduled > 0) workerSummary += ` · ${workers.scheduled} scheduled`
  if (workers.occupied > workers.limit) workerSummary += ` · ${workers.occupied - workers.limit} over limit`

  return (
    <div className={styles.rows}>
      <Row title='Workers' summary={workerSummary}>
        <Track
          segments={workers.segments}
          describe={segment => segment.kind === 'worker' ? segment.label : `${segment.label} · ${segment.value}`}
          colors={colors}
          onSelect={onSelect}
          limitAt={workers.scale > workers.limit ? workers.limit / workers.scale : undefined}
        />
      </Row>
      <Row title='Heap Usage' summary={memory ? `${formatBytes(memory.available)} available for scale-up · ${formatBytes(memory.heapUsed)} worker heap` : undefined}>
        {memory
          ? <Track segments={memory.segments} describe={segment => `${segment.label} · ${formatBytes(segment.value)}`} colors={colors} onSelect={onSelect} />
          : <p className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>Memory usage is not available yet.</p>}
        {memory && memory.missingHeap > 0 && (
          <p className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>{memory.missingHeap} worker(s) awaiting a heap measurement.</p>
        )}
      </Row>
    </div>
  )
}

export default ResourceLimits
