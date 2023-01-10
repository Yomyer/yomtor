import React, { forwardRef, MouseEvent, useContext } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'
import { Box } from '../../Box'
import { NodeProps } from './Node.props'
import useStyles from './Node.styles'
import { isArray, isFunction, isUndefined } from 'lodash'
import { PlayIcon } from '@yomtor/icons'
import { useTreeViewContext } from '../TreeViewProvider'

const defaultProps: Partial<NodeProps> = {}

export const Node = forwardRef<HTMLDivElement, NodeProps>((props, ref) => {
  const { unstyled, className, item, children, ...others } =
    useComponentDefaultProps('Node', defaultProps, props)

  const {
    setActive,
    setHighligth,
    depths,
    nodes,
    collapsed: rootCollapsed,
    collapser
  } = useTreeViewContext()

  const node = nodes[item.index]
  const depth = depths[item.index]
  const collapsed = !isUndefined(node.collapsed)
    ? !node.collapsed
    : !rootCollapsed

  const { classes, cx } = useStyles({}, { name: 'Node', unstyled })

  return (
    <Box
      {...others}
      ref={ref}
      className={cx(className, classes.root, {
        [classes.actived]: node.actived,
        [classes.highlighted]: node.highlighted
      })}
      onClick={(event) => setActive(node, event)}
      onMouseEnter={(event) => setHighligth(node, true, event)}
      onMouseLeave={(event) => setHighligth(node, false, event)}
    >
      <div className={classes.indents}>
        {[...Array(depth + 1)].map((_, i) => (
          <span
            key={i}
            className={cx(classes.indent, {
              [classes.first]: !depth
            })}
          />
        ))}
        <em
          className={cx(classes.indent, classes.collapser, {
            [classes.first]: !depth
          })}
          style={{
            visibility: isArray(node.children) ? 'visible' : null
          }}
          onClick={(event: MouseEvent) => collapser(node, event)}
          onMouseDown={(event) => {
            event.stopPropagation()
          }}
        >
          <PlayIcon rotate={collapsed && 90} size={10} />
        </em>
      </div>
      {isFunction(children) ? children(node, item) : children}
    </Box>
  )
})

Node.displayName = '@yomtor/ui/TreeViewNode'
