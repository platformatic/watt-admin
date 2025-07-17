import React, { useState, useEffect } from 'react'
import { TRANSPARENT, RICH_BLACK } from '@platformatic/ui-components/src/components/constants'
import styles from './ServicesMetrics.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import { BorderedBox } from '@platformatic/ui-components'
import { getApiMetricsPodService, getApiMetricsPod, getApiMetricsPodWorker } from '../../api'
import { useInterval } from '../../hooks/useInterval'
import useAdminStore from '../../useAdminStore'
import { REFRESH_INTERVAL_METRICS, POSITION_FIXED, MEMORY_UNIT_METRICS, LATENCY_UNIT_METRICS, CPU_UNIT_METRICS, REQ_UNIT_METRICS, KAFKA_UNIT_METRICS, KAFKA_OPTIONS_METRICS, REQ_OPTIONS_METRICS, LATENCY_OPTIONS_METRICS, CPU_OPTIONS_METRICS, MEMORY_OPTIONS_METRICS } from '../../ui-constants'
import colorSetMem from './memory.module.css'
import colorSetCpu from './cpu.module.css'
import colorSetLatency from './latency.module.css'
import colorSetReq from './req.module.css'
import colorSetKafka from './kafka.module.css'
import NodeJSMetric, { generateLegend } from '../application/NodeJSMetric'
import { GetRuntimesPidMetricsResponseOK } from 'src/client/backend-types'
import ErrorComponent from '../errors/ErrorComponent'
import { ServiceData } from 'src/types'
import { getThreadName, ThreadIndex } from '../services/ServicesSelectorForCharts'
import { getEmptyMetrics } from '../application/NodeJSMetrics'
import { getKafkaType, getOptionMetricsLabel } from '../../utilities/getters'

interface ServicesMetricsProps {
  service: ServiceData;
  threadIndex?: ThreadIndex;
  showAggregatedMetrics: boolean;
}

