// FIXME: add types directly on the plt module
declare module '@platformatic/ui-components' {
  import { ReactElement, ComponentType } from 'react';

  export const BorderedBox: ComponentType<BorderedBoxProps>;
  export const Button: ComponentType<ButtonProps>;
  export const HorizontalSeparator: ComponentType<HorizontalSeparatorProps>;
  export const LoadingSpinnerV2: ComponentType<LoadingSpinnerV2Props>;
  export const Tooltip: ComponentType<TooltipProps>;
  export const TooltipAbsolute: ComponentType<TooltipProps>;

  export interface PlatformaticIconProps {
    iconName: string;
    color?: string;
    size?: string;
    onClick?: (() => void) | null;
    disabled?: boolean;
    inactive?: boolean;
  }

  export interface CopyAndPasteProps {
    value: any;
    tooltipLabel?: string;
    color?: string;
    size?: string;
    tooltipClassName?: string;
    position?: string;
  }

  export interface IconsType {
    CircleStopIcon: ComponentType<IconProps>;
    RunningIcon: ComponentType<IconProps>;
  }

  export const PlatformaticIcon: ComponentType<PlatformaticIconProps>;
  export const CopyAndPaste: ComponentType<CopyAndPasteProps>;
  export const Icons: IconsType;
}

declare module '@platformatic/ui-components/src/components/icons' {
  import { ComponentType } from 'react';
  
  interface IconProps {
    size?: string;
    color?: string;
    [key: string]: any;
  }

  const AlertIcon: ComponentType<IconProps>;
  const ArrowUpIcon: ComponentType<IconProps>;
  const ArrowDownIcon: ComponentType<IconProps>;
  const CircleCheckMarkIcon: ComponentType<IconProps>;
  const CLIIcon: ComponentType<IconProps>;
  
  const Icons: {
    AlertIcon: ComponentType<IconProps>;
    ArrowUpIcon: ComponentType<IconProps>;
    ArrowDownIcon: ComponentType<IconProps>;
    CircleCheckMarkIcon: ComponentType<IconProps>;
    CLIIcon: ComponentType<IconProps>;
    [key: string]: ComponentType<IconProps>;
  };
  
  export default Icons;
}

declare module '@platformatic/ui-components/src/components/constants' {
  export const WHITE: string;
  export const SMALL: string;
  export const POSITION_END: string;
  export const RICH_BLACK: string;
  export const TRANSPARENT: string;
  export const MARGIN_0: string;
  export const OPACITY_15: string;
  export const OPACITY_30: string;
  export const ANTI_FLASH_WHITE: string;
  export const DULLS_BACKGROUND_COLOR: string;
  export const ERROR_RED: string;
  export const LARGE: string;
  export const MEDIUM: string;
  export const MAIN_GREEN: string;
  export const BOX_SHADOW: string;
  export const UNDERLINE: string;
  export const MAIN_DARK_BLUE: string;
  export const DIRECTION_RIGHT: string;
  export const POSITION_CENTER: string;
}