import React, { useState, useEffect, useRef } from 'react'
import { useInterval } from '~/hooks/useInterval'
import { RICH_BLACK, WHITE, TRANSPARENT, MARGIN_0, OPACITY_15 } from '@platformatic/ui-components/src/components/constants'
import styles from './AppLogs.module.css'
import typographyStyles from '~/styles/Typography.module.css'
import commonStyles from '~/styles/CommonStyles.module.css'
import loadingSpinnerStyles from '~/styles/LoadingSpinnerStyles.module.css'
import { BorderedBox, Button, HorizontalSeparator, LoadingSpinnerV2 } from '@platformatic/ui-components'
import ErrorComponent from '~/components/errors/ErrorComponent'
import Log from './Log'
import {
  PRETTY,
  RAW,
  DIRECTION_UP,
  DIRECTION_DOWN,
  DIRECTION_STILL,
  DIRECTION_TAIL,
  STATUS_PAUSED_LOGS,
  STATUS_RESUMED_LOGS,
  REFRESH_INTERVAL_LOGS
} from '~/ui-constants'
import LogFilterSelector from './LogFilterSelector'
import useOnScreen from '~/hooks/useOnScreen'
import useAdminStore from '~/useAdminStore'
import { getLogs } from '../../api'

const AppLogs = ({ filteredServices }) => {
  const { runtimePid } = useAdminStore()
  const [displayLog, setDisplayLog] = useState(PRETTY)
  const [loading, setLoading] = useState(true)
  const [filterLogsByLevel, setFilterLogsByLevel] = useState('')
  const [scrollDirection, setScrollDirection] = useState(DIRECTION_TAIL)
  const [applicationLogs, setApplicationLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState([])
  const [filtersInitialized, setFiltersInitialized] = useState(false)
  const logContentRef = useRef()
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [displayGoToBottom, setDisplayGoToBottom] = useState(false)
  const [statusPausedLogs, setStatusPausedLogs] = useState('')
  const [filteredLogsLengthAtPause, setFilteredLogsLengthAtPause] = useState(0)
  const bottomRef = useRef()
  const isBottomOnScreen = useOnScreen(bottomRef)
  const [error, setError] = useState('')

  useEffect(() => {
    if (logContentRef.current && scrollDirection === DIRECTION_TAIL && filteredLogs.length > 0) {
      logContentRef.current.scrollTo({
        top: logContentRef.current.scrollHeight,
        left: 0,
        behavior: 'smooth'
      })
      if (statusPausedLogs === STATUS_PAUSED_LOGS) {
        setStatusPausedLogs(STATUS_RESUMED_LOGS)
      }
    }
    if (scrollDirection !== DIRECTION_TAIL) {
      setFilteredLogsLengthAtPause(filteredLogs.length)
    }
  }, [logContentRef, scrollDirection, filteredLogs])

  useEffect(() => {
    if (statusPausedLogs) {
      switch (statusPausedLogs) {
        case STATUS_PAUSED_LOGS:
          // callApiPauseLogs()
          console.log('pause TODO')
          break

        case STATUS_RESUMED_LOGS:
          console.log('resume TODO')
          // callApiResumeLogs()
          break

        default:
          break
      }
    }
  }, [statusPausedLogs])

  useEffect(() => {
    if (isBottomOnScreen && scrollDirection === DIRECTION_DOWN) {
      resumeScrolling()
    }
  }, [isBottomOnScreen, scrollDirection])

  useEffect(() => {
    if (applicationLogs.length > 0) {
      if (!filtersInitialized) {
        setFilterLogsByLevel(30)
        setFiltersInitialized(true)
        return
      }
      if (filterLogsByLevel || filteredServices.length >= 0) {
        let founds = [...applicationLogs]
        if (filterLogsByLevel) {
          founds = founds.filter(log => log.level >= filterLogsByLevel)
        }
        if (filteredServices.length >= 0) {
          founds = founds.filter(log => filteredServices.includes(log.name))
        }
        setFilteredLogs(founds)
      } else {
        setFilteredLogs([...applicationLogs])
      }
    }
  }, [
    applicationLogs,
    filtersInitialized,
    filterLogsByLevel,
    filteredServices
  ])

  const getData = async () => {
    try {
      if (runtimePid) {
        const logs = await getLogs(runtimePid)
        setApplicationLogs(logs)
        setError('')
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useInterval(() => { getData() }, REFRESH_INTERVAL_LOGS)
  useEffect(() => { getData() }, [runtimePid])

  useEffect(() => {
    if (scrollDirection !== DIRECTION_TAIL && filteredLogsLengthAtPause > 0 && filteredLogsLengthAtPause < filteredLogs.length) {
      setDisplayGoToBottom(true)
    }
  }, [scrollDirection, filteredLogs.length, filteredLogsLengthAtPause])

  function resumeScrolling () {
    setScrollDirection(DIRECTION_TAIL)
    setDisplayGoToBottom(false)
    setFilteredLogsLengthAtPause(0)
  }

  function saveLogs () {
    let fileData = ''
    applicationLogs.forEach(log => {
      fileData += `${log}
`
    })

    const blob = new Blob([fileData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `${new Date().toISOString()}.logs`
    link.href = url
    link.target = '_blank'
    link.click()
  }

  function handlingClickArrow () {
    setScrollDirection(DIRECTION_STILL)
    setFilteredLogsLengthAtPause(filteredLogs.length)
  }

  function renderLogs () {
    if (displayLog === PRETTY) {
      return filteredLogs.map((log, index) => <Log key={`${index}-${filterLogsByLevel}`} log={log} display={displayLog} onClickArrow={() => handlingClickArrow()} />)
    }

    return (
      <span className={`${typographyStyles.desktopOtherCliTerminalSmall} ${typographyStyles.textWhite}`}>
        {filteredLogs}
      </span>
    )
  }

  function handleScroll (event) {
    const st = event.currentTarget.scrollTop // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop) {
      // downscroll code
      if (scrollDirection !== DIRECTION_TAIL) {
        setScrollDirection(DIRECTION_DOWN)
      }
    } else if (st < lastScrollTop) {
      // upscroll code
      setScrollDirection(DIRECTION_UP)
    }
    setLastScrollTop(st <= 0 ? 0 : st)
  }

  if (error) {
    return <ErrorComponent error={error} onClickDismiss={() => setError('')} />
  }

  if (loading) {
    return (
      <LoadingSpinnerV2
        loading
        applySentences={{
          containerClassName: `${commonStyles.mediumFlexBlock} ${commonStyles.itemsCenter}`,
          sentences: []
        }}
        containerClassName={loadingSpinnerStyles.loadingSpinner}
        spinnerProps={{ size: 40, thickness: 3 }}
      />
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={`${commonStyles.largeFlexBlock} ${commonStyles.fullWidth} ${styles.flexGrow}`}>
          <BorderedBox classes={styles.borderexBoxPodContainer} backgroundColor={RICH_BLACK} color={TRANSPARENT}>
            <div className={`${commonStyles.tinyFlexRow} ${commonStyles.itemsCenter} ${commonStyles.justifyBetween} ${styles.lateralPadding} ${styles.top}`}>
              <span className={styles.select}>&nbsp;</span>
              <LogFilterSelector defaultLevelSelected={30} onChangeLevelSelected={(level) => setFilterLogsByLevel(level)} />
              <div className={`${commonStyles.tinyFlexRow} ${commonStyles.justifyEnd} ${styles.buttonContainer}`}>
                <Button
                  type='button'
                  paddingClass={commonStyles.smallButtonPadding}
                  label='Pretty'
                  onClick={() => setDisplayLog(PRETTY)}
                  color={WHITE}
                  backgroundColor={RICH_BLACK}
                  selected={displayLog === PRETTY}
                  textClass={typographyStyles.desktopButtonSmall}
                />
                <Button
                  type='button'
                  paddingClass={commonStyles.smallButtonPadding}
                  label='Raw'
                  onClick={() => setDisplayLog(RAW)}
                  color={WHITE}
                  backgroundColor={TRANSPARENT}
                  selected={displayLog === RAW}
                  textClass={typographyStyles.desktopButtonSmall}
                />
              </div>
            </div>
            <HorizontalSeparator marginBottom={MARGIN_0} color={WHITE} opacity={OPACITY_15} />
            <div className={`${styles.logsContainer} ${styles.lateralPadding}`} ref={logContentRef} onScroll={handleScroll}>
              {filteredLogs?.length > 0 && (
                <>
                  <hr className={styles.logDividerTop} />
                  {renderLogs()}
                </>
              )}
              <div ref={bottomRef} className={styles.logDividerBottom} />
            </div>
            <HorizontalSeparator marginTop={MARGIN_0} color={WHITE} opacity={OPACITY_15} />
            <div className={`${commonStyles.tinyFlexRow} ${commonStyles.itemsCenter} ${commonStyles.justifyBetween} ${styles.lateralPadding} ${styles.bottom}`}>
              <div>&nbsp;</div>

              {displayGoToBottom
                ? (
                  <p className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite}`}>There are new logs. <span className={`${commonStyles.cursorPointer} ${typographyStyles.textTertiaryBlue}`} onClick={() => resumeScrolling()}>Go to the bottom</span> to resume</p>
                  )
                : (
                  <p className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textRichBlack}`}>There are new logs. Go to the bottom to resume</p>
                  )}
              <Button
                type='button'
                paddingClass={commonStyles.smallButtonPadding}
                label='Save Logs'
                onClick={() => saveLogs()}
                color={WHITE}
                backgroundColor={TRANSPARENT}
                textClass={typographyStyles.desktopButtonSmall}
              />
            </div>

          </BorderedBox>
        </div>
      </div>
    </div>
  )
}

export default AppLogs
