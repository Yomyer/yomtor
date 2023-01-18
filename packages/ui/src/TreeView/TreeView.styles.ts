import { createStyles } from '@yomtor/styles'
import { TreeViewProps } from './TreeView.props'

export default createStyles((theme, {}: TreeViewProps) => ({
  root: {
    minHeight: '400px',
    width: '100%'
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 3,
    background: 'white',
    pointerEvents: 'none'
  }
}))
