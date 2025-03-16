import React, { useEffect, useState } from 'react'
import typographyStyles from '../../styles/Typography.module.css'
import styles from './Log.module.css'
import { CopyAndPaste, PlatformaticIcon } from '@platformatic/ui-components'
import { WHITE, SMALL, POSITION_END } from '@platformatic/ui-components/src/components/constants'
import { getFormattedLogTimestamp } from '../../utilities/dates'
import tooltipStyles from '../../styles/TooltipStyles.module.css'

interface LogProps {
  log: {
    level: number;
    time: string | number | Date;
    pid?: number;
    name: string;
    msg: string;
    reqId?: string;
    req?: {
      method?: string;
      url?: string;
      [key: string]: unknown;
    };
    hostname?: string;
    responseTime?: number;
    [key: string]: unknown;
  };
  onClickArrow: () => void;
}

function Log({ log, onClickArrow }: LogProps): React.ReactElement {
  const [displayJson, setDisplayJson] = useState(false)
  const [logContainerClassName, setLogContainerClassName] = useState(normalClassName())
  const { level, time, pid, name, msg, reqId, req, hostname, responseTime, ...rest } = log
  const levelDisplayed = getLevel(level)
  let msgClassName = `${styles.msg} `
  msgClassName += styles[`text${level}`]

  function getLevel(level: number): string {
    return {
      10: 'TRACE',
      20: 'DEBUG',
      30: 'INFO',
      40: 'WARN',
      50: 'ERROR',
      60: 'FATAL'
    }[level] || ''
  }

  const logClassName = `${styles.log} ` + styles[`log${level}`]

  useEffect(() => {
    if (displayJson) {
      setLogContainerClassName(activeClassName())
    } else {
      setLogContainerClassName(normalClassName())
    }
  }, [displayJson])

  function handleChangeDisplayView(): void {
    setDisplayJson(!displayJson)
    onClickArrow()
  }

  function normalClassName(): string {
    return `${styles.logContainerClassNameInactive} ${typographyStyles.desktopOtherCliTerminalSmall} ${typographyStyles.textWhite} `
  }

  function activeClassName(): string {
    return `${styles.logContainerClassNameActive} ${typographyStyles.desktopOtherCliTerminalSmall} ${typographyStyles.textWhite} ` + styles[`logContainerClassNameActive${level}`]
  }

  function cleanElement(element: string): string {
    return element.replace(/[{}\n]/g, '').replace('"', '').replace('"', '')
  }

  function cleanJson(element: string): string {
    return element.replace(/(^{\n|}$)/g, '').replace('"', '').replace('"', '')
  }

  function checkDisabledArrow(): boolean {
    return !(reqId || (req && Object.keys(req)?.length > 0) || (rest && Object.keys(rest)?.length > 0))
  }

  function displayRest(): React.ReactElement[] {
    if (!rest) return []
    let variable: any
    const content: React.ReactElement[] = []
    let tmp: Record<string, any> = {}

    Object.keys(rest).forEach(k => {
      variable = rest[k]
      tmp = {}
      tmp[k] = variable

      if (typeof variable === 'object' && variable !== null) {
        content.push(
          <div key={k} className={`${typographyStyles.desktopOtherCliTerminalSmall} ${typographyStyles.textWhite} ${styles.textLog}`}>
            <pre>{cleanJson(JSON.stringify(tmp, null, 2))}</pre>
          </div>
        )
      } else {
        content.push(
          <div key={k} className={`${typographyStyles.desktopOtherCliTerminalSmall} ${typographyStyles.textWhite} ${styles.textLog}`}>
            <pre>{cleanElement(JSON.stringify(tmp, null, 2))}</pre>
          </div>
        )
      }
    })
    return content
  }

  return (
    <div className={logContainerClassName}>
      <div className={logClassName}>
        <PlatformaticIcon iconName={displayJson ? 'ArrowDownIcon' : 'ArrowRightIcon'} color={WHITE} size={SMALL} onClick={() => handleChangeDisplayView()} disabled={checkDisabledArrow()} />
        <span>{getFormattedLogTimestamp(time)}</span>
        <span className={styles[`text${level}`]}>{levelDisplayed}</span>
        <span>-</span>
        <span>{name}</span>
        {reqId &&
          <>
            <span>-</span>
            <span>"..{reqId.substr(-4)}"</span>
          </>}
        {req &&
          <>
            <span>-</span>
            <span className={styles.request}>{req.method} {req.url} </span>
          </>}
        <span className={msgClassName}>{msg}</span>
      </div>
      {displayJson && (
        <>
          <div className={styles.copyPasteIcon}>
            <CopyAndPaste value={log} tooltipLabel='Log copied!' color={WHITE} size={SMALL} tooltipClassName={tooltipStyles.tooltipDarkStyle} position={POSITION_END} />
          </div>
          <div className={styles.displayedElements}>
            <div className={`${typographyStyles.desktopOtherCliTerminalSmall} ${typographyStyles.textWhite} ${styles.textLog}`} key='reqId'>
              <pre>{cleanElement(JSON.stringify({ reqId }, null, 2))}</pre>
            </div>
            {req && (
              <div className={`${typographyStyles.desktopOtherCliTerminalSmall} ${typographyStyles.textWhite} ${styles.textLog}`} key='req'>
                <pre>{cleanJson(JSON.stringify({ req }, null, 2))}</pre>
              </div>)}
            {displayRest()}
          </div>
        </>
      )}
    </div>
  )
}

export default Log