import React, { forwardRef, MouseEvent, useContext, useEffect } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'
import { Box } from '../../Box'
import { NodeProps } from './Node.props'
import useStyles from './Node.styles'
import { isArray, isFunction, isUndefined } from 'lodash'
import { PlayIcon } from '@yomtor/icons'
import { useTreeViewContext } from '../TreeViewContext'

const defaultProps: Partial<NodeProps> = {}

export const _Node = forwardRef<HTMLDivElement, NodeProps>((props, ref) => {
  const { unstyled, className, item, children, ...others } =
    useComponentDefaultProps('Node', defaultProps, props)

  const {
    setActive,
    setHighligth,
    setCollapse,
    depths,
    nodes,
    indent,
    sortabled,
    childActiveds,
    parentHighlighted,
    disableDrops,
    dragging,
    items,
    collapsed: rootCollapsed
  } = useTreeViewContext()

  const node = nodes[item.index]
  const depth = depths[item.index]
  const collapsed = !isUndefined(node.collapsed)
    ? !node.collapsed
    : !rootCollapsed

  const { classes, cx } = useStyles({ indent }, { name: 'Node', unstyled })

  if (!sortabled) {
    others.onMouseDown = (event) => setActive(node, event)
  }

  useEffect(() => {
    return () => setHighligth(node, false)
  }, [])

  return (
    <Box
      {...others}
      ref={ref}
      className={cx(className, classes.root, {
        [classes.actived]: node.actived,
        [classes.highlighted]:
          ((node.highlighted && !dragging) ||
            parentHighlighted === item.index) &&
          !disableDrops[item.index],
        [classes.parentActived]: childActiveds[item.index]
      })}
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
        {isArray(node.children) && (
          <em
            className={cx(classes.indent, classes.collapser, {
              [classes.first]: !depth
            })}
            onClick={(event: MouseEvent) => setCollapse(node, event)}
            onMouseDown={(event) => {
              event.stopPropagation()
            }}
          >
            <PlayIcon rotate={collapsed && 90} size={10} />
          </em>
        )}
      </div>
      {isFunction(children) ? children(node, item) : children}
    </Box>
  )
})

_Node.displayName = '@yomtor/ui/Node'

export const Node = React.memo(_Node, (prevProps, nextProps) => {
  return true
})
