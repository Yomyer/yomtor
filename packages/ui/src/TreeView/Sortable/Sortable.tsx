import React, { forwardRef, useRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { SortableProps } from './Sortable.props'
import useStyles from './Sortable.styles'
import { DropEvent, Droppable } from '../../Droppable'
import { Draggable } from '../../Draggable'
import { useTreeViewContext } from '../TreeViewProvider'
import { VirtualItem } from '@yomtor/hooks'
import { DraggableEvent } from 'react-draggable'
import { TreeViewPositions } from '../TreeView.props'
import { isUndefined } from 'lodash'

const defaultProps: Partial<SortableProps> = {}

export const Sortable = forwardRef<HTMLDivElement, SortableProps>(
  (props, ref) => {
    const { unstyled, children, className, item, ...others } =
      useComponentDefaultProps('Sortable', defaultProps, props)

    const {
      setActive,
      setDeactive,
      dragging,
      setDragging,
      position,
      setPosition,
      items,
      setItems,
      setTarget,
      target,
      setCurrent,
      current,
      distance,
      nodes,
      activeds,
      nexts,
      depths,
      parents,
      indent,
      setParentHighlighted
    } = useTreeViewContext()

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'Sortable', unstyled }
    )

    const mouseDownHandler = (event: MouseEvent | React.MouseEvent) => {
      setActive(nodes[item.index], event as React.MouseEvent)
    }

    const mouseUpHandler = (event: DraggableEvent | React.MouseEvent) => {
      setDeactive(nodes[item.index], event as React.MouseEvent)
      setDragging(false)
      setPosition(undefined)
      setCurrent(undefined)
      setParentHighlighted(undefined)
      distance.current = 0
    }

    const startHandler = () => {
      setItems(Object.keys(activeds).map((i) => +i))
      setDragging(true)
    }

    const getAllParents = (index: number, stack = [], first = true) => {
      const nextIndex =
        nexts[index] && nodes.findIndex((node) => node === nexts[index])

      if (
        isUndefined(nextIndex) &&
        (depths[index + 1] < depths[index] || !first) &&
        parents[index]
      ) {
        stack.push(parents[index])
        const parent = nodes.findIndex((node) => node === parents[index])

        getAllParents(parent, stack, false)
      }

      return stack
    }

    const moveHandler = ({
      target,
      props
    }: DropEvent<{ mouseEvent?: MouseEvent }>) => {
      setTarget(target)

      const node = nodes[item.index]
      const rect = target.getBoundingClientRect()
      const height = node.children ? 10 : rect.height / 2
      const y = props.mouseEvent.clientY

      let index = item.index
      let position: TreeViewPositions = 'in'
      let parent!: number

      distance.current += props.mouseEvent.movementX

      if (rect.top + height >= y) {
        position = 'above'
      }
      if (rect.bottom - height <= y) {
        position = 'below'

        const closets = getAllParents(index).reverse()
        if (closets.length) {
          closets.push(node)
          let indexX = Math.ceil(distance.current / indent) - 2

          if (indexX > -1) {
            indexX = Math.min(Math.max(indexX, 0), closets.length - 1)
            index = nodes.findIndex((node) => node === closets[indexX])
          } else {
            index = nodes.findIndex((node) => node === closets[0])
          }
        } else if (depths[index + 1] > depths[index]) {
          index = index + 1
        }
      }

      if (parents[index] && position !== 'in') {
        parent = nodes.findIndex((node) => node === parents[index])
      }

      setCurrent(index)
      setPosition(position)
      setParentHighlighted(parent)
    }

    const dropHandler = () => {}

    return (
      <Droppable onMove={moveHandler} onDrop={dropHandler}>
        {() => (
          <Draggable
            phantom={false}
            move={false}
            onStart={startHandler}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
          >
            {children}
          </Draggable>
        )}
      </Droppable>
    )
  }
)

Sortable.displayName = '@yomtor/ui/Sortable'
