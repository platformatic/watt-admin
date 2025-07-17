import React, { useEffect, useState } from 'react'
import { WHITE, TRANSPARENT, OPACITY_30, RICH_BLACK } from '@platformatic/ui-components/src/components/constants'
import styles from './NodeJSMetric.module.css'
import typographyStyles from '../../styles/Typography.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import { BorderedBox, LoadingSpinnerV2, VerticalSeparator } from '@platformatic/ui-components'
import loadingSpinnerStyles from '../../styles/LoadingSpinnerStyles.module.css'
import NoDataAvailable from '../ui/NoDataAvailable'
import MetricChart, { DataPoint, getMetricColor } from '../metrics/MetricChart'
import { POSITION_ABSOLUTE } from '../../ui-constants'
import type { GetRuntimesPidMetricsResponseOK } from 'src/client/backend-types'

type DataValues = GetRuntimesPidMetricsResponseOK[keyof GetRuntimesPidMetricsResponseOK]

export type MetricType = 'mem' | 'cpu' | 'latency' | 'req' | 'kafka'

interface NodeJSMetricProps {
  title: string;
  metricURL: MetricType;
  initialLoading: boolean;
  dataValues: DataValues;
  unit: string;
  options: {
    label: string;
    internalKey: string;
    unit: string;
  }[];
  chartTooltipPosition?: string;
  showLegend?: boolean;
  timeline?: boolean;
  slimCss?: boolean;
  threadName?: string;
}

export const generateLegend = (options: string[], colorStyles: Record<string, string>): React.ReactElement => {
  return (
    <div className={`${commonStyles.tinyFlexRow}`}>
      {
      options.map((option, i) => {
        return (
          <React.Fragment key={`label-${i}`}>
            <div className={`${commonStyles.tinyFlexRow} ${commonStyles.itemsCenter}`}>
              <div className={`${styles.label} ${typographyStyles.desktopBodySmallest} ${typographyStyles.opacity70} ${typographyStyles.textWhite}`}> {option} </div>
              <div className={`${styles.legendLine} ${colorStyles[`color-${i}`]}`} />
            </div>
            {options.length - 1 && i < (options.length - 1) ? <VerticalSeparator color={WHITE} backgroundColorOpacity={OPACITY_30} classes={styles.verticalSeparator} /> : ''}
          </React.Fragment>
        )
      })
    }
    </div>
  )
}

function NodeJSMetric ({
  title,
  metricURL,
  initialLoading,
  dataValues,
  unit,
  options,
  chartTooltipPosition = POSITION_ABSOLUTE,
  showLegend = true,
  timeline = false,
  slimCss = false,
  threadName
}: NodeJSMetricProps): React.ReactElement {
  const backgroundColor = RICH_BLACK
  const [showNoResult, setShowNoResult] = useState(false)
  const [seriesValues, setSeriesValues] = useState<DataPoint[]>([])
  const styleCss = slimCss ? `${styles.borderexBoxSlim}` : `${styles.borderexBoxContainer} ${styles.borderedBoxHeigthLoading}`
  const [borderexBoxClassName, setBorderexBoxClassName] = useState(`${styleCss}`)
  const [lowerMaxY, setLowerMaxY] = useState(0)
  const colorStyles = getMetricColor(metricURL)
  const labels = options.map(option => option.label)

  useEffect(() => {
    setBorderexBoxClassName(`${styles.borderexBoxContainer}`)
    let newValues: DataPoint[] = []
    let lowerMaxY = 0
    if (metricURL === 'req') {
      lowerMaxY = 10
    }
    if (dataValues.length > 0) {
      if (metricURL === 'latency') {
        newValues = dataValues.map(({ date, ...rest }) => ({
          time: new Date(date),
          ...rest
        } as unknown as DataPoint))
      } else {
        dataValues.forEach(dataValue => {
          const values = options.map(option => Number((dataValue as unknown as DataPoint)[option.internalKey]) || 0)
          newValues.push({ time: new Date(dataValue.date), values: [...values] })
          lowerMaxY = Math.max(lowerMaxY, ...values)
        })
      }
      setSeriesValues([...newValues])
      setShowNoResult(false)
      setLowerMaxY(lowerMaxY)
    } else {
      setShowNoResult(true)
    }
  }, [dataValues])

  function renderComponent (): React.ReactNode {
    if (initialLoading) {
      return (
        <LoadingSpinnerV2
          loading
          applySentences={{
            containerClassName: `${commonStyles.mediumFlexBlock} ${commonStyles.itemsCenter}`,
            sentences: []
          }}
          containerClassName={loadingSpinnerStyles.loadingSpinner}
          spinnerProps={{ size: 40, thickness: 3 }}
        />
      )
    }

    if (showNoResult) { return <NoDataAvailable iconName='NodeJSMetricsIcon' /> }

    return metricURL === 'latency'
      ? (
        <MetricChart
          data={seriesValues}
          unit={unit}
          labels={options.map(option => ({ name: option.label, value: option.internalKey }))}
          percentiles={{
            p99: '#2192FA',
            p95: '#FA6221',
            p90: '#C61BE2'
          }}
          colorSet={metricURL}
          lowerMaxY={lowerMaxY}
          tooltipPosition={chartTooltipPosition}
          timeline={timeline}
        />
        )
      : (
        <MetricChart
          data={seriesValues}
          unit={unit}
          labels={labels}
          colorSet={metricURL}
          lowerMaxY={lowerMaxY}
          tooltipPosition={chartTooltipPosition}
          timeline={timeline}
        />)
  }

  return (
    <BorderedBox classes={borderexBoxClassName} backgroundColor={backgroundColor} color={TRANSPARENT}>
      <div className={`${commonStyles.tinyFlexBlock} ${commonStyles.fullWidth} ${commonStyles.fullHeight}`}>
        <div className={`${commonStyles.tinyFlexRow} ${commonStyles.itemsCenter} ${commonStyles.justifyBetween} ${commonStyles.fullWidth} ${commonStyles.positionRelative}`}>
          <div className={`${commonStyles.tinyFlexRow}`}>
            <span className={`${typographyStyles.desktopBodySemibold} ${typographyStyles.textWhite}`}>{title}</span>
            <span className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>{unit}</span>
          </div>

          {threadName &&
            <div className={`${commonStyles.tinyFlexRow} ${commonStyles.itemsCenter}`}>
              <div className={`${styles.label} ${typographyStyles.desktopBodySmallest} ${typographyStyles.opacity70} ${typographyStyles.textWhite}`}> {threadName} </div>
            </div>}
          {!showNoResult && showLegend && generateLegend(labels, colorStyles)}
        </div>
        <div className={`${commonStyles.smallFlexRow} ${commonStyles.fullWidth} ${commonStyles.justifyBetween} ${commonStyles.itemsCenter} ${commonStyles.fullHeight}`}>
          {renderComponent()}
        </div>
      </div>
    </BorderedBox>
  )
}

export default NodeJSMetric
