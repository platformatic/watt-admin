import React, { useState, useEffect } from 'react'
import { OPACITY_100, OPACITY_15, RICH_BLACK, WHITE, TRANSPARENT, MEDIUM, SMALL, BLACK_RUSSIAN } from '@platformatic/ui-components/src/components/constants'
import { ApiReferenceReact } from '@scalar/api-reference-react'
import styles from './ServicesBox.module.css'
import typographyStyles from '../../styles/Typography.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import { BorderedBox, Icons } from '@platformatic/ui-components'
import useAdminStore from '../../useAdminStore'
import { getOpenApi, getServices } from '../../api'
import type { ServiceData } from '../../types'
import ErrorComponent from '../errors/ErrorComponent'
import { HOME_PATH } from '../../ui-constants'
import { useNavigate } from 'react-router-dom'
import { getServiceEntrypoint, getOfflineMode } from '../../utilities/getters'

interface ServiceDetailPanelProps {
  openapi: unknown;
  service: string;
  pid: number;
  onClose: () => void;
}

function ServiceDetailPanel ({ openapi, pid, service, onClose }: ServiceDetailPanelProps): React.ReactElement {
  const customCss = `
  .dark-mode {
    --scalar-color-1: rgb(255 255 255 / var(--tw-bg-opacity));
    --scalar-background-1: rgb(0 5 11 / var(--tw-bg-opacity));
    --scalar-background-3: rgb(0 5 11 / var(--tw-bg-opacity));
    --sidebar-background-1: rgb(0 5 11 / var(--tw-bg-opacity));
    --sidebar-border-color: rgb(0 5 11 / var(--tw-bg-opacity));
  }
  .darklight {
    display: none !important;
  }
  .contents > section,
  .section-container > section {
    padding: 40px 0 !important;
  }
  .app-exit-button {
    display: none;
  }`

  const baseServerURL = `${window.location.origin}/api/proxy/${pid}/services/${service}/`

  return (
    <div className={styles.serviceDetailPanel}>
      <div className={`${commonStyles.smallFlexRow} ${commonStyles.fullWidth} ${commonStyles.justifyBetween}`}>
        <div />
        <button
          onClick={onClose}
          className={styles.closeButton}
        >
          <Icons.CloseIcon color={WHITE} size={MEDIUM} />
        </button>
      </div>

      {openapi && typeof openapi === 'string' && openapi !== 'null'
        ? <ApiReferenceReact configuration={{ content: openapi, showSidebar: false, customCss, baseServerURL }} />
        : <div className={`${typographyStyles.textWhite} ${typographyStyles.textCenter} ${styles.emptyOpenApi}`}><Icons.OpenAPIEditsIcon color={WHITE} size={MEDIUM} /><div className={`${typographyStyles.ellipsis} ${styles.emptyOpenApiTitle}`}>This service has no OpenAPI Schema</div><div className={`${styles.emptyOpenApiText}`}>This service cannot be tested because it doesn't expose a valid OpenAPI schema.<br />Open it at <a href={baseServerURL} target='_blank' rel='noopener noreferrer' className={`${typographyStyles.textWhite}`}>{baseServerURL}</a></div></div>}
    </div>
  )
}

interface ServiceProps {
  service: ServiceData;
  onServiceClick: (id: string) => void;
}

function Service ({ service, onServiceClick }: ServiceProps): React.ReactElement {
  const isOffline = getOfflineMode()
  return (
    <div className={`${commonStyles.tinyFlexRow} ${styles.serviceBox}`}>
      <BorderedBox
        classes={`${styles.servicePadding}`}
        color={TRANSPARENT}
        backgroundColor={RICH_BLACK}
        backgroundColorOpacity={OPACITY_100}
        internalOverHandling
        backgroundColorOpacityOver={isOffline ? OPACITY_100 : OPACITY_15}
        backgroundColorOver={isOffline ? RICH_BLACK : WHITE}
        clickable={!isOffline}
        onClick={isOffline ? undefined : () => onServiceClick(service.id)}
      >
        <div className={`${commonStyles.tinyFlexRow} ${commonStyles.fullWidth} ${commonStyles.flexGrow} ${styles.serviceContentRow}`}>
          <div className={`${commonStyles.tinyFlexBlock} ${commonStyles.fullWidth}`}>
            <div className={`${commonStyles.tinyFlexRow}`}>
              {
                getServiceEntrypoint(service)
                  ? <Icons.EntrypointIcon
                      color={WHITE}
                      size={SMALL}
                    />
                  : <Icons.ServiceIcon
                      color={WHITE}
                      size={SMALL}
                    />
              }
              <span className={`${typographyStyles.textWhite}`}>{service.id}</span>
              {getServiceEntrypoint(service) &&
                <span className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>App Entrypoint</span>}
            </div>
            <div className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>{'type' in service && <span>Service Type: {service.type}</span>} &nbsp;</div>
          </div>
          {!isOffline && <span className={`${typographyStyles.opacity70}`}><Icons.InternalLinkIcon color={WHITE} size={SMALL} /></span>}
        </div>
      </BorderedBox>
    </div>
  )
}

function ServicesBox (): React.ReactElement {
  const [error, setError] = useState<unknown>(undefined)
  const navigate = useNavigate()
  const [services, setServices] = useState<ServiceData[]>([])
  const { runtimePid, mode } = useAdminStore()
  const [selectedService, setSelectedService] = useState<string>('')
  const [openapi, setOpenapi] = useState<unknown>()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (runtimePid) {
          const response = await getServices(runtimePid, mode)
          setServices(response)
          setError(undefined)
        }
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [runtimePid, mode])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (selectedService && runtimePid) {
        const response = await getOpenApi(runtimePid, selectedService)
        setOpenapi(response)
      }
    }
    fetchData()
  }, [selectedService, runtimePid])

  const handleClosePanel = () => {
    setSelectedService('')
    navigate(HOME_PATH)
    setOpenapi('')
  }

  return (
    <>
      {error
        ? <ErrorComponent error={error} onClickDismiss={() => setError(undefined)} />
        : (
          <>
            <BorderedBox classes={`${styles.borderexBoxContainer}`} backgroundColor={BLACK_RUSSIAN} color={TRANSPARENT}>
              <div className={`${commonStyles.smallFlexBlock} ${commonStyles.fullWidth}`}>
                <div className={`${commonStyles.smallFlexRow} ${commonStyles.fullWidth} ${commonStyles.justifyBetween}`}>
                  <div className={`${commonStyles.tinyFlexRow} ${commonStyles.fullWidth}`}>
                    <Icons.ServiceIcon
                      color={WHITE}
                      size={MEDIUM}
                    />
                    <div className={styles.applicationName}>
                      <span className={`${typographyStyles.desktopBodySemibold} ${typographyStyles.textWhite} ${typographyStyles.ellipsis}`}>Services</span> <span className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>({services.length})</span>
                    </div>
                  </div>
                </div>
                <div className={`${commonStyles.tinyFlexRow} ${commonStyles.fullWidth} ${styles.flexWrap}`}>
                  {services.map((service) => (
                    <Service
                      key={service.id}
                      service={service}
                      onServiceClick={() => setSelectedService(service.id)}
                    />
                  ))}
                </div>
              </div>
            </BorderedBox>

            {selectedService && runtimePid && (
              <>
                <div
                  className={styles.overlay}
                  onClick={handleClosePanel}
                />
                <ServiceDetailPanel service={selectedService} pid={runtimePid} openapi={openapi} onClose={handleClosePanel} />
              </>
            )}
          </>)}
    </>
  )
}

export default ServicesBox
