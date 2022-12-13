import { DefaultProps, YomtorStyleSystemSize, Selectors } from '@yomtor/styles'
import useStyles from './ResizePanel.styles'

type ResizePanelStylesNames = Selectors<typeof useStyles>

export interface ResizePanelProps
  extends Omit<DefaultProps<ResizePanelStylesNames>, YomtorStyleSystemSize> {}
