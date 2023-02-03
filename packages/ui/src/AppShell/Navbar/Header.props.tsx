import { HeaderProps as BaseHeaderProps } from '@mantine/core'
import { ResizePanelBaseProps } from '../ResizePanel'

export interface HeaderProps extends BaseHeaderProps, ResizePanelBaseProps {
  resize?: boolean
}
