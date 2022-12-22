import { YomtorStyleSystemSize, DefaultProps, Selectors } from '@yomtor/styles'
import useStyles from './ResizePanel.styles'

export type ResizeSizes = Partial<Record<string, string | number>>
export type ResizeDirections = 'e' | 'w' | 'n' | 's'

type ResizePanelStylesNames = Selectors<typeof useStyles>

export interface ResizePanelProps
  extends Omit<DefaultProps<ResizePanelStylesNames>, YomtorStyleSystemSize> {
  panel: any
  sizes?: ResizeSizes
  resize?: boolean
  min?: number
  max?: number
  direction: ResizeDirections
  children?: React.ReactNode
}
