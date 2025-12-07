import React, { type ReactNode, useEffect } from 'react'
import {
  HOME_PATH,
  POD_SERVICES_PATH,
  POD_LOGS_PATH,
  POD_FLAMEGRAPH_PATH
} from '../ui-constants'
import styles from './HomeContainer.module.css'
import SideBar from '../components/ui/SideBar'
import useAdminStore from '../useAdminStore'
import { useNavigate } from 'react-router-dom'
import { getOfflineMode } from '../utilities/getters'
import { hasProfiles } from '../api'

interface ApplicationContainerProps {
  children?: ReactNode;
}

function ApplicationContainer ({ children }: ApplicationContainerProps): React.ReactElement {
  const globalState = useAdminStore()
  const {
    setNavigation,
    currentPage,
    setCurrentPage,
  } = globalState
  const navigate = useNavigate()

  useEffect(() => {
    handleNavigation('Overview', HOME_PATH)
  }, [])

  function handleNavigation (label: string, page: string): void {
    navigate(page)
    setCurrentPage(page)
    setNavigation({ label, key: page, page })
  }

  return (
    <div className={styles.content}>
      <SideBar
        selected={currentPage}
        topItems={[{
          name: HOME_PATH,
          label: 'Overview',
          iconName: 'AppDetailsIcon',
          onClick: () => handleNavigation('Overview', HOME_PATH)
        }, {
          name: POD_FLAMEGRAPH_PATH,
          label: 'Flamegraph',
          iconName: 'MetricsIcon',
          onClick: () => handleNavigation('Flamegraph', POD_FLAMEGRAPH_PATH),
          disabled: !hasProfiles()
        }, {
          name: POD_SERVICES_PATH,
          label: 'Metrics',
          iconName: 'NodeJSMetricsIcon',
          onClick: () => handleNavigation('Metrics', POD_SERVICES_PATH)
        }, {
          name: POD_LOGS_PATH,
          label: 'Logs',
          iconName: 'CLIIcon',
          onClick: () => handleNavigation('Logs', POD_LOGS_PATH),
          disabled: getOfflineMode()
        }]}
        bottomItems={[{
          name: 'Documentation',
          label: 'Documentation',
          iconName: 'DocumentIcon',
          onClick: () => window.open('https://platformatic.dev/docs/watt/overview', '_blank', 'noopener,noreferrer')
        }]}
      />
      {children}
    </div>
  )
}

export default ApplicationContainer
