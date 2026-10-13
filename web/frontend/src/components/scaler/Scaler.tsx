import React, { useCallback, useEffect, useState } from 'react'
import styles from './Scaler.module.css'
import typographyStyles from '../../styles/Typography.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import loadingSpinnerStyles from '../../styles/LoadingSpinnerStyles.module.css'
import { BLACK_RUSSIAN, MEDIUM, TRANSPARENT, WHITE } from '@platformatic/ui-components/src/components/constants'
import { BorderedBox, Icons, LoadingSpinnerV2 } from '@platformatic/ui-components'
import useAdminStore from '../../useAdminStore'
import { getScaler } from '../../api'
import { useInterval } from '../../hooks/useInterval'
import { POD_SCALER_PATH, REFRESH_INTERVAL_METRICS } from '../../ui-constants'
import ErrorComponent from '../errors/ErrorComponent'
import ApplicationList from './ApplicationList'
import ResourceLimits from './ResourceLimits'
import ScalerChart from './ScalerChart'
import WorkerList from './WorkerList'
import { formatMetric, isAvailable, METRICS, metricView, plural, scalingWarnings, workerView, type AvailableScaler, type ChartName, type MetricView, type Scaler as ScalerData, type ScalerApplication } from './model'

const CHART_TITLES: Record<ChartName, string> = { workers: 'Workers (#)', elu: 'Aggregated ELU', heap: 'Aggregated Heap' }

function Panel ({ title, subtitle, children, className = '' }: { title?: string, subtitle?: string, children: React.ReactNode, className?: string }): React.ReactElement {
  return (
    <BorderedBox color={TRANSPARENT} backgroundColor={BLACK_RUSSIAN} classes={`${styles.panel} ${className}`}>
      {title && (
        <div className={styles.panelHeader}>
          <p className={`${typographyStyles.desktopBodySmall} ${typographyStyles.semibold} ${typographyStyles.textWhite}`}>{title}</p>
          {subtitle && <p className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>{subtitle}</p>}
        </div>
      )}
      {children}
    </BorderedBox>
  )
}

