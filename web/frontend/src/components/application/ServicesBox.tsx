import React, { useState, useEffect } from 'react'
import { OPACITY_100, OPACITY_15, RICH_BLACK, WHITE, TRANSPARENT, MEDIUM, SMALL, BLACK_RUSSIAN } from '@platformatic/ui-components/src/components/constants'
import styles from './ServicesBox.module.css'
import typographyStyles from '../../styles/Typography.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import { BorderedBox, Icons } from '@platformatic/ui-components'
import useAdminStore from '../../useAdminStore'
import { getServices } from '../../api'
import { ServiceData } from 'src/types'
import ErrorComponent from '../errors/ErrorComponent'

interface ServiceProps {
  id: string;
  entrypoint?: boolean;
  type?: string;
}

function Service ({ id, entrypoint, type }: ServiceProps): React.ReactElement {
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
        onClick={() => console.log('to be implemented!')}
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
  const [services, setServices] = useState<ServiceData[]>([])
  const { runtimePid } = useAdminStore()

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

  return (
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
          {services.map(({ id, entrypoint, type }) => <Service key={id} id={id} entrypoint={entrypoint} type={type} />)}
        </div>
      </div>
    </BorderedBox>
  )
}

export default ServicesBox
