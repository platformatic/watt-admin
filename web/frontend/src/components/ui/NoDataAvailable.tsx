import React from 'react'
import typographyStyles from '../../styles/Typography.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import styles from './NoDataAvailable.module.css'
import { Icons } from '@platformatic/ui-components'
import { MEDIUM, WHITE } from '@platformatic/ui-components/src/components/constants'

interface NoDataAvailableProps {
  iconName?: string;
}

function NoDataAvailable ({ iconName = '' }: NoDataAvailableProps): React.ReactElement {
  function getIcon (): React.ReactNode {
    if (iconName) {
      return React.createElement(Icons[iconName], {
        color: WHITE,
        size: MEDIUM
      })
    }
    return <></>
  }

  return (
    <div className={styles.noDataContainer}>
      {getIcon()}
      <p className={`${commonStyles.fullWidth} ${typographyStyles.textCenter} ${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>No Data Available</p>
    </div>
  )
}

export default NoDataAvailable
