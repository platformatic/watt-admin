import React, { useState, useEffect } from 'react'
import styles from './AppDetails.module.css'
import AppNameBox from './AppNameBox'
import ServicesBox from './ServicesBox'
import ErrorComponent from '~/components/errors/ErrorComponent'
import NodeJSMetrics from './NodeJSMetrics'
import useAdminStore from '~/useAdminStore'
import { getApiApplication } from '../../api'

const AppDetails = () => {
  const [showErrorComponent, setShowErrorComponent] = useState(false)
  const [error, setError] = useState(false)
  const [apiApplication, setApiApplication] = useState({})
  const { setRuntimePid } = useAdminStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApiApplication()
        setApiApplication(response)
        setRuntimePid(response.id)
      } catch (error) {
        console.error('Error getting api application:', error)
      }
    }
    fetchData()
  }, [])

  if (showErrorComponent) {
    return <ErrorComponent error={error} message={error.message} onClickDismiss={() => setShowErrorComponent(false)} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerElement}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <AppNameBox
              onErrorOccurred={(error) => {
                setError(error)
                setShowErrorComponent(true)
              }}
              apiApplication={apiApplication}
            />
            <NodeJSMetrics />
          </div>
          <div className={styles.rightSection}>
            <ServicesBox />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppDetails
