import React, { useState } from 'react'
import { useInterval } from '~/hooks/useInterval'
import PropTypes from 'prop-types'
import { WHITE, MEDIUM, BLACK_RUSSIAN, TRANSPARENT, RICH_BLACK } from '@platformatic/ui-components/src/components/constants'
import styles from './NodeJSMetrics.module.css'
import typographyStyles from '~/styles/Typography.module.css'
import commonStyles from '~/styles/CommonStyles.module.css'
import { BorderedBox } from '@platformatic/ui-components'
import Icons from '@platformatic/ui-components/src/components/icons'
import NodeJSMetric from './NodeJSMetric'
import { REFRESH_INTERVAL_METRICS } from '~/ui-constants'
import { getApiMetricsPod } from '~/api'
import useAdminStore from '~/useAdminStore'

function NodeJSMetrics ({
  gridClassName = ''
}) {
  const [initialLoading, setInitialLoading] = useState(true)
  const [allData, setAllData] = useState({
    dataMem: [],
    dataCpu: [],
    dataLatency: []
  })
  const [latestRefreshDate, setLatestRefreshDate] = useState(new Date())
  const { runtimePid } = useAdminStore()

  useInterval(async () => {
    try {
      const data = await getApiMetricsPod(runtimePid)
      setAllData(data)
      setLatestRefreshDate(new Date())
    } catch (error) {
      console.error('Failed to fetch metrics:', error)
    } finally {
      setInitialLoading(false)
    }
  }, [REFRESH_INTERVAL_METRICS])

  return (
    <BorderedBox classes={`${styles.borderexBoxContainer} ${gridClassName}`} backgroundColor={BLACK_RUSSIAN} color={TRANSPARENT}>
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
            key={`mem_${latestRefreshDate.toISOString()}`}
            title='Memory'
            unit='(GB)'
            metricURL='mem'
            dataValues={allData.dataMem}
            initialLoading={initialLoading}
            options={[{
              label: 'RSS',
              internalKey: 'rss',
              unit: 'GB'
            }, {
              label: 'Total Heap',
              internalKey: 'totalHeap',
              unit: 'GB'
            }, {
              label: 'Heap Used',
              internalKey: 'usedHeap',
              unit: 'GB'
            }]}
            backgroundColor={RICH_BLACK}
          />
          <NodeJSMetric
            key={`cpu_${latestRefreshDate.toISOString()}`}
            title='CPU & ELU Average'
            metricURL='cpu'
            dataValues={allData.dataCpu}
            initialLoading={initialLoading}
            unit='(%)'
            options={[{
              label: 'CPU',
              internalKey: 'cpu',
              unit: '%'
            }, {
              label: 'ELU',
              internalKey: 'eventLoop',
              unit: '%'
            }]}
            backgroundColor={RICH_BLACK}
          />
          <NodeJSMetric
            key={`latency_${latestRefreshDate.toISOString()}`}
            title='Entrypoint Latency'
            metricURL='latency'
            dataValues={allData.dataLatency}
            initialLoading={initialLoading}
            unit='(ms)'
            options={[{
              label: 'P90',
              internalKey: 'p90',
              unit: 'ms'
            }, {
              label: 'P95',
              internalKey: 'p95',
              unit: 'ms'
            }, {
              label: 'P99',
              internalKey: 'p99',
              unit: 'ms'
            }]}
            backgroundColor={RICH_BLACK}
          />
        </div>
      </div>
    </BorderedBox>
  )
}

NodeJSMetrics.propTypes = {
  /**
   * gridClassName
    */
  gridClassName: PropTypes.string
}

export default NodeJSMetrics
