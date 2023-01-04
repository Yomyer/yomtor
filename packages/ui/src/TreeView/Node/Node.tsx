import React, { forwardRef, MouseEvent } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'
import { Box } from '../../Box'
import { NodeProps } from './Node.props'
import useStyles from './Node.styles'
import { isArray, isFunction, isUndefined } from 'lodash'
import { PlayIcon } from '@yomtor/icons'

const defaultProps: Partial<NodeProps> = {}

export const Node = forwardRef<HTMLDivElement, NodeProps>(
  ({ node, ...props }, ref) => {
    const {
      unstyled,
      className,
      item,
      children,
      depth,
      collapsed,
      actived,
      highlighted,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onCollapse,
      ...others
    } = useComponentDefaultProps('Node', defaultProps, props)

    const { classes, cx } = useStyles(
      { depth, actived },
      { name: 'Node', unstyled }
    )

    const clickHandler = () => {
      onClick(node)
    }

    return (
      <Box
        {...others}
        ref={ref}
        className={cx(className, classes.root, classes.actived)}
        onClick={clickHandler}
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
            onClick={(event: MouseEvent) => onCollapse(node, event)}
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
  }
)

Node.displayName = '@yomtor/ui/TreeViewNode'
