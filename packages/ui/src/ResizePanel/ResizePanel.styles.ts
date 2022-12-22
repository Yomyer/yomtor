import { createStyles } from '@yomtor/styles'

export interface ResizePanelStylesParams {}

export default createStyles((theme, {}: ResizePanelStylesParams) => ({
  root: {
    borderRight: '1px solid red',
    width: 'fit-content'
  }
}))
