import React, { useState, useEffect } from 'react'
import styles from './AppDetails.module.css'
import AppNameBox from './AppNameBox'
import ServicesBox from './ServicesBox'
import ErrorComponent from '~/components/errors/ErrorComponent'
import NodeJSMetrics from './NodeJSMetrics'
import useAdminStore from '~/useAdminStore'
import { getApiApplication } from '../../api'

const AppDetails = () => {
  const [error, setError] = useState('')
  const [apiApplication, setApiApplication] = useState({})
  const { setRuntimePid } = useAdminStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApiApplication()
        if (response.id) {
          setApiApplication(response)
          setRuntimePid(response.id)
          setError('')
        }
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [])

  if (error) {
    return <ErrorComponent error={error} message={error?.message} onClickDismiss={() => setError('')} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerElement}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <AppNameBox
              onErrorOccurred={setError}
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