function ChartCard ({ name, application, view, now }: { name: ChartName, application: ScalerApplication, view: MetricView | null, now: number }): React.ReactElement {
  let summary = ''
  if (name === 'workers') {
    summary = `${application.liveCount} current · ${application.targetCount} scheduled`
  } else if (view) {
    summary = `${formatMetric(name, view.current)} · ${view.threshold !== null ? `threshold ${formatMetric(name, view.threshold)}` : 'threshold not configured'}`
  }

  return (
    <Panel title={CHART_TITLES[name]} subtitle={summary} className={styles.chartPanel}>
      {view
        ? <ScalerChart name={name} now={now} view={view} initTimeoutMs={application.initTimeoutMs} />
        : <p className={`${styles.empty} ${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>No {name.toUpperCase()} measurements available for this application.</p>}
    </Panel>
  )
}

function ApplicationDetails ({ application, now }: { application: ScalerApplication, now: number }): React.ReactElement {
  const stats: [string, number][] = [['Workers usage', application.liveCount], ['Workers scheduled', application.targetCount], ['Starting', application.pending.length], ['Min', application.minimum], ['Max', application.maximum]]
  return (
    <div className={styles.details}>
      <Panel>
        <p className={`${typographyStyles.desktopBody} ${typographyStyles.semibold} ${typographyStyles.textWhite}`}>{application.id}</p>
        <div className={styles.stats}>
          {stats.map(([label, value]) => (
            <span key={label} className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>
              {label} <strong className={typographyStyles.opacity70}>{value}</strong>
            </span>
          ))}
        </div>
        <p className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>
          Estimated worker startup time: {(application.initTimeoutMs / 1000).toFixed(1)}s
        </p>
      </Panel>
      <ChartCard name='workers' application={application} view={workerView(application, now)} now={now} />
      {METRICS.map(name => <ChartCard key={name} name={name} application={application} view={metricView(application, name, now)} now={now} />)}
      <p className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>
        Dashed lines show predicted usage and scheduled workers.
      </p>
    </div>
  )
}

function ScalerDashboard ({ scaler }: { scaler: AvailableScaler }): React.ReactElement {
  const [selectedId, setSelectedId] = useState<string>()
  const selected = scaler.applications.find(application => application.id === selectedId) ?? scaler.applications[0]
  const warnings = scalingWarnings(scaler, selected)

  return (
    <>
      {warnings.length > 0 && (
        <div className={styles.warnings} role='status'>
          {warnings.map(warning => <p key={warning} className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWarningYellow}`}>{warning}</p>)}
        </div>
      )}
      <Panel title='Resource limits' subtitle='All applications'>
        <ResourceLimits scaler={scaler} onSelect={setSelectedId} />
      </Panel>
      <div className={styles.layout}>
        <Panel className={styles.sidebar}>
          <ApplicationList applications={scaler.applications} selectedId={selected?.id} now={scaler.now} onSelect={setSelectedId} />
        </Panel>
        {selected
          ? <ApplicationDetails application={selected} now={scaler.now} />
          : <Panel><p className={`${styles.empty} ${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>No applications available</p></Panel>}
        {selected && (
          <Panel title={`${selected.id} (${plural(selected.liveCount, 'worker')})`} subtitle='ELU / HEAP' className={styles.sidebar}>
            <WorkerList application={selected} now={scaler.now} />
          </Panel>
        )}
      </div>
    </>
  )
}

function Message ({ text }: { text: string }): React.ReactElement {
  return <Panel><p className={`${styles.empty} ${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>{text}</p></Panel>
}

function Scaler (): React.ReactElement {
  const { setCurrentPage, runtimePid } = useAdminStore()
  const [scaler, setScaler] = useState<ScalerData>()
  const [error, setError] = useState<unknown>()

  const fetchScaler = useCallback(async (): Promise<void> => {
    if (!runtimePid) return
    try {
      setScaler(await getScaler(runtimePid))
      setError(undefined)
    } catch (error) {
      setError(error)
    }
  }, [runtimePid])

  useEffect(() => { setCurrentPage(POD_SCALER_PATH) }, [])
  useEffect(() => { fetchScaler() }, [fetchScaler])
  useInterval(() => { fetchScaler() }, REFRESH_INTERVAL_METRICS)

  if (error) return <ErrorComponent error={error} onClickDismiss={() => setError(undefined)} />

  let content: React.ReactNode
  if (!scaler) {
    content = (
      <LoadingSpinnerV2
        loading
        applySentences={{
          containerClassName: `${commonStyles.mediumFlexBlock} ${commonStyles.itemsCenter}`,
          sentences: [{ style: `${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite}`, text: 'Loading ...' }]
        }}
        containerClassName={loadingSpinnerStyles.loadingSpinner}
        spinnerProps={{ size: 40, thickness: 3 }}
      />
    )
  } else if (isAvailable(scaler)) {
    content = <ScalerDashboard scaler={scaler} />
  } else if (scaler.status === 'unsupported') {
    content = <Message text={`This runtime reports scaling data version ${scaler.version}, which this version of Watt Admin does not support.`} />
  } else {
    content = <Message text='This runtime does not run the dynamic workers scaler. Enable workers.dynamic to see scaling data.' />
  }

  return (
    <div className={styles.container}>
      <div className={`${commonStyles.tinyFlexRow} ${commonStyles.fullWidth}`}>
        <Icons.ScalerDetailsIcon color={WHITE} size={MEDIUM} />
        <p className={`${typographyStyles.desktopBodyLargeSemibold} ${typographyStyles.textWhite}`}>Scaling</p>
      </div>
      {content}
    </div>
  )
}

export default Scaler
