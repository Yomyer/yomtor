import { DefaultProps, Selectors } from '@yomtor/styles'
import useStyles, { ResizePanelStylesParams } from './ResizePanel.styles'

export type ResizeSizes = Partial<Record<string, string | number>>
export type ResizeDirections = 'e' | 'w' | 'n' | 's'

type ResizePanelStylesNames = Selectors<typeof useStyles>

export interface ResizePanelBaseProps {
  resize?: boolean
  min?: number
  max?: number
}

export interface ResizePanelProps
  extends DefaultProps<ResizePanelStylesNames, ResizePanelStylesParams>,
    ResizePanelBaseProps {
  panel: any
  sizes?: ResizeSizes
  direction: ResizeDirections
  children?: React.ReactNode
}
