import React, { useState, useEffect } from 'react'
import { useInterval } from '../../hooks/useInterval'
import { WHITE, MEDIUM, BLACK_RUSSIAN, TRANSPARENT } from '@platformatic/ui-components/src/components/constants'
import styles from './NodeJSMetrics.module.css'
import typographyStyles from '../../styles/Typography.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import { BorderedBox, Icons } from '@platformatic/ui-components'
import NodeJSMetric from './NodeJSMetric'
import { REFRESH_INTERVAL_METRICS, MEMORY_UNIT_METRICS, LATENCY_UNIT_METRICS, CPU_UNIT_METRICS, REQ_UNIT_METRICS, KAFKA_UNIT_METRICS, KAFKA_OPTIONS_METRICS, REQ_OPTIONS_METRICS, LATENCY_OPTIONS_METRICS, CPU_OPTIONS_METRICS, MEMORY_OPTIONS_METRICS } from '../../ui-constants'
import { getApiMetricsPod } from '../../api'
import useAdminStore from '../../useAdminStore'
import type { GetRuntimesPidMetricsResponseOK } from 'src/client/backend-types'
import ErrorComponent from '../errors/ErrorComponent'
import { getKafkaType } from '../../utilities/getters'

export const getEmptyMetrics = (): GetRuntimesPidMetricsResponseOK => ({ dataMem: [], dataCpu: [], dataLatency: [], dataReq: [], dataKafka: [] })

function NodeJSMetrics (): React.ReactElement {
  const [error, setError] = useState<unknown>(undefined)
  const [initialLoading, setInitialLoading] = useState(true)
  const [allData, setAllData] = useState<GetRuntimesPidMetricsResponseOK>(getEmptyMetrics())
  const { runtimePid } = useAdminStore()
  const [hasKafkaData, setHasKafkaData] = useState(false)

  const getData = async (): Promise<void> => {
    try {
      if (runtimePid) {
        const data = await getApiMetricsPod(runtimePid)
        setAllData(data)
        setError(undefined)
        setHasKafkaData(getKafkaType(data.dataKafka))
      }
    } catch (error) {
      setError(error)
    } finally {
      setInitialLoading(false)
    }
  }

  useInterval(() => { getData() }, REFRESH_INTERVAL_METRICS)
  useEffect(() => { getData() }, [runtimePid])

  if (error) {
    return <ErrorComponent error={error} onClickDismiss={() => setError(undefined)} />
  }

  return (
    <BorderedBox classes={`${styles.borderexBoxContainer}`} backgroundColor={BLACK_RUSSIAN} color={TRANSPARENT}>
      <div className={`${commonStyles.smallFlexBlock} ${commonStyles.fullWidth}`}>
        <div className={`${commonStyles.smallFlexRow} ${commonStyles.fullWidth} ${commonStyles.justifyBetween}`}>
          <div className={`${commonStyles.tinyFlexRow} ${commonStyles.fullWidth} ${commonStyles.justifyBetween}`}>
            <div className={commonStyles.tinyFlexRow}>
              <Icons.NodeJSMetricsIcon
                color={WHITE}
                size={MEDIUM}
              />
              <div>
                <p className={`${typographyStyles.desktopBodySemibold} ${typographyStyles.textWhite}`}>NodeJS Metrics</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.metricsContainer}>
          <NodeJSMetric
            title='Memory'
            unit={`(${MEMORY_UNIT_METRICS})`}
            metricURL='mem'
            dataValues={allData.dataMem}
            initialLoading={initialLoading}
            options={MEMORY_OPTIONS_METRICS}
          />
          <NodeJSMetric
            title='CPU & ELU Average'
            metricURL='cpu'
            dataValues={allData.dataCpu}
            initialLoading={initialLoading}
            unit={`(${CPU_UNIT_METRICS})`}
            options={CPU_OPTIONS_METRICS}
          />
          <NodeJSMetric
            title='Entrypoint Latency'
            metricURL='latency'
            dataValues={allData.dataLatency}
            initialLoading={initialLoading}
            unit={`(${LATENCY_UNIT_METRICS})`}
            options={LATENCY_OPTIONS_METRICS}
          />
          <NodeJSMetric
            title='Requests'
            metricURL='req'
            dataValues={allData.dataReq}
            initialLoading={initialLoading}
            unit={`(${REQ_UNIT_METRICS})`}
            options={REQ_OPTIONS_METRICS}
          />
          {hasKafkaData &&
            <NodeJSMetric
              title='Kafka'
              metricURL='kafka'
              dataValues={allData.dataKafka}
              initialLoading={initialLoading}
              unit={`(${KAFKA_UNIT_METRICS})`}
              options={KAFKA_OPTIONS_METRICS}
            />}
        </div>
      </div>
    </BorderedBox>
  )
}

export default NodeJSMetrics
