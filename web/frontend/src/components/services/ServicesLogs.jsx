import React, { useEffect, useState } from 'react'
import typographyStyles from '~/styles/Typography.module.css'
import commonStyles from '~/styles/CommonStyles.module.css'
import styles from './ServicesLogs.module.css'
import { BLACK_RUSSIAN, MEDIUM, TRANSPARENT, WHITE } from '@platformatic/ui-components/src/components/constants'
import Icons from '@platformatic/ui-components/src/components/icons'
import AppLogs from '~/components/application-logs/AppLogs'
import useAdminStore from '~/useAdminStore'
import ServicesSelectorForDetailLog from './ServicesSelectorForDetailLog'
import { BorderedBox } from '@platformatic/ui-components'
import { POD_LOGS_PATH } from '~/ui-constants'
import { getServices } from '../../api'

const ServicesLogs = () => {
  const globalState = useAdminStore()
  const { setCurrentPage, runtimePid } = globalState
  const [selectAllServices, setSelectAllServices] = useState(true)
  const [colorPod, setColorPod] = useState(WHITE)
  const [services, setServices] = useState([])

  useEffect(() => {
    setCurrentPage(POD_LOGS_PATH)
  }, [])

  useEffect(() => {
    setColorPod(WHITE)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (runtimePid) {
          const response = await getServices(runtimePid)
          setServices(response.map(service => ({ ...service, selected: true })))
        }
      } catch (error) {
        console.error('Error getting services:', error)
      }
    }
    fetchData()
  }, [runtimePid])

  function handleChangeService (serviceUpdated) {
    const newServices = services.map(service => {
      if (serviceUpdated.id === service.id) {
        return { ...service, selected: !service.selected }
      } else {
        return { ...service }
      }
    })
    // if all selected but not find a service that is selected, turn off the toggle
    if (selectAllServices && newServices.find(service => !service.selected) !== undefined) {
      setSelectAllServices(false)
    }
    // if no service is selected but not all service select correspont to length of all service
    if (!selectAllServices && newServices.filter(service => service.selected).length === newServices.length) {
      setSelectAllServices(true)
    }
    setServices(newServices)
  }

  function handleChangeAllService () {
    setSelectAllServices(!selectAllServices)
    setServices(services.map(service => ({ ...service, selected: !selectAllServices })))
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
              filteredServices={services.filter(service => service.selected).map(service => service.id)}
            />
          </div>
        </BorderedBox>
      </div>
    </div>
  )
}

export default ServicesLogs
