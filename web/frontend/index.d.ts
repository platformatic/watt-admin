declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

// FIXME: add following types directly on the `@platformatic/ui-components` package
declare module '@platformatic/ui-components' {
  import { ComponentType } from 'react'

  export interface VerticalSeparatorProps {
    color?: string;
    backgroundColorOpacity?: string;
    classes?: string;
    height?: string;
    width?: string;
    marginLeft?: string;
    marginRight?: string;
  }
  export const Checkbox: ComponentType<CheckboxProps>
  export const BorderedBox: ComponentType<BorderedBoxProps>
  export const Button: ComponentType<ButtonProps>
  export const HorizontalSeparator: ComponentType<HorizontalSeparatorProps>
  export const LoadingSpinnerV2: ComponentType<LoadingSpinnerV2Props>
  export const Tooltip: ComponentType<TooltipProps>
  export const VerticalSeparator: ComponentType<VerticalSeparatorProps>
  export const TooltipAbsolute: ComponentType<TooltipProps>

  export interface PlatformaticIconProps {
    iconName: string;
    color?: string;
    size?: string;
    onClick?: (() => void) | null;
    disabled?: boolean;
    inactive?: boolean;
    className?: string;
    internalOverHandling?: boolean;
  }

  export interface CopyAndPasteProps {
    value: unknown;
    tooltipLabel?: string;
    color?: string;
    size?: string;
    tooltipClassName?: string;
    position?: string;
  }

  export interface IconsType {
    CircleStopIcon: ComponentType<IconProps>;
    RunningIcon: ComponentType<IconProps>;
    [key: string]: string;
  }

  export const PlatformaticIcon: ComponentType<PlatformaticIconProps>
  export const CopyAndPaste: ComponentType<CopyAndPasteProps>
  export const Icons: IconsType
}

declare module '@platformatic/ui-components/src/components/icons' {
  import { ComponentType } from 'react'

  interface IconProps {
    size?: string;
    color?: string;
    addImportantToColor?: boolean;
    className?: string;
  }

  const Icons: {
    AlertIcon: ComponentType<IconProps>;
    ArrowUpIcon: ComponentType<IconProps>;
    ArrowDownIcon: ComponentType<IconProps>;
    CircleCheckMarkIcon: ComponentType<IconProps>;
    CLIIcon: ComponentType<IconProps>;
    [key: string]: ComponentType<IconProps>;
  }

  export default Icons
}

declare module '@platformatic/ui-components/src/components/constants' {
  export const WHITE: string
  export const SMALL: string
  export const POSITION_END: string
  export const RICH_BLACK: string
  export const BLACK_RUSSIAN: string
  export const TRANSPARENT: string
  export const MARGIN_0: string
  export const OPACITY_15: string
  export const OPACITY_30: string
  export const OPACITY_100: string
  export const WARNING_YELLOW: string
  export const ANTI_FLASH_WHITE: string
  export const DULLS_BACKGROUND_COLOR: string
  export const ERROR_RED: string
  export const LARGE: string
  export const MEDIUM: string
  export const MAIN_GREEN: string
  export const BOX_SHADOW: string
  export const UNDERLINE: string
  export const MAIN_DARK_BLUE: string
  export const DIRECTION_RIGHT: string
  export const POSITION_CENTER: string
  export const TINY: string
}

declare module '@platformatic/ui-components/src/components/forms' {
  import { ComponentType } from 'react'

  interface ToggleSwitchProps {
    label?: string;
    labelClassName?: string;
    name: string;
    onChange: () => void;
    checked: boolean;
    size?: string;
  }

  interface InputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    type?: string;
    error?: string;
    className?: string;
    disabled?: boolean;
  }

  interface SelectProps {
    label?: string;
    options: Array<{ label: string; value: string }>;
    value: string;
    onChange: (value: string) => void;
    name: string;
    placeholder?: string;
    error?: string;
    className?: string;
    disabled?: boolean;
  }

  interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    name: string;
    disabled?: boolean;
  }

  interface RadioButtonProps {
    label: string;
    value: string;
    checked: boolean;
    onChange: () => void;
    name: string;
    disabled?: boolean;
  }

  const Forms: {
    ToggleSwitch: ComponentType<ToggleSwitchProps>;
    Input: ComponentType<InputProps>;
    Select: ComponentType<SelectProps>;
    Checkbox: ComponentType<CheckboxProps>;
    RadioButton: ComponentType<RadioButtonProps>;
  }

  export default Forms
}
