import { useEffect } from 'react'
import {
  HOME_PATH,
  POD_SERVICES_PATH,
  POD_LOGS_PATH
} from '~/ui-constants'
import styles from './HomeContainer.module.css'
import SideBar from '~/components/ui/SideBar'
import useAdminStore from '~/useAdminStore'
import { useNavigate } from 'react-router-dom'

function ApplicationContainer ({ children }) {
  const globalState = useAdminStore()
  const {
    setNavigation,
    currentPage,
    setCurrentPage
  } = globalState
  const navigate = useNavigate()

  useEffect(() => {
    handleNavigation('Overview', HOME_PATH)
  }, [])

  function handleNavigation (label, page) {
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
          name: POD_SERVICES_PATH,
          label: 'NodeJS Metrics',
          iconName: 'NodeJSMetricsIcon',
          onClick: () => handleNavigation('NodeJS Metrics', POD_SERVICES_PATH)
        }, {
          name: POD_LOGS_PATH,
          label: 'Logs',
          iconName: 'CLIIcon',
          onClick: () => handleNavigation('Logs', POD_LOGS_PATH)
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
