import React, { useEffect, useState } from 'react'
import typographyStyles from '../../styles/Typography.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import styles from './ServicesCharts.module.css'
import { BLACK_RUSSIAN, MEDIUM, TRANSPARENT, WHITE } from '@platformatic/ui-components/src/components/constants'
import useAdminStore from '../../useAdminStore'
import ServicesSelectorForCharts from './ServicesSelectorForCharts'
import { BorderedBox, Icons } from '@platformatic/ui-components'
import ServicesMetrics from '../../components/metrics/ServicesMetrics'
import { POD_SERVICES_PATH } from '../../ui-constants'
import { getServices } from '../../api'
import { ServiceData } from 'src/types'
import ErrorComponent from '../errors/ErrorComponent'
import { getServiceWorkers } from '../../utilities/getters'
import { hasMultipleWorkers, ThreadIndex } from '../../utilities/threads'

const ServicesCharts: React.FC = () => {
  const { setCurrentPage, runtimePid, mode } = useAdminStore()
  const [error, setError] = useState<unknown>(undefined)
  const [showAggregatedMetrics, setShowAggregatedMetrics] = useState(true)
  const [services, setServices] = useState<ServiceData[]>([])
  const [serviceSelected, setServiceSelected] = useState<ServiceData>({ id: '', status: '' })
  const [threadIndex, setThreadIndex] = useState<ThreadIndex>()

  useEffect(() => {
    setCurrentPage(POD_SERVICES_PATH)
  }, [])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (runtimePid) {
          const response = await getServices(runtimePid, mode)
          setServices(response)
          setServiceSelected(response[0])
          setError(undefined)
        }
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [runtimePid])

  if (error) {
    return <ErrorComponent error={error} onClickDismiss={() => setError(undefined)} />
  }

  return (
    <div className={styles.podServicesContainer}>
      <div className={styles.podServicesContent}>
        <div className={`${commonStyles.miniFlexBlock} ${commonStyles.fullWidth}`}>
          <div className={`${commonStyles.tinyFlexRow} ${commonStyles.fullWidth}`}>
            <Icons.NodeJSMetricsIcon
              color={WHITE}
              size={MEDIUM}
            />
            <p className={`${typographyStyles.desktopBodyLargeSemibold} ${typographyStyles.textWhite} `}>Metrics</p>
          </div>
        </div>

        <BorderedBox color={TRANSPARENT} backgroundColor={BLACK_RUSSIAN} classes={styles.borderedBoxContainerPodServices}>
          <div className={`${commonStyles.smallFlexRow} ${commonStyles.itemsStart}`}>
            <ServicesSelectorForCharts
              key={serviceSelected.id}
              services={services}
              serviceSelected={serviceSelected}
              handleClickService={(service) => {
                setServiceSelected(service)
                if (hasMultipleWorkers(getServiceWorkers(service))) {
                  setThreadIndex('all')
                } else {
                  setThreadIndex(undefined)
                }
              }}
              handleClickThread={(threadIndex) => {
                if (hasMultipleWorkers(getServiceWorkers(serviceSelected))) {
                  setThreadIndex(threadIndex)
                } else {
                  setThreadIndex(undefined)
                }
              }}
              showAggregatedMetrics={showAggregatedMetrics}
              handleChangeShowAggregateMetrics={() => setShowAggregatedMetrics(!showAggregatedMetrics)}
            />
            <ServicesMetrics
              threadIndex={threadIndex}
              service={serviceSelected}
              services={services}
              showAggregatedMetrics={showAggregatedMetrics}
            />
          </div>
        </BorderedBox>
      </div>
    </div>
  )
}

export default ServicesCharts
