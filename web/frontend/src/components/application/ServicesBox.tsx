import React, { useState, useEffect } from 'react'
import { OPACITY_100, OPACITY_15, RICH_BLACK, WHITE, TRANSPARENT, MEDIUM, SMALL, BLACK_RUSSIAN } from '@platformatic/ui-components/src/components/constants'
import { ApiReferenceReact } from '@scalar/api-reference-react'
import styles from './ServicesBox.module.css'
import typographyStyles from '../../styles/Typography.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import { BorderedBox, Icons } from '@platformatic/ui-components'
import useAdminStore from '../../useAdminStore'
import { getOpenApi, getServices } from '../../api'
import { ServiceData } from 'src/types'
import ErrorComponent from '../errors/ErrorComponent'
import { HOME_PATH } from '../../ui-constants'
import { useNavigate } from 'react-router-dom'

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
        ? <ApiReferenceReact configuration={{ content: openapi, showSidebar: false, customCss, baseServerURL: `/api/proxy/${pid}/services/${service}` }} />
        : <div className={`${typographyStyles.textWhite} ${typographyStyles.textCenter} ${styles.emptyOpenApi}`}><Icons.OpenAPIEditsIcon color={WHITE} size={MEDIUM} /><div className={`${typographyStyles.ellipsis} ${styles.emptyOpenApiTitle}`}>This service has no OpenAPI Schema</div><div className={`${styles.emptyOpenApiText}`}>This service cannot be tested because it doesn't expose a valid OpenAPI schema.</div></div>}
    </div>
  )
}

interface ServiceProps {
  id: string;
  entrypoint?: boolean;
  type?: string;
  onServiceClick: (id: string) => void;
}

function Service ({ id, entrypoint, type, onServiceClick }: ServiceProps): React.ReactElement {
  return (
    <div className={`${commonStyles.tinyFlexRow} ${commonStyles.fullWidth} ${commonStyles.flexGrow}`}>
      <BorderedBox
        classes={`${styles.servicePadding}`}
        color={TRANSPARENT}
        backgroundColor={RICH_BLACK}
        backgroundColorOpacity={OPACITY_100}
        internalOverHandling
        backgroundColorOpacityOver={OPACITY_15}
        backgroundColorOver={WHITE}
        clickable
        onClick={() => onServiceClick(id)}
      >
        <div className={`${commonStyles.tinyFlexRow} ${commonStyles.fullWidth} ${commonStyles.flexGrow}`}>
          <div className={`${commonStyles.tinyFlexRow} ${commonStyles.fullWidth}`}>
            {
              entrypoint
                ? <Icons.EntrypointIcon
                    color={WHITE}
                    size={SMALL}
                  />
                : <Icons.ServiceIcon
                    color={WHITE}
                    size={SMALL}
                  />
            }
            <span className={`${typographyStyles.textWhite} ${commonStyles.bold}`}>{id}</span>
            {entrypoint &&
              <span className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>(Application Entrypoint)</span>}

            <span className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}> | &nbsp; Service Type: {type}</span>
          </div>
          <div className={`${styles.w45} ${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>Test it</div>
          <Icons.InternalLinkIcon className={`${typographyStyles.opacity70}`} color={WHITE} size={SMALL} />
        </div>
      </BorderedBox>
    </div>
  )
}

function ServicesBox (): React.ReactElement {
  const [error, setError] = useState<unknown>(undefined)
  const navigate = useNavigate()
  const [services, setServices] = useState<ServiceData[]>([])
  const { runtimePid } = useAdminStore()
  const [selectedService, setSelectedService] = useState<string>('')
  const [openapi, setOpenapi] = useState<unknown>()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (runtimePid) {
          const response = await getServices(runtimePid)
          setServices(response)
          setError(undefined)
        }
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [runtimePid])

  if (error) {
    return <ErrorComponent error={error} onClickDismiss={() => setError(undefined)} />
  }

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
      <BorderedBox classes={`${styles.borderexBoxContainer}`} backgroundColor={BLACK_RUSSIAN} color={TRANSPARENT}>
        <div className={`${commonStyles.smallFlexBlock} ${commonStyles.fullWidth}`}>
          <div className={`${commonStyles.smallFlexRow} ${commonStyles.fullWidth} ${commonStyles.justifyBetween}`}>
            <div className={`${commonStyles.tinyFlexRow} ${commonStyles.fullWidth}`}>
              <Icons.ServiceIcon
                color={WHITE}
                size={MEDIUM}
              />
              <div className={styles.applicationName}>
                <p className={`${typographyStyles.desktopBodySemibold} ${typographyStyles.textWhite} ${typographyStyles.ellipsis}`}>Services</p>
              </div>
            </div>
          </div>
          <div className={`${commonStyles.tinyFlexBlock} ${commonStyles.fullWidth}`}>
            {services.map(({ id, entrypoint, type }) => (
              <Service
                key={id}
                id={id}
                entrypoint={entrypoint}
                type={type}
                onServiceClick={() => setSelectedService(id)}
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
    </>
  )
}

export default ServicesBox
