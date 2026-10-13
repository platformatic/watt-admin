import React, { useState } from 'react'
import styles from './Scaler.module.css'
import typographyStyles from '../../styles/Typography.module.css'
import { formatMetric, last, METRICS, metricView, plural, type ScalerApplication } from './model'

interface ApplicationListProps {
  applications: ScalerApplication[]
  selectedId: string | undefined
  now: number
  onSelect: (applicationId: string) => void
}

function ApplicationItem ({ application, selected, now, onSelect }: { application: ScalerApplication, selected: boolean, now: number, onSelect: () => void }): React.ReactElement {
  const values: string[] = []
  const predictions: string[] = []
  for (const name of METRICS) {
    const view = metricView(application, name, now)
    if (!view) continue
    values.push(`${name.toUpperCase()}: ${formatMetric(name, view.current)}`)
    const future = last(view.forecast)?.value
    if (view.threshold !== null && future !== undefined && future > view.threshold) {
      predictions.push(`${name.toUpperCase()} predicted to → ${formatMetric(name, future)}`)
    }
  }

  return (
    <button type='button' className={styles.applicationItem} aria-pressed={selected} onClick={onSelect}>
      <span className={styles.applicationTitle}>
        <span className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.ellipsis}`}>{application.id}</span>
        <span className={`${styles.count} ${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite}`}>{application.liveCount} → {application.targetCount}</span>
      </span>
      <span className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>{values.join('  |  ')}</span>
      {predictions.length > 0 && <span className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWarningYellow}`}>{predictions.join(' · ')}</span>}
      {application.pending.length > 0 && (
        <span className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>{plural(application.pending.length, 'worker')} starting</span>
      )}
    </button>
  )
}

function ApplicationList ({ applications, selectedId, now, onSelect }: ApplicationListProps): React.ReactElement {
  const [query, setQuery] = useState('')
  const visible = applications.filter(application => application.id.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className={styles.applicationList}>
      <p className={`${typographyStyles.desktopBodySmall} ${typographyStyles.semibold} ${typographyStyles.textWhite}`}>Applications ({applications.length})</p>
      <input
        type='search'
        className={`${styles.search} ${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite}`}
        placeholder='Search application...'
        aria-label='Search applications'
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <div className={styles.applicationItems}>
        {visible.map(application => (
          <ApplicationItem key={application.id} application={application} selected={application.id === selectedId} now={now} onSelect={() => onSelect(application.id)} />
        ))}
        {!visible.length && <p className={`${styles.empty} ${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>No applications found</p>}
      </div>
      <p className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>Workers: current → scheduled.</p>
    </div>
  )
}

export default ApplicationList
