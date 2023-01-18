import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { SortableProps } from './Sortable.props'
import useStyles from './Sortable.styles'
import { DropEvent, Droppable } from '../../Droppable'
import { Draggable } from '../../Draggable'
import { useTreeViewContext } from '../TreeViewProvider'
import { VirtualItem } from '@yomtor/hooks'
import { DraggableEvent } from 'react-draggable'
import { TreeViewPositions } from '../TreeView.props'

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
      nodes,
      activeds
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
    }

    const startHandler = () => {
      setItems(Object.keys(activeds).map((i) => +i))
      setDragging(true)
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

      let position: TreeViewPositions = 'in'
      let parent!: number

      distanceX.current += props.mouseEvent.movementX
    }

    const dropHandler = () => {}

    return (
      <Droppable onMove={dropHandler} onDrop={moveHandler}>
        {() => (
          <Draggable
            phantom
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
