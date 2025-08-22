import React, { useState, useEffect } from 'react'
import styles from './AppDetails.module.css'
import AppNameBox, { ApiApplication } from './AppNameBox'
import ServicesBox from './ServicesBox'
import ErrorComponent from '../errors/ErrorComponent'
import NodeJSMetrics from './NodeJSMetrics'
import useAdminStore from '../../useAdminStore'
import { getApiApplication } from '../../api'

const AppDetails: React.FC = () => {
  const [error, setError] = useState<unknown>(undefined)
  const [apiApplication, setApiApplication] = useState<ApiApplication>({ id: 0, lastStarted: '', name: '', url: '' })
  const { setRuntimePid, mode } = useAdminStore()

  const fetchData = async (): Promise<void> => {
    try {
      const response = await getApiApplication(mode)
      if (response.id) {
        setApiApplication(response)
        setRuntimePid(response.id)
        setError(undefined)
      }
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (error) {
    return <ErrorComponent error={error} onClickDismiss={() => setError(undefined)} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerElement}>
        <AppNameBox onModeUpdated={fetchData} onErrorOccurred={setError} apiApplication={apiApplication} />
        <ServicesBox />
        <NodeJSMetrics />
      </div>
    </div>
  )
}

export default AppDetails
