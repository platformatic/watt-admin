import React, { useState, useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import NotFound from '~/pages/NotFound'
import PrivateRouteContainer from '~/layout/PrivateRouteContainer'
import ErrorPage from '~/pages/ErrorPage'
import {
  ERROR_PAGE_PATH,
  HOME_PATH,
  NOT_FOUND_PATH,
  POD_SERVICES_PATH,
  POD_LOGS_PATH
} from '~/ui-constants'
import { LoadingSpinnerV2 } from '@platformatic/ui-components'
import loadingSpinnerStyles from '~/styles/LoadingSpinnerStyles.module.css'
import commonStyles from '~/styles/CommonStyles.module.css'
import typographyStyles from '~/styles/Typography.module.css'
import useAdminStore from '~/useAdminStore'
import useErrorBoundary from 'use-error-boundary'
import ErrorComponent from '~/components/errors/ErrorComponent'
import ApplicationContainer from '~/layout/ApplicationContainer'
import AppDetails from '~/components/application/AppDetails'
import ServicesLogs from '~/components/services/ServicesLogs'
import ServicesCharts from '~/components/services/ServicesCharts'

export default function App () {
  const globalState = useAdminStore()
  const { setCurrentWindowWidth } = globalState
  const [innerLoading, setInnerLoading] = useState(false)
  const [showErrorComponent, setShowErrorComponent] = useState(false)

  const {
    ErrorBoundary,
    error
  } = useErrorBoundary({
    onDidCatch: (error) => {
      setShowErrorComponent(true)
      console.error(error)
    }
  })

  useEffect(() => {
    async function getUserLocal () {
      setInnerLoading(false)
    }
    getUserLocal()
  }, [])

  useEffect(() => {
    setCurrentWindowWidth(window.innerWidth)

    const handleResize = () => {
      setCurrentWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function handleDismiss () {
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

  if (showErrorComponent) {
    return (
      <ErrorComponent
        error={error}
        message={error?.message || ''}
        onClickDismiss={() => handleDismiss()}
      />
    )
  }

  return (
    <ErrorBoundary>
      <HashRouter>
        <Routes>
          <Route
            path={NOT_FOUND_PATH}
            element={<NotFound />}
          />
          <Route
            path={ERROR_PAGE_PATH}
            element={<ErrorPage />}
          />
          <Route
            path={HOME_PATH}
            element={
              <PrivateRouteContainer>
                <ApplicationContainer>
                  <AppDetails />
                </ApplicationContainer>
              </PrivateRouteContainer>
            }
          />
          <Route
            path={POD_SERVICES_PATH}
            element={
              <PrivateRouteContainer>
                <ApplicationContainer>
                  <ServicesCharts />
                </ApplicationContainer>
              </PrivateRouteContainer>
            }
          />
          <Route
            path={POD_LOGS_PATH}
            element={
              <PrivateRouteContainer>
                <ApplicationContainer>
                  <ServicesLogs />
                </ApplicationContainer>
              </PrivateRouteContainer>
            }
          />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  )
}
