import React, { forwardRef } from 'react'
import { ForwardRefWithStaticComponents } from '@mantine/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import { TreeViewProps } from './TreeView.props'

import { TreeViewProvider } from './TreeViewProvider'
import { TreeViewContainer } from './TreeViewContainer'

const defaultProps: Partial<TreeViewProps> = {}

export const _TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  (props, ref) => {
    const { data, collapsed, className, sortabled, ...others } =
      useComponentDefaultProps('TreeView', defaultProps, props)

    return (
      <TreeViewProvider {...{ data, collapsed, sortabled }}>
        {({ nodes }) => (
          <TreeViewContainer {...others} nodes={nodes} ref={ref} />
        )}
      </TreeViewProvider>
    )
  }
) as any

_TreeView.displayName = '@yomtor/ui/TreeView'

export const TreeView: ForwardRefWithStaticComponents<TreeViewProps, {}> =
  _TreeView
