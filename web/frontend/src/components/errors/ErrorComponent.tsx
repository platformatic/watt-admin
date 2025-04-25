import React, { useState } from 'react'
import typographyStyles from '../../styles/Typography.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import styles from './ErrorComponent.module.css'
import { ANTI_FLASH_WHITE, DULLS_BACKGROUND_COLOR, ERROR_RED, LARGE, SMALL, RICH_BLACK, WHITE, TRANSPARENT, OPACITY_30, MARGIN_0 } from '@platformatic/ui-components/src/components/constants'
import { Icons, BorderedBox, Button, HorizontalSeparator, Tooltip } from '@platformatic/ui-components'
import tooltipStyles from '../../styles/TooltipStyles.module.css'

interface ErrorComponentProps {
  error?: unknown;
  onClickDismiss?: () => void;
  containerClassName?: string;
}

function ErrorComponent ({
  error,
  onClickDismiss = () => {},
  containerClassName = ''
}: ErrorComponentProps): React.ReactElement {
  const [showLogs, setShowLogs] = useState(false)
  const [logsCopied, setLogsCopied] = useState(false)
  const stack = error instanceof Error ? error.stack : ''
  const [errorStack] = useState(stack?.split('\n') || [])

  function copyLogs (): void {
    setLogsCopied(true)
    navigator.clipboard.writeText(stack || '')
    setTimeout(() => {
      setLogsCopied(false)
    }, 1000)
  }

  function getButtonCopyIcon (): { iconName: string; size: string; color: string } {
    if (logsCopied) {
      return { iconName: 'CircleCheckMarkIcon', size: SMALL, color: WHITE }
    }
    return { iconName: 'CLIIcon', size: SMALL, color: WHITE }
  }

  return (
    <div className={containerClassName || styles.container}>
      <div className={`${commonStyles.largeFlexBlock} ${commonStyles.fullWidth} ${commonStyles.itemsCenter}`}>
        <div className={`${commonStyles.mediumFlexBlock} ${commonStyles.fullWidth} ${commonStyles.itemsCenter}`}>
          <Icons.AlertIcon size={LARGE} color={ERROR_RED} />
          <div className={`${commonStyles.tinyFlexBlock} ${commonStyles.fullWidth} ${commonStyles.justifyCenter}`}>
            <p className={`${typographyStyles.desktopBodyLarge} ${typographyStyles.textWhite} ${typographyStyles.textCenter} ${commonStyles.fullWidth}`}>
              Something went wrong!
            </p>
            <p className={`${typographyStyles.desktopBody} ${typographyStyles.textWhite} ${typographyStyles.opacity70} ${typographyStyles.textCenter} ${commonStyles.fullWidth}`}>
              Please check your logs below.
            </p>
          </div>
        </div>
        <div className={`${styles.buttonContainer} ${commonStyles.fullWidth}`}>
          <Button
            textClass={typographyStyles.desktopButtonSmall}
            label='Dismiss'
            onClick={() => onClickDismiss()}
            color={RICH_BLACK}
            backgroundColor={WHITE}
            paddingClass={`${commonStyles.buttonPadding} cy-action-dismiss`}
            hoverEffect={DULLS_BACKGROUND_COLOR}
            hoverEffectProperties={{ changeBackgroundColor: ANTI_FLASH_WHITE }}
            bordered={false}
          />
          {errorStack.length > 0 && (
            <Button
              label={showLogs ? 'Hide logs' : 'Show Logs'}
              onClick={() => setShowLogs(!showLogs)}
              color={WHITE}
              backgroundColor={RICH_BLACK}
              paddingClass={`${commonStyles.buttonPadding} cy-action-dismiss`}
              textClass={typographyStyles.desktopButtonSmall}
              platformaticIconAfter={{ iconName: showLogs ? 'ArrowUpIcon' : 'ArrowDownIcon', size: SMALL, color: WHITE }}
            />
          )}
        </div>
      </div>
      {showLogs && (
        <BorderedBox color={WHITE} borderColorOpacity={OPACITY_30} backgroundColor={TRANSPARENT} classes={styles.showedLogsContainer}>
          <div className={`${styles.buttonLogsContainer} ${commonStyles.fullWidth}`}>
            <Tooltip
              tooltipClassName={tooltipStyles.tooltipDarkStyle}
              visible={logsCopied}
              content={(<span>Logs copied!</span>)}
              offset={4}
              activeDependsOnVisible
            >
              <Button
                label='Copy Logs'
                onClick={() => copyLogs()}
                color={WHITE}
                backgroundColor={RICH_BLACK}
                paddingClass={`${commonStyles.buttonPadding} cy-action-dismiss`}
                textClass={`${typographyStyles.desktopButtonSmall} action-copy-logs`}
                platformaticIcon={getButtonCopyIcon()}
              />
            </Tooltip>
          </div>
          <HorizontalSeparator marginTop={MARGIN_0} marginBottom={MARGIN_0} color={WHITE} opacity={OPACITY_30} />
          <div className={`${styles.logContainer} ${typographyStyles.desktopOtherCliTerminalSmall} ${typographyStyles.textWhite}`}>
            {errorStack.map((s: string, index: number) => <p key={index}>{s}</p>)}
          </div>
        </BorderedBox>
      )}
    </div>
  )
}

export default ErrorComponent
