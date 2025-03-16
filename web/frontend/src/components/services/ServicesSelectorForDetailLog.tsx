import React, { useState } from 'react'
import typographyStyles from '../../styles/Typography.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import styles from './ServicesSelector.module.css'
import Forms from '@platformatic/ui-components/src/components/forms'
import { OPACITY_100, OPACITY_15, OPACITY_30, RICH_BLACK, SMALL, TRANSPARENT, WHITE } from '@platformatic/ui-components/src/components/constants'
import { BorderedBox, Checkbox } from '@platformatic/ui-components'
import Icons from '@platformatic/ui-components/src/components/icons'

interface ServiceProps {
  id: string;
  entrypoint?: boolean;
  isSelected: boolean;
  onChangeService?: () => void;
}

function Service({ id, entrypoint, isSelected, onChangeService = () => {} }: ServiceProps): React.ReactElement {
  const [selected] = useState(isSelected)

  return (
    <BorderedBox
      classes={styles.boxService}
      color={TRANSPARENT}
      backgroundColor={selected ? WHITE : RICH_BLACK}
      backgroundColorOpacity={selected ? OPACITY_30 : OPACITY_100}
      internalOverHandling
      backgroundColorOpacityOver={OPACITY_15}
      backgroundColorOver={WHITE}
    >
      <div className={`${commonStyles.miniFlexBlock} ${commonStyles.fullWidth}`}>
        <div className={`${commonStyles.tinyFlexRow} ${commonStyles.fullWidth} ${commonStyles.justifyBetween}`}>
          <div className={`${commonStyles.tinyFlexRow} ${commonStyles.fullWidth}`}>
            <Checkbox onChange={onChangeService} color={WHITE} checked={isSelected} size={SMALL} />
            <span className={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite}`}>{id}</span>
            {entrypoint &&
              <span className={`${typographyStyles.desktopBodySmallest} ${typographyStyles.textWhite} ${typographyStyles.opacity70}`}>(Entrypoint)</span>}
          </div>
          <Icons.InternalLinkIcon color={WHITE} size={SMALL} addImportantToColor />
        </div>
      </div>
    </BorderedBox>
  )
}

interface ServiceData {
  id: string;
  entrypoint?: boolean;
  selected: boolean;
  [key: string]: any;
}

interface ServicesSelectorForDetailLogProps {
  services: ServiceData[];
  handleChangeService?: (service: ServiceData) => void;
  selectAllServices?: boolean;
  handleChangeAllServices?: () => void;
}

function ServicesSelectorForDetailLog({ 
  services, 
  handleChangeService = () => {}, 
  selectAllServices = true, 
  handleChangeAllServices = () => {} 
}: ServicesSelectorForDetailLogProps): React.ReactElement {
  return (
    <div className={`${commonStyles.smallFlexBlock} ${commonStyles.fullWidth} ${styles.servicesContainer}`}>
      {services.length > 1 &&
        <Forms.ToggleSwitch
          label='Select all services'
          labelClassName={`${typographyStyles.desktopBodySmall} ${typographyStyles.textWhite}`}
          name='selectAllServices'
          onChange={() => handleChangeAllServices()}
          checked={selectAllServices}
          size={SMALL}
        />}
      <div className={`${commonStyles.tinyFlexBlock} ${commonStyles.fullWidth}`}>
        {services.map(service => <Service key={service.id} {...service} isSelected={service.selected} onChangeService={() => handleChangeService(service)} />)}
      </div>
    </div>
  )
}

export default ServicesSelectorForDetailLog