function ServicesMetrics ({
  threadIndex,
  service: { id: serviceId },
  showAggregatedMetrics
}: ServicesMetricsProps): React.ReactElement {
  const threadName = threadIndex ? getThreadName(threadIndex) : ''
  const [error, setError] = useState<unknown>(undefined)
  const [initialLoading, setInitialLoading] = useState(true)
  const [serviceData, setServiceData] = useState<GetRuntimesPidMetricsResponseOK>(getEmptyMetrics())
  const [allData, setAllData] = useState<GetRuntimesPidMetricsResponseOK>(getEmptyMetrics())
  const { runtimePid } = useAdminStore()
  const [hasKafkaData, setHasKafkaData] = useState(false)

  const getData = async (): Promise<void> => {
    try {
      if (serviceId && runtimePid) {
        const detailedMetricsPromise = (threadIndex && threadIndex !== 'all') ? getApiMetricsPodWorker(runtimePid, serviceId, threadIndex - 1) : getApiMetricsPodService(runtimePid, serviceId)
        const [runtimeData, serviceData] = await Promise.all([getApiMetricsPod(runtimePid), detailedMetricsPromise])
        setAllData(runtimeData)
        setServiceData(serviceData)
        setError(undefined)
        setHasKafkaData(getKafkaType(serviceData.dataKafka))
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
      <div className={`${commonStyles.tinyFlexBlock} ${commonStyles.fullWidth}`}>
        <div className={`${commonStyles.smallFlexRow} ${commonStyles.fullWidth}`}>
          <BorderedBox color={TRANSPARENT} backgroundColor={RICH_BLACK} classes={styles.boxMetricContainer}>
            <NodeJSMetric
              title={`${serviceId} Memory`}
              unit={`(${MEMORY_UNIT_METRICS})`}
              metricURL='mem'
              dataValues={serviceData.dataMem}
              initialLoading={initialLoading}
              chartTooltipPosition={POSITION_FIXED}
              options={MEMORY_OPTIONS_METRICS}
              showLegend={false}
              timeline
              slimCss
              threadName={threadName}
            />
          </BorderedBox>

          {showAggregatedMetrics && (
            <BorderedBox color={TRANSPARENT} backgroundColor={RICH_BLACK} classes={styles.boxMetricContainer}>
              <NodeJSMetric
                title='Memory'
                unit={`(${MEMORY_UNIT_METRICS})`}
                metricURL='mem'
                dataValues={allData.dataMem}
                initialLoading={initialLoading}
                chartTooltipPosition={POSITION_FIXED}
                options={MEMORY_OPTIONS_METRICS}
                showLegend={false}
                timeline
                slimCss
              />
            </BorderedBox>
          )}
        </div>
        {generateLegend(getOptionMetricsLabel(MEMORY_OPTIONS_METRICS), colorSetMem)}
      </div>

      <div className={`${commonStyles.tinyFlexBlock} ${commonStyles.fullWidth}`}>
        <div className={`${commonStyles.smallFlexRow} ${commonStyles.fullWidth}`}>
          <BorderedBox color={TRANSPARENT} backgroundColor={RICH_BLACK} classes={styles.boxMetricContainer}>
            <NodeJSMetric
              title={`${serviceId} CPU & ELU`}
              metricURL='cpu'
              dataValues={serviceData.dataCpu}
              initialLoading={initialLoading}
              chartTooltipPosition={POSITION_FIXED}
              unit={`(${CPU_UNIT_METRICS})`}
              options={CPU_OPTIONS_METRICS}
              showLegend={false}
              timeline
              slimCss
              threadName={threadName}
            />
          </BorderedBox>

          {showAggregatedMetrics && (
            <BorderedBox color={TRANSPARENT} backgroundColor={RICH_BLACK} classes={styles.boxMetricContainer}>
              <NodeJSMetric
                title='CPU & ELU'
                metricURL='cpu'
                dataValues={allData.dataCpu}
                initialLoading={initialLoading}
                chartTooltipPosition={POSITION_FIXED}
                unit={`(${CPU_UNIT_METRICS})`}
                options={CPU_OPTIONS_METRICS}
                showLegend={false}
                timeline
                slimCss
              />
            </BorderedBox>
          )}
        </div>
        {generateLegend(getOptionMetricsLabel(CPU_OPTIONS_METRICS), colorSetCpu)}
      </div>

      <div className={`${commonStyles.tinyFlexBlock} ${commonStyles.fullWidth}`}>
        <div className={`${commonStyles.smallFlexRow} ${commonStyles.fullWidth}`}>
          <BorderedBox color={TRANSPARENT} backgroundColor={RICH_BLACK} classes={styles.boxMetricContainer}>
            <NodeJSMetric
              title={`${serviceId} Latency`}
              metricURL='latency'
              dataValues={serviceData.dataLatency}
              initialLoading={initialLoading}
              chartTooltipPosition={POSITION_FIXED}
              unit={`(${LATENCY_UNIT_METRICS})`}
              options={LATENCY_OPTIONS_METRICS}
              showLegend={false}
              threadName={threadName}
              slimCss
              timeline
            />
          </BorderedBox>

          {showAggregatedMetrics && (
            <BorderedBox color={TRANSPARENT} backgroundColor={RICH_BLACK} classes={styles.boxMetricContainer}>
              <NodeJSMetric
                title='Aggregated Service Latency'
                metricURL='latency'
                dataValues={allData.dataLatency}
                initialLoading={initialLoading}
                chartTooltipPosition={POSITION_FIXED}
                unit={`(${LATENCY_UNIT_METRICS})`}
                options={LATENCY_OPTIONS_METRICS}
                showLegend={false}
                slimCss
                timeline
              />
            </BorderedBox>
          )}
        </div>
        {generateLegend(getOptionMetricsLabel(LATENCY_OPTIONS_METRICS), colorSetLatency)}
      </div>

      <div className={`${commonStyles.tinyFlexBlock} ${commonStyles.fullWidth}`}>
        <div className={`${commonStyles.smallFlexRow} ${commonStyles.fullWidth}`}>
          <BorderedBox color={TRANSPARENT} backgroundColor={RICH_BLACK} classes={styles.boxMetricContainer}>
            <NodeJSMetric
              title={`${serviceId} Requests`}
              metricURL='req'
              dataValues={serviceData.dataReq}
              initialLoading={initialLoading}
              chartTooltipPosition={POSITION_FIXED}
              unit={`(${REQ_UNIT_METRICS})`}
              options={REQ_OPTIONS_METRICS}
              showLegend={false}
              threadName={threadName}
              slimCss
              timeline
            />
          </BorderedBox>

          {showAggregatedMetrics && (
            <BorderedBox color={TRANSPARENT} backgroundColor={RICH_BLACK} classes={styles.boxMetricContainer}>
              <NodeJSMetric
                title='Entrypoint Requests'
                metricURL='req'
                dataValues={allData.dataReq}
                initialLoading={initialLoading}
                chartTooltipPosition={POSITION_FIXED}
                unit={`(${REQ_UNIT_METRICS})`}
                options={REQ_OPTIONS_METRICS}
                showLegend={false}
                slimCss
                timeline
              />
            </BorderedBox>
          )}
        </div>
        {generateLegend(getOptionMetricsLabel(REQ_OPTIONS_METRICS), colorSetReq)}
      </div>

      {hasKafkaData &&
        <div className={`${commonStyles.tinyFlexBlock} ${commonStyles.fullWidth}`}>
          <div className={`${commonStyles.smallFlexRow} ${commonStyles.fullWidth}`}>
            <BorderedBox color={TRANSPARENT} backgroundColor={RICH_BLACK} classes={styles.boxMetricContainer}>
              <NodeJSMetric
                title={`${serviceId} Kafka`}
                metricURL='kafka'
                dataValues={serviceData.dataKafka}
                initialLoading={initialLoading}
                chartTooltipPosition={POSITION_FIXED}
                unit={`(${REQ_UNIT_METRICS})`}
                options={KAFKA_OPTIONS_METRICS}
                showLegend={false}
                threadName={threadName}
                slimCss
                timeline
              />
            </BorderedBox>

            {showAggregatedMetrics && (
              <BorderedBox color={TRANSPARENT} backgroundColor={RICH_BLACK} classes={styles.boxMetricContainer}>
                <NodeJSMetric
                  title='Entrypoint Kafka'
                  metricURL='kafka'
                  dataValues={allData.dataKafka}
                  initialLoading={initialLoading}
                  chartTooltipPosition={POSITION_FIXED}
                  unit={`(${KAFKA_UNIT_METRICS})`}
                  options={KAFKA_OPTIONS_METRICS}
                  showLegend={false}
                  slimCss
                  timeline
                />
              </BorderedBox>
            )}
          </div>
          {generateLegend(getOptionMetricsLabel(KAFKA_OPTIONS_METRICS), colorSetKafka)}
        </div>}
    </div>
  )
}

export default ServicesMetrics
