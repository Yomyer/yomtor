import React, { forwardRef, useCallback, useRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { SortableProps } from './Sortable.props'
import useStyles from './Sortable.styles'
import { DropEvent, Droppable } from '../../Droppable'
import { Draggable } from '../../Draggable'
import { VirtualItem } from '@yomtor/hooks'
import { DraggableEvent } from 'react-draggable'
import { TreeViewPositions } from '../TreeView.props'
import { isUndefined } from 'lodash'
import { useTreeViewContext } from '../TreeViewContext'

const defaultProps: Partial<SortableProps> = {}

export const Sortable = forwardRef<HTMLDivElement, SortableProps>(
  (props, ref) => {
    const { unstyled, children, className, item, ...others } =
      useComponentDefaultProps('Sortable', defaultProps, props)

    const {
      setActive,
      setDeactive,
      setDragging,
      position,
      items,
      setItems,
      setTarget,
      target,
      index,
      distance,
      nodes,
      activeds,
      nexts,
      depths,
      parents,
      setInfo,
      indent,
      disableDrops,
      rerender,
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

      index.current = item.index
      position.current = 'in'
      let parent!: number

      distance.current += props.mouseEvent.movementX

      if (rect.top + height >= y) {
        position.current = 'above'
      }
      if (rect.bottom - height <= y) {
        position.current = 'below'

        const closets = getAllParents(index.current).reverse()
        if (closets.length) {
          closets.push(node)
          let indexX = Math.ceil(distance.current / indent) - 2

          if (indexX > -1) {
            indexX = Math.min(Math.max(indexX, 0), closets.length - 1)
            index.current = nodes.findIndex((node) => node === closets[indexX])
          } else {
            index.current = nodes.findIndex((node) => node === closets[0])
          }
        } else if (depths[index.current + 1] > depths[index.current]) {
          // console.log(depths[index + 1], depths[index])
          index.current = index.current + 1
        }
      }

      if (parents[index.current] && position.current !== 'in') {
        parent = nodes.findIndex((node) => node === parents[index.current])
      } else if (position.current === 'in') {
        parent = index.current
      }

      setParentHighlighted(parent)
      rerender()
    }

    const dropHandler = () => {
      console.log(index.current, position.current)

      if (isUndefined(index.current) || disableDrops[index.current]) return

      setInfo({
        drag: Object.keys(items).length
          ? Object.keys(items).map((index) => nodes[index])
          : undefined,
        drop: nodes[index.current],
        position: position.current
      })
    }
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
