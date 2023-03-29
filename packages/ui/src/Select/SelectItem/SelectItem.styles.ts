import { createStyles, getSize, rem } from '@yomtor/styles'
import { SelectItemProps } from './SelectItem.props'

export default createStyles((theme, { selected }: SelectItemProps) => {
  return {
    check: {
      visibility: selected ? 'visible' : 'hidden'
    },
    root: {
      paddingLeft: 0
    },
    ellipsis: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }
  }
})
