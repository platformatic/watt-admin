import React, { useState, useEffect } from 'react'
import { TRANSPARENT, RICH_BLACK } from '@platformatic/ui-components/src/components/constants'
import styles from './ServicesMetrics.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import { BorderedBox } from '@platformatic/ui-components'
import { getApiMetricsPodService, getApiMetricsPod, getApiMetricsPodWorker } from '../../api'
import { useInterval } from '../../hooks/useInterval'
import useAdminStore from '../../useAdminStore'
import { REFRESH_INTERVAL_METRICS, POSITION_FIXED, OPTIONS_METRICS, KEYS_METRICS, KeyMetric } from '../../ui-constants'
import colorSetMem from './memory.module.css'
import colorSetCpu from './cpu.module.css'
import colorSetLatency from './latency.module.css'
import colorSetReq from './req.module.css'
import colorSetKafka from './kafka.module.css'
import colorSetUndici from './undici.module.css'
import colorSetWs from './ws.module.css'
import NodeJSMetric, { generateLegend } from '../application/NodeJSMetric'
import { GetRuntimesPidMetricsResponseOK, GetRuntimesPidServicesResponseOK } from 'src/client/backend-types'
import ErrorComponent from '../errors/ErrorComponent'
import { ServiceData } from 'src/types'
import { getEmptyMetrics } from '../../utilities/metrics'
import { getKafkaType, getOptionMetricsLabel } from '../../utilities/getters'
import { getThreadName, ThreadIndex } from '../../utilities/threads'

interface ServicesMetricsProps {
  service: ServiceData;
  services: GetRuntimesPidServicesResponseOK['services'];
  threadIndex?: ThreadIndex;
  showAggregatedMetrics: boolean;
}

const mapColor: Record<KeyMetric, { [key: string]: string }> = {
  dataMem: colorSetMem,
  dataCpu: colorSetCpu,
  dataReq: colorSetReq,
  dataKafka: colorSetKafka,
  dataWebsocket: colorSetWs,
  dataUndici: colorSetUndici,
  dataLatency: colorSetLatency,
}

function ServicesMetrics ({
  threadIndex,
  service: { id: serviceId },
  services,
  showAggregatedMetrics
}: ServicesMetricsProps): React.ReactElement {
  const threadName = threadIndex ? getThreadName(threadIndex) : ''
  const [error, setError] = useState<unknown>(undefined)
  const [initialLoading, setInitialLoading] = useState(true)
  const [serviceData, setServiceData] = useState<GetRuntimesPidMetricsResponseOK>(getEmptyMetrics())
  const [allData, setAllData] = useState<GetRuntimesPidMetricsResponseOK>(getEmptyMetrics())
  const { runtimePid, mode } = useAdminStore()

  const getData = async (): Promise<void> => {
    try {
      if (serviceId && runtimePid) {
        const detailedMetricsPromise = (threadIndex && threadIndex !== 'all') ? getApiMetricsPodWorker(runtimePid, serviceId, threadIndex - 1, mode) : getApiMetricsPodService(runtimePid, serviceId, mode)
        const [runtimeData, serviceData] = await Promise.all([getApiMetricsPod(runtimePid, mode), detailedMetricsPromise])
        setAllData(runtimeData)
        setServiceData(serviceData)
        setError(undefined)
      }
    } catch (error) {
      setError(error)
    } finally {
      setInitialLoading(false)
    }
  }

  useInterval(() => { getData() }, REFRESH_INTERVAL_METRICS)
  useEffect(() => { getData() }, [serviceId, showAggregatedMetrics, threadIndex])

  if (error) {
    return <ErrorComponent error={error} onClickDismiss={() => setError(undefined)} />
  }

  return (
    <div className={`${styles.container} ${styles.content} ${commonStyles.smallFlexBlock} ${commonStyles.fullWidth} ${styles.flexGrow}`}>
      {KEYS_METRICS.map(key => (
        (key !== 'dataKafka' || (key === 'dataKafka' && getKafkaType(services))) &&
          <div key={key} className={`${commonStyles.tinyFlexBlock} ${commonStyles.fullWidth}`}>
            <div className={`${commonStyles.smallFlexRow} ${commonStyles.fullWidth}`}>
              <BorderedBox color={TRANSPARENT} backgroundColor={RICH_BLACK} classes={styles.boxMetricContainer}>
                <NodeJSMetric
                  title={`${serviceId} ${OPTIONS_METRICS[key].title}`}
                  unit={`(${OPTIONS_METRICS[key].unit})`}
                  metricURL={OPTIONS_METRICS[key].type}
                  dataValues={serviceData[key]}
                  initialLoading={initialLoading}
                  chartTooltipPosition={POSITION_FIXED}
                  options={OPTIONS_METRICS[key].options}
                  showLegend={false}
                  timeline
                  slimCss
                  threadName={threadName}
                />
              </BorderedBox>

              {showAggregatedMetrics && (
                <BorderedBox color={TRANSPARENT} backgroundColor={RICH_BLACK} classes={styles.boxMetricContainer}>
                  <NodeJSMetric
                    title={`Entrypoint ${OPTIONS_METRICS[key].title}`}
                    unit={`(${OPTIONS_METRICS[key].unit})`}
                    metricURL={OPTIONS_METRICS[key].type}
                    dataValues={allData[key]}
                    initialLoading={initialLoading}
                    chartTooltipPosition={POSITION_FIXED}
                    options={OPTIONS_METRICS[key].options}
                    showLegend={false}
                    timeline
                    slimCss
                  />
                </BorderedBox>
              )}
            </div>
            {generateLegend(getOptionMetricsLabel(OPTIONS_METRICS[key].options), mapColor[key])}
          </div>
      ))}
    </div>
  )
}

export default ServicesMetrics
