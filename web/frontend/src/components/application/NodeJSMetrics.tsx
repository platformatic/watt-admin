import React, { useState, useEffect } from 'react'
import { useInterval } from '../../hooks/useInterval'
import { WHITE, MEDIUM, BLACK_RUSSIAN, TRANSPARENT } from '@platformatic/ui-components/src/components/constants'
import styles from './NodeJSMetrics.module.css'
import typographyStyles from '../../styles/Typography.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import { BorderedBox, Icons } from '@platformatic/ui-components'
import NodeJSMetric from './NodeJSMetric'
import { KEYS_METRICS, OPTIONS_METRICS, REFRESH_INTERVAL_METRICS } from '../../ui-constants'
import { getApiMetricsPod } from '../../api'
import useAdminStore from '../../useAdminStore'
import type { GetRuntimesPidMetricsResponseOK } from 'src/client/backend-types'
import ErrorComponent from '../errors/ErrorComponent'
import { getEmptyMetrics } from '../../utilities/metrics'

function NodeJSMetrics (): React.ReactElement {
  const [error, setError] = useState<unknown>(undefined)
  const [initialLoading, setInitialLoading] = useState(true)
  const [allData, setAllData] = useState<GetRuntimesPidMetricsResponseOK>(getEmptyMetrics())
  const { runtimePid, mode } = useAdminStore()

  const getData = async (): Promise<void> => {
    try {
      if (runtimePid) {
        const data = await getApiMetricsPod(runtimePid, mode)
        setAllData(data)
        setError(undefined)
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
                <p className={`${typographyStyles.desktopBodySemibold} ${typographyStyles.textWhite}`}>Metrics</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.metricsContainer}>
          {KEYS_METRICS.map(key => (
            key !== 'dataKafka' &&
              <NodeJSMetric
                key={key}
                title={OPTIONS_METRICS[key].title}
                unit={`(${OPTIONS_METRICS[key].unit})`}
                metricURL={OPTIONS_METRICS[key].type}
                dataValues={allData[key]}
                initialLoading={initialLoading}
                options={OPTIONS_METRICS[key].options}
              />
          ))}
        </div>
      </div>
    </BorderedBox>
  )
}

export default NodeJSMetrics
