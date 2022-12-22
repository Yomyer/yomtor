import React, { forwardRef } from 'react'
import { ForwardRefWithStaticComponents } from '@mantine/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import { TreeViewProps } from './TreeView.props'
import useStyles from './TreeView.styles'
import { Box } from '../Box'

const list = Array.from(Array(500).keys())

export const _TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  (props, ref) => {
    const { unstyled, className, ...others } = useComponentDefaultProps(
      'TreeView',
      {},
      props
    )

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'TreeView', unstyled }
    )

    return <></>
    //return <Box ref={ref} className={cx(className, classes.root)} {...others} />
  }
) as any

_TreeView.displayName = '@yomtor/ui/TreeView'

export const TreeView: ForwardRefWithStaticComponents<TreeViewProps, {}> =
  _TreeView
