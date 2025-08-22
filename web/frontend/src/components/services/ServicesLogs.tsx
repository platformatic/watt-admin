import React, { useEffect, useState } from 'react'
import typographyStyles from '../../styles/Typography.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import styles from './ServicesLogs.module.css'
import { BLACK_RUSSIAN, MEDIUM, TRANSPARENT, WHITE } from '@platformatic/ui-components/src/components/constants'
import AppLogs from '../../components/application-logs/AppLogs'
import useAdminStore from '../../useAdminStore'
import ServicesSelectorForDetailLog from './ServicesSelectorForDetailLog'
import { BorderedBox, Icons } from '@platformatic/ui-components'
import { POD_LOGS_PATH } from '../../ui-constants'
import { getServices } from '../../api'
import { ServiceData } from 'src/types'
import ErrorComponent from '../errors/ErrorComponent'
import { getServiceSelected } from '../../utilities/getters'

const ServicesLogs: React.FC = () => {
  const { setCurrentPage, runtimePid, mode } = useAdminStore()
  const [error, setError] = useState<unknown>(undefined)
  const [selectAllServices, setSelectAllServices] = useState(true)
  const [colorPod, setColorPod] = useState(WHITE)
  const [services, setServices] = useState<ServiceData[]>([])

  useEffect(() => {
    setCurrentPage(POD_LOGS_PATH)
  }, [])

  useEffect(() => {
    setColorPod(WHITE)
  }, [])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (runtimePid) {
          const response = await getServices(runtimePid, mode)
          setServices(response.map((service: ServiceData) => ({ ...service, selected: true })))
          setError(undefined)
        }
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [runtimePid])

  function handleChangeService (serviceUpdated: ServiceData): void {
    const newServices = services.map(service => {
      if (serviceUpdated.id === service.id) {
        return { ...service, selected: !getServiceSelected(service) }
      } else {
        return { ...service }
      }
    })
    // if all selected but not find a service that is selected, turn off the toggle
    if (selectAllServices && newServices.find(service => !getServiceSelected(service)) !== undefined) {
      setSelectAllServices(false)
    }
    // if no service is selected but not all service select correspont to length of all service
    if (!selectAllServices && newServices.filter(getServiceSelected).length === newServices.length) {
      setSelectAllServices(true)
    }
    setServices(newServices)
  }

  function handleChangeAllService (): void {
    setSelectAllServices(!selectAllServices)
    setServices(services.map(service => ({ ...service, selected: !selectAllServices })))
  }

  if (error) {
    return <ErrorComponent error={error} onClickDismiss={() => setError(undefined)} />
  }

  return (
    <div className={styles.detailPodContainer}>
      <div className={styles.detailPodContent}>
        <div className={`${commonStyles.miniFlexBlock} ${commonStyles.fullWidth}`}>
          <div className={`${commonStyles.tinyFlexRow} ${commonStyles.fullWidth}`}>
            <Icons.CLIIcon
              color={colorPod}
              size={MEDIUM}
            />
            <p className={`${typographyStyles.desktopBodyLargeSemibold} ${typographyStyles.textWhite} `}>Logs</p>
          </div>
        </div>

        <BorderedBox color={TRANSPARENT} backgroundColor={BLACK_RUSSIAN} classes={styles.borderedBoxContainerPodLogs}>
          <div className={`${commonStyles.smallFlexRow} ${commonStyles.itemsStart}`}>
            <ServicesSelectorForDetailLog
              services={services}
              handleChangeService={handleChangeService}
              selectAllServices={selectAllServices}
              handleChangeAllServices={() => handleChangeAllService()}
            />
            <AppLogs
              filteredServices={services.filter(getServiceSelected).map(service => service.id)}
            />
          </div>
        </BorderedBox>
      </div>
    </div>
  )
}

export default ServicesLogs
