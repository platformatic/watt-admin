import React, { useState, useEffect } from 'react'
import { WARNING_YELLOW, WHITE, TRANSPARENT, SMALL, BLACK_RUSSIAN, MEDIUM } from '@platformatic/ui-components/src/components/constants'
import styles from './AppNameBox.module.css'
import typographyStyles from '~/styles/Typography.module.css'
import commonStyles from '~/styles/CommonStyles.module.css'
import tooltipStyles from '~/styles/TooltipStyles.module.css'
import { BorderedBox, Button, PlatformaticIcon, Tooltip } from '@platformatic/ui-components'
import { getFormattedDate } from '~/utilities/dates'
import { STATUS_STOPPED, STATUS_RUNNING } from '~/ui-constants'
import Icons from '@platformatic/ui-components/src/components/icons'
import ApplicationStatusPills from '~/components/ui/ApplicationStatusPills'
import { restartApiApplication, isWattpmVersionOutdated } from '../../api'

function AppNameBox ({
  onErrorOccurred = () => {},
  apiApplication
}) {
  const [appStatus, setAppStatus] = useState(STATUS_STOPPED)
  const [changingRestartStatus, setChangingRestartStatus] = useState(false)
  const [outdatedVersion, setOutdatedVersion] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const outdated = await isWattpmVersionOutdated(apiApplication?.pltVersion)
        setOutdatedVersion(outdated)
      } catch (e) {
        console.error('Unable to get version', e)
      }
    }

    if (apiApplication?.id > 0) {
      setAppStatus(STATUS_RUNNING)
      fetchData()
    }
  }, [apiApplication?.id])

  async function handleRestartApplication () {
    try {
      setChangingRestartStatus(true)
      await restartApiApplication(apiApplication.id)
    } catch (error) {
      console.error(`Error on handleRestartApplication ${error}`)
      onErrorOccurred(error)
    } finally {
      setChangingRestartStatus(false)
    }
  }

  return apiApplication && (
    <BorderedBox classes={`${styles.borderexBoxContainer}`} backgroundColor={BLACK_RUSSIAN} color={TRANSPARENT}>
      <div className={`${commonStyles.smallFlexBlock} ${commonStyles.fullWidth}`}>
        <div className={`${commonStyles.smallFlexResponsiveRow} ${commonStyles.fullWidth}`}>
          <div className={`${commonStyles.tinyFlexResponsiveRow} ${commonStyles.fullWidth}`}>
            <div className={commonStyles.tinyFlexRow}>
              <Icons.AppIcon
                color={WHITE}
                size={MEDIUM}
              />
              <div className={styles.applicationName}>
                <p className={`${typographyStyles.desktopBodyLargeSemibold} ${typographyStyles.textWhite} ${typographyStyles.ellipsis}`}>{apiApplication.name}</p>
              </div>
            </div>
            {appStatus && <ApplicationStatusPills status={appStatus} />}
          </div>
          <div className={styles.buttonContainer}>
            {changingRestartStatus
              ? (
                <Button
                  type='button'
                  label='Restarting...'
                  onClick={() => {}}
                  color={WHITE}
                  backgroundColor={TRANSPARENT}
                  paddingClass={commonStyles.smallButtonPadding}
                  platformaticIcon={{ iconName: 'RestartIcon', color: WHITE }}
                  textClass={typographyStyles.desktopButtonSmall}
                />
                )
              : (
                <Button
                  type='button'
                  label='Restart'
                  onClick={() => handleRestartApplication()}
                  color={WHITE}
                  backgroundColor={TRANSPARENT}
                  paddingClass={commonStyles.smallButtonPadding}
                  platformaticIcon={{ iconName: 'RestartIcon', color: WHITE }}
                  textClass={typographyStyles.desktopButtonSmall}
                  disabled={appStatus === STATUS_STOPPED}
                />
                )}

          </div>
        </div>
        <div className={`${commonStyles.tinyFlexBlock} ${commonStyles.fullWidth} ${styles.appInnerBox}`}>
          <div className={styles.rowContainer}>
            <div className={`${commonStyles.tinyFlexRow} ${commonStyles.itemsCenter}`}>
              <span className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>Last Started:</span>
              <span className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite}`}>{getFormattedDate(apiApplication.lastStarted)}</span>
            </div>
          </div>
          <div className={styles.rowContainer}>
            <div className={`${commonStyles.smallFlexResponsiveRow}`}>
              {!apiApplication.pltVersion
                ? (<span className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>Current Runtime Version: -</span>)
                : (
                  <>
                    <div className={`${commonStyles.tinyFlexRow} ${commonStyles.itemsCenter}`}>
                      <span className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>Current Runtime Version: </span>
                      {apiApplication.pltVersion
                        ? (
                          <>
                            <span className={`${typographyStyles.desktopBodySmall} ${outdatedVersion ? typographyStyles.textWarningYellow : typographyStyles.textWhite}`}>{apiApplication.pltVersion}</span>
                            {outdatedVersion && (
                              <Tooltip
                                tooltipClassName={tooltipStyles.tooltipDarkStyle}
                                content={(<span>There is a new Platformatic/Watt version.</span>)}
                                offset={24}
                                immediateActive={false}
                              >
                                <PlatformaticIcon iconName='AlertIcon' color={WARNING_YELLOW} size={SMALL} internalOverHandling />
                              </Tooltip>
                            )}
                          </>)
                        : (<span className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>-</span>)}
                    </div>
                  </>
                  )}
            </div>
          </div>

          <div className={styles.rowContainer}>
            <div className={`${commonStyles.tinyFlexRow} ${commonStyles.itemsCenter}`}>
              <span className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>URL:</span>
              <span className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite}`}>{apiApplication.url} </span>
              <PlatformaticIcon iconName='ExpandIcon' color={WHITE} size={SMALL} onClick={() => window.open(apiApplication.url, '_blank')} internalOverHandling disabled={apiApplication.url === ''} />
            </div>
          </div>
        </div>
      </div>
    </BorderedBox>
  )
}

export default AppNameBox
