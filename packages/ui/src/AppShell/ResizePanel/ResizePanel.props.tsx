import { YomtorStyleSystemSize, DefaultProps, Selectors } from '@yomtor/styles'
import useStyles from './ResizePanel.styles'

export type ResizeSizes = Partial<Record<string, string | number>>
export type ResizeDirections = 'e' | 'w' | 'n' | 's'

type ResizePanelStylesNames = Selectors<typeof useStyles>

export interface ResizePanelBaseProps {
  resize?: boolean
  min?: number
  max?: number
}

export interface ResizePanelProps
  extends Omit<DefaultProps<ResizePanelStylesNames>, YomtorStyleSystemSize>,
    ResizePanelBaseProps {
  panel: any
  sizes?: ResizeSizes
  direction: ResizeDirections
  children?: React.ReactNode
}
