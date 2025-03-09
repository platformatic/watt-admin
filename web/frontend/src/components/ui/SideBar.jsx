import React from 'react'
import typographyStyles from '~/styles/Typography.module.css'
import commonStyles from '~/styles/CommonStyles.module.css'
import styles from './SideBar.module.css'
import ButtonSidebar from '~/components/ui/ButtonSidebar'
import { DIRECTION_RIGHT, MEDIUM, POSITION_CENTER, TRANSPARENT, WHITE } from '@platformatic/ui-components/src/components/constants'
import { TooltipAbsolute } from '@platformatic/ui-components'

function renderButton (item, selected) {
  return (
    <div
      className={`${commonStyles.tinyFlexBlock} ${commonStyles.itemsCenter} ${styles.item} ${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.textCenter}`}
    >
      <ButtonSidebar
        altLabel={item.label}
        paddingClass={commonStyles.buttonSquarePadding}
        color={WHITE}
        backgroundColor={TRANSPARENT}
        onClick={() => item.onClick()}
        platformaticIcon={{ size: MEDIUM, iconName: item.iconName, color: WHITE }}
        selected={selected === item.name}
        disabled={item.disabled || false}
        bordered={false}
        fullRounded
      />
    </div>

  )
}
function SideBar ({
  selected = '',
  topItems = [],
  bottomItems = []
}) {
  function Item ({ item }) {
    if (item.disabled) {
      return (
        renderButton(item, selected)
      )
    }

    return (
      <TooltipAbsolute
        tooltipClassName={styles.tooltipSidebar}
        content={(<span className={`${typographyStyles.desktopBodySmallest}`}>{item.label}</span>)}
        offset={10}
        position={POSITION_CENTER}
        direction={DIRECTION_RIGHT}
      >
        {renderButton(item, selected)}
      </TooltipAbsolute>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {topItems.map((item, index) => <Item item={item} key={index} />)}
      </div>
      <div className={styles.content}>
        {bottomItems.map((item, index) => <Item item={item} key={index} />)}
      </div>
    </div>
  )
}

export default SideBar
