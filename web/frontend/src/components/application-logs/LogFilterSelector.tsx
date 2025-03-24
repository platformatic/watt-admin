import React, { useEffect, useState } from 'react'
import styles from './LogFilterSelector.module.css'
import typographyStyles from '../../styles/Typography.module.css'

interface LogButtonProps {
  level?: number;
  levelName?: string;
  levelSelected?: number;
  onClickLevel?: () => void;
}

function LogButton ({
  level = 10,
  levelName = '',
  levelSelected = 10,
  onClickLevel = () => {}
}: LogButtonProps): React.ReactElement {
  const [hover, setHover] = useState(false)
  const [classNamePoint, setClassNamePoint] = useState(styles.point + ' ' + styles[`${levelName}Point`])
  const [classNameContainer, setClassNameContainer] = useState(`${styles.buttonLevel} ${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite}`)

  useEffect(() => {
    if (levelSelected > level) {
      if (hover) {
        setClassNamePoint(styles.point + ' ' + styles[`${levelName}Point`])
        setClassNameContainer(`${styles.buttonLevel} ${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite}`)
      } else {
        setClassNamePoint(styles.point + ' ' + styles[`${levelName}Point`] + ' ' + styles.inactivePoint)
        setClassNameContainer(`${styles.buttonLevel} ${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`)
      }
    }
    if (levelSelected === level) {
      setClassNamePoint(styles.point + ' ' + styles[`${levelName}Point`] + ' ' + styles.selectedPoint)
    } else {
      setClassNamePoint(styles.point + ' ' + styles[`${levelName}Point`])
    }
  }, [levelSelected, hover])

  return (
    <div className={classNameContainer} onClick={onClickLevel} key={level} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {levelName}
      <div className={classNamePoint} />
    </div>
  )
}

interface LogFilterSelectorProps {
  defaultLevelSelected?: number;
  onChangeLevelSelected?: (level: number) => void;
}

function LogFilterSelector ({
  defaultLevelSelected = 10,
  onChangeLevelSelected = () => {}
}: LogFilterSelectorProps): React.ReactElement {
  const levels: Record<number, string> = {
    50: 'ERROR',
    40: 'WARN',
    30: 'INFO',
    20: 'DEBUG',
    10: 'TRACE'
  }
  const levelOrdered: number[] = [50, 40, 30, 20, 10]
  const barLevels: Record<number, string> = {
    50: '0%',
    40: 'calc(25% - 4px)',
    30: 'calc(50% - 4px)',
    20: 'calc(75% - 4px)',
    10: 'calc(100% - 4px)'
  }
  const [barValue, setBarValue] = useState(barLevels[defaultLevelSelected])
  const [levelSelected, setLevelSeleted] = useState(defaultLevelSelected)

  function handleChangeLevelSelected (level: number): void {
    setLevelSeleted(level)
    setBarValue(barLevels[level])
    onChangeLevelSelected(level)
  }

  return (
    <div className={styles.container}>
      {levelOrdered.map(level => (
        <LogButton
          levelSelected={levelSelected}
          key={level}
          level={level}
          levelName={levels[level].toLowerCase()}
          onClickLevel={() => handleChangeLevelSelected(level)}
        />
      ))}
      <div className={styles.progressContainer}>
        <div className={styles.progress}>
          <div className={styles.bar} style={{ width: `${barValue}` }}>
            <p className={styles.percent} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogFilterSelector
