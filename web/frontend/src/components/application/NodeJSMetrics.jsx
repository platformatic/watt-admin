import React, { useState, useEffect } from 'react'
import { useInterval } from '~/hooks/useInterval'
import { WHITE, MEDIUM, BLACK_RUSSIAN, TRANSPARENT, RICH_BLACK } from '@platformatic/ui-components/src/components/constants'
import styles from './NodeJSMetrics.module.css'
import typographyStyles from '~/styles/Typography.module.css'
import commonStyles from '~/styles/CommonStyles.module.css'
import { BorderedBox } from '@platformatic/ui-components'
import Icons from '@platformatic/ui-components/src/components/icons'
import NodeJSMetric from './NodeJSMetric'
import { REFRESH_INTERVAL_METRICS, MEMORY_UNIT_METRICS, LATENCY_UNIT_METRICS, CPU_UNIT_METRICS } from '~/ui-constants'
import { getApiMetricsPod } from '~/api'
import useAdminStore from '~/useAdminStore'

function NodeJSMetrics () {
  const [initialLoading, setInitialLoading] = useState(true)
  const [allData, setAllData] = useState({
    dataMem: [],
    dataCpu: [],
    dataLatency: []
  })
  const { runtimePid } = useAdminStore()

  const getData = async () => {
    try {
      if (runtimePid) {
        const data = await getApiMetricsPod(runtimePid)
        setAllData(data)
      }
    } catch (error) {
      console.error('Failed to fetch runtime metrics:', error)
    } finally {
      setInitialLoading(false)
    }
  }

  useInterval(() => { getData() }, REFRESH_INTERVAL_METRICS)
  useEffect(() => { getData() }, [runtimePid])

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
            options={[{
              label: 'RSS',
              internalKey: 'rss',
              unit: MEMORY_UNIT_METRICS
            }, {
              label: 'Total Heap',
              internalKey: 'totalHeap',
              unit: MEMORY_UNIT_METRICS
            }, {
              label: 'Heap Used',
              internalKey: 'usedHeap',
              unit: MEMORY_UNIT_METRICS
            }]}
            backgroundColor={RICH_BLACK}
          />
          <NodeJSMetric
            title='CPU & ELU Average'
            metricURL='cpu'
            dataValues={allData.dataCpu}
            initialLoading={initialLoading}
            unit={`(${CPU_UNIT_METRICS})`}
            options={[{
              label: 'CPU',
              internalKey: 'cpu',
              unit: CPU_UNIT_METRICS
            }, {
              label: 'ELU',
              internalKey: 'eventLoop',
              unit: CPU_UNIT_METRICS
            }]}
            backgroundColor={RICH_BLACK}
          />
          <NodeJSMetric
            title='Entrypoint Latency'
            metricURL='latency'
            dataValues={allData.dataLatency}
            initialLoading={initialLoading}
            unit={`(${LATENCY_UNIT_METRICS})`}
            options={[{
              label: 'P90',
              internalKey: 'p90',
              unit: LATENCY_UNIT_METRICS
            }, {
              label: 'P95',
              internalKey: 'p95',
              unit: LATENCY_UNIT_METRICS
            }, {
              label: 'P99',
              internalKey: 'p99',
              unit: LATENCY_UNIT_METRICS
            }]}
            backgroundColor={RICH_BLACK}
          />
        </div>
      </div>
    </BorderedBox>
  )
}

export default NodeJSMetrics
