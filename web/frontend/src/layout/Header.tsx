import React from 'react'
import styles from './Header.module.css'
import commonStyles from '../styles/CommonStyles.module.css'
import { HorizontalSeparator } from '@platformatic/ui-components'
import { WHITE, MARGIN_0, OPACITY_15 } from '@platformatic/ui-components/src/components/constants'
import Navigation from './Navigation'
import { useNavigate } from 'react-router-dom'
import { HOME_PATH } from '../ui-constants'
import useAdminStore from '../useAdminStore'
import Logo from '../components/ui/Logo'

function Header(): React.ReactElement {
  const navigate = useNavigate()
  const globalState = useAdminStore()
  const { setCurrentPage, setNavigation } = globalState

  function goToHome(): void {
    navigate(HOME_PATH)
    setCurrentPage(HOME_PATH)
    setNavigation({ label: 'Overview', key: HOME_PATH, page: HOME_PATH })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={commonStyles.mediumFlexRow}>
          <div className={commonStyles.cursorPointer} onClick={() => goToHome()}>
            <Logo width={40} height={27.7} />
          </div>

          <Navigation />
        </div>
      </div>
      <HorizontalSeparator marginBottom={MARGIN_0} marginTop={MARGIN_0} color={WHITE} opacity={OPACITY_15} />
    </div>
  )
}

export default Header