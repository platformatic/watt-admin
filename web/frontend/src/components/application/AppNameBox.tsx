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
  const { mode, record, setRecord, runtimePid } = useAdminStore()
  const [appStatus, setAppStatus] = useState(STATUS_STOPPED)
  const [changingRestartStatus, setChangingRestartStatus] = useState(false)
  const [latestVersion, setLatestVersion] = useState('')
  const [savedFilePath, setSavedFilePath] = useState<string | null>(null)

  const handleCopyPath = async (): Promise<void> => {
    if (savedFilePath) {
      await navigator.clipboard.writeText(savedFilePath)
    }
  }

  const fetchData = async (): Promise<void> => {
    try {
      setLatestVersion(await isWattpmVersionOutdated(mode))
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

  if (!apiApplication || !runtimePid) return null
  const outdatedVersion = latestVersion !== apiApplication?.pltVersion

  return (
    <>
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
                  try {
                    const result = await updateMode(runtimePid, record)
                    await fetchData()
                    setRecord(record === 'start' ? 'stop' : 'start')
                    onModeUpdated()
                    const body = result.body as { path?: string } | undefined
                    if (record === 'stop' && body?.path) {
                      setSavedFilePath(body.path)
                    }
                  } catch (error) {
                    onErrorOccurred(error)
                  }
                }}
                color={WHITE}
                backgroundColor={TRANSPARENT}
                paddingClass={commonStyles.smallButtonPadding}
                platformaticIcon={{ iconName: record === 'start' ? 'DownloadIcon' : 'StopIcon', color: WHITE }}
                textClass={typographyStyles.desktopButtonSmall}
                internalOverHandling
                />
              </>}
          </div>
        </div>
        <div className={`${commonStyles.tinyFlexBlock} ${commonStyles.fullWidth} ${styles.appInnerBox}`}>
          <div className={styles.rowContainer}>
            <div className={`${commonStyles.smallFlexResponsiveRow}`}>
              {!apiApplication.pltVersion
                ? (<span className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>Current Watt Version: -</span>)
                : (
                  <>
                    <div className={`${commonStyles.tinyFlexRow} ${commonStyles.itemsCenter}`}>
                      <span className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>Current Watt Version: </span>
                      {apiApplication.pltVersion
                        ? (
                          <>
                            <span className={`${typographyStyles.desktopBodySmall} ${outdatedVersion ? typographyStyles.textWarningYellow : typographyStyles.textWhite}`}>{apiApplication.pltVersion}</span>
                            {outdatedVersion && (
                              <Tooltip
                                tooltipClassName={tooltipStyles.tooltipDarkStyle}
                                content={(<span>New Watt version available: <span className={`${typographyStyles.semibold}`}>{latestVersion}</span>.</span>)}
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
      {savedFilePath && (
        <div className={styles.modalOverlay} onClick={() => setSavedFilePath(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={`${typographyStyles.desktopBodyLargeSemibold} ${typographyStyles.textWhite}`}>Recording Saved</span>
              <PlatformaticIcon iconName='CloseIcon' color={WHITE} size={SMALL} onClick={() => setSavedFilePath(null)} internalOverHandling />
            </div>
            <div className={styles.modalBody}>
              <p className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite}`}>Recording opened in your browser. File saved at:</p>
              <div className={styles.pathContainer}>
                <code className={styles.filePath}>{savedFilePath}</code>
                <Button
                  type='button'
                  label='Copy'
                  onClick={handleCopyPath}
                  color={WHITE}
                  backgroundColor={TRANSPARENT}
                  paddingClass={commonStyles.smallButtonPadding}
                  platformaticIcon={{ iconName: 'CopyPasteIcon', color: WHITE }}
                  textClass={typographyStyles.desktopButtonSmall}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AppNameBox
