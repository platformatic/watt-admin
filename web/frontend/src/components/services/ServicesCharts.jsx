import React, { useEffect, useState } from 'react'
import typographyStyles from '~/styles/Typography.module.css'
import commonStyles from '~/styles/CommonStyles.module.css'
import styles from './ServicesCharts.module.css'
import { BLACK_RUSSIAN, MEDIUM, TRANSPARENT, WHITE } from '@platformatic/ui-components/src/components/constants'
import Icons from '@platformatic/ui-components/src/components/icons'
import useAdminStore from '~/useAdminStore'
import ServicesSelectorForCharts from './ServicesSelectorForCharts'
import { BorderedBox } from '@platformatic/ui-components'
import ServicesMetrics from '~/components/metrics/ServicesMetrics'
import { POD_SERVICES_PATH } from '~/ui-constants'
import { getServices } from '../../api'

const ServicesCharts = () => {
  const globalState = useAdminStore()
  const { setCurrentPage, runtimePid } = globalState
  const [showAggregatedMetrics, setShowAggregatedMetrics] = useState(true)
  const [services, setServices] = useState([])
  const [serviceSelected, setServiceSelected] = useState({})

  useEffect(() => {
    setCurrentPage(POD_SERVICES_PATH)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (runtimePid) {
          const response = await getServices(runtimePid)
          setServices(response)
          setServiceSelected(response[0])
        }
      } catch (error) {
        console.error('Error getting services:', error)
      }
    }
    fetchData()
  }, [runtimePid])

  return (
    <div className={styles.podServicesContainer}>
      <div className={styles.podServicesContent}>
        <div className={`${commonStyles.miniFlexBlock} ${commonStyles.fullWidth}`}>
          <div className={`${commonStyles.tinyFlexRow} ${commonStyles.fullWidth}`}>
            <Icons.NodeJSMetricsIcon
              color={WHITE}
              size={MEDIUM}
            />
            <p className={`${typographyStyles.desktopBodyLargeSemibold} ${typographyStyles.textWhite} `}>NodeJS Metrics</p>
          </div>
        </div>

        <BorderedBox color={TRANSPARENT} backgroundColor={BLACK_RUSSIAN} classes={styles.borderedBoxContainerPodServices}>
          <div className={`${commonStyles.smallFlexRow} ${commonStyles.itemsStart}`}>
            <ServicesSelectorForCharts
              key={serviceSelected.id}
              services={services}
              serviceSelected={serviceSelected}
              handleClickService={(service) => setServiceSelected(service)}
              showAggregatedMetrics={showAggregatedMetrics}
              handleChangeShowAggregateMetrics={() => setShowAggregatedMetrics(!showAggregatedMetrics)}
            />
            <ServicesMetrics
              serviceId={serviceSelected.id}
              showAggregatedMetrics={showAggregatedMetrics}
            />
          </div>
        </BorderedBox>
      </div>
    </div>
  )
}

export default ServicesCharts
