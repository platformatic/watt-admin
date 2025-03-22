import React, { useState, useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import RouteContainer from './layout/RouteContainer'
import {
  HOME_PATH,
  POD_SERVICES_PATH,
  POD_LOGS_PATH
} from './ui-constants'
import { LoadingSpinnerV2 } from '@platformatic/ui-components'
import loadingSpinnerStyles from './styles/LoadingSpinnerStyles.module.css'
import commonStyles from './styles/CommonStyles.module.css'
import typographyStyles from './styles/Typography.module.css'
import useAdminStore from './useAdminStore'
import useErrorBoundary from 'use-error-boundary'
import ErrorComponent from './components/errors/ErrorComponent'
import ApplicationContainer from './layout/ApplicationContainer'
import AppDetails from './components/application/AppDetails'
import ServicesLogs from './components/services/ServicesLogs'
import ServicesCharts from './components/services/ServicesCharts'

interface ErrorBoundaryResult {
  ErrorBoundary: React.ComponentType<{ children: React.ReactNode }>;
  error: Error | null;
  didCatch: boolean;
}

export default function App (): React.ReactElement {
  const globalState = useAdminStore()
  const { setCurrentWindowWidth } = globalState
  const [innerLoading, setInnerLoading] = useState(false)
  const [showErrorComponent, setShowErrorComponent] = useState(false)

  const {
    ErrorBoundary,
    error
  }: ErrorBoundaryResult = useErrorBoundary({
    onDidCatch: (error: Error) => {
      setShowErrorComponent(true)
      console.error(error)
    }
  })

  useEffect(() => {
    async function getUserLocal (): Promise<void> {
      setInnerLoading(false)
    }
    getUserLocal()
  }, [])

  useEffect(() => {
    setCurrentWindowWidth(window.innerWidth)

    const handleResize = (): void => {
      setCurrentWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function handleDismiss (): void {
    setShowErrorComponent(false)
  }

  if (innerLoading) {
    return (
      <LoadingSpinnerV2
        loading
        applySentences={{
          containerClassName: `${commonStyles.mediumFlexBlock} ${commonStyles.itemsCenter}`,
          sentences: [{
            style: `${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite}`,
            text: 'Loading ...'
          }]
        }}
        containerClassName={loadingSpinnerStyles.loadingSpinner}
        spinnerProps={{ size: 40, thickness: 3 }}
      />
    )
  }

  if (showErrorComponent && error) {
    return (
      <ErrorComponent
        error={error}
        onClickDismiss={() => handleDismiss()}
      />
    )
  }

  return (
    <ErrorBoundary>
      <HashRouter>
        <Routes>
          <Route
            path={HOME_PATH}
            element={
              <RouteContainer>
                <ApplicationContainer>
                  <AppDetails />
                </ApplicationContainer>
              </RouteContainer>
            }
          />
          <Route
            path={POD_SERVICES_PATH}
            element={
              <RouteContainer>
                <ApplicationContainer>
                  <ServicesCharts />
                </ApplicationContainer>
              </RouteContainer>
            }
          />
          <Route
            path={POD_LOGS_PATH}
            element={
              <RouteContainer>
                <ApplicationContainer>
                  <ServicesLogs />
                </ApplicationContainer>
              </RouteContainer>
            }
          />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  )
}
