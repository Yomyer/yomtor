import { createStyles } from '@yomtor/styles'
import { TreeViewProps } from './TreeView.props'

export default createStyles((theme, {}: Partial<TreeViewProps>) => ({
  root: {
    minHeight: '400px',
    width: '100%'
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    marginTop: -1,
    height: 2,
    background:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[2]
        : theme.colors.gray[8],
    pointerEvents: 'none'
  }
}))
