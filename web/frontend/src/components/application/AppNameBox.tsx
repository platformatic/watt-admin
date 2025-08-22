import React, { useState, useEffect } from 'react'
import { WARNING_YELLOW, WHITE, TRANSPARENT, SMALL, BLACK_RUSSIAN, MEDIUM } from '@platformatic/ui-components/src/components/constants'
import styles from './AppNameBox.module.css'
import typographyStyles from '../../styles/Typography.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import tooltipStyles from '../../styles/TooltipStyles.module.css'
import { Icons, BorderedBox, Button, PlatformaticIcon, Tooltip } from '@platformatic/ui-components'
import { STATUS_STOPPED, STATUS_RUNNING } from '../../ui-constants'
import ApplicationStatusPills from '../ui/ApplicationStatusPills'
import { restartApiApplication, isWattpmVersionOutdated, updateMode } from '../../api'
import useAdminStore from '../../useAdminStore'
import { getOfflineMode } from '../../utilities/getters'

export interface ApiApplication {
  id: number;
  name: string;
  pltVersion?: string;
  lastStarted: string | Date;
  url: string;
}

interface AppNameBoxProps {
  onErrorOccurred: (error: unknown) => void;
  onModeUpdated: () => void;
  apiApplication?: ApiApplication;
}

function AppNameBox ({
  onErrorOccurred,
  onModeUpdated,
  apiApplication
}: AppNameBoxProps): React.ReactElement | null {
  const { mode, setMode, record, setRecord } = useAdminStore()
  const [appStatus, setAppStatus] = useState(STATUS_STOPPED)
  const [changingRestartStatus, setChangingRestartStatus] = useState(false)
  const [outdatedVersion, setOutdatedVersion] = useState(false)

  const fetchData = async (): Promise<void> => {
    try {
      const outdated = await isWattpmVersionOutdated(mode, apiApplication?.pltVersion)
      setOutdatedVersion(outdated)
    } catch (e) {
      onErrorOccurred(e)
    }
  }

  useEffect(() => {
    if (apiApplication?.id) {
      setAppStatus(getOfflineMode() ? STATUS_STOPPED : STATUS_RUNNING)
      fetchData()
    }
  }, [apiApplication?.id])

  async function handleRestartApplication (): Promise<void> {
    try {
      setChangingRestartStatus(true)
      if (apiApplication?.id) {
        await restartApiApplication(apiApplication.id)
      }
    } catch (error) {
      onErrorOccurred(error)
    } finally {
      setChangingRestartStatus(false)
    }
  }

  if (!apiApplication) return null

  return (
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

            {!getOfflineMode() &&
              <><Button
                type='button'
                label={`Record ${record}`}
                onClick={async () => {
                  await updateMode(record)
                  await fetchData()
                  setRecord(record === 'start' ? 'stop' : 'start')
                  onModeUpdated()
                }}
                color={WHITE}
                backgroundColor={TRANSPARENT}
                paddingClass={commonStyles.smallButtonPadding}
                platformaticIcon={{ iconName: record === 'start' ? 'DownloadIcon' : 'StopIcon', color: WHITE }}
                textClass={typographyStyles.desktopButtonSmall}
                internalOverHandling
                />
                <Button
                  type='button'
                  label={mode === 'load' ? 'Live' : 'Load'}
                  onClick={() => {
                    setMode(mode === 'load' ? 'live' : 'load')
                    onModeUpdated()
                  }}
                  color={WHITE}
                  backgroundColor={TRANSPARENT}
                  paddingClass={commonStyles.smallButtonPadding}
                  platformaticIcon={{ iconName: mode === 'load' ? 'UploadFileIcon' : 'LiveIcon', color: WHITE }}
                  textClass={typographyStyles.desktopButtonSmall}
                />
              </>}
          </div>
        </div>
        <div className={`${commonStyles.tinyFlexBlock} ${commonStyles.fullWidth} ${styles.appInnerBox}`}>
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
                      <span className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}> &nbsp; | &nbsp; </span>
                      <span className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>URL:</span>
                      <span className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite}`}>{apiApplication.url} </span>
                      <PlatformaticIcon iconName='ExpandIcon' color={WHITE} size={SMALL} onClick={() => window.open(apiApplication.url, '_blank')} internalOverHandling disabled={apiApplication.url === ''} />
                    </div>
                  </>
                  )}
            </div>
          </div>
        </div>
      </div>
    </BorderedBox>
  )
}

export default AppNameBox
