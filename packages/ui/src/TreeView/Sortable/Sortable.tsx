import React, { forwardRef, useCallback, useRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { SortableProps } from './Sortable.props'
import useStyles from './Sortable.styles'
import { DropEvent, Droppable } from '../../Droppable'
import { Draggable, DraggableData } from '../../Draggable'
import { VirtualItem } from '@yomtor/hooks'
import { DraggableEvent } from 'react-draggable'
import { TreeViewPositions } from '../TreeView.props'
import { isUndefined } from 'lodash'
import { useTreeViewContext } from '../TreeViewContext'

const defaultProps: Partial<SortableProps> = {
  offset: 6
}

export const Sortable = forwardRef<HTMLDivElement, SortableProps>(
  (props, ref) => {
    const { unstyled, children, className, offset, item, ...others } =
      useComponentDefaultProps('Sortable', defaultProps, props)

    const {
      setActive,
      setDeactive,
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
      overflowed,
      activeds,
      nexts,
      depths,
      parents,
      setInfo,
      indent,
      disableDrops,
      viewportRef,
      setParentHighlighted
    } = useTreeViewContext()

    const info = useRef({ current: undefined, position: undefined })

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'Sortable', unstyled }
    )

    const mouseDownHandler = (event: DraggableEvent | React.MouseEvent) => {
      setActive(nodes[item.index], event as React.MouseEvent)
    }

    const mouseUpHandler = (event: DraggableEvent | React.MouseEvent) => {
      setDeactive(nodes[item.index], event as React.MouseEvent)
      setDragging(false)
      setPosition(undefined)
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
        (depths[index + 1] < depths[index] ||
          !first ||
          isUndefined(depths[index + 1])) &&
        parents[index]
      ) {
        stack.push(parents[index])
        const parent = nodes.findIndex((node) => node === parents[index])

        getAllParents(parent, stack, false)
      }

      return stack
    }

    const moveHandler = useCallback(
      ({ target, props }: DropEvent<{ mouseEvent?: MouseEvent }>) => {
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
            let indexX =
              closets.length - (Math.ceil(distance.current / indent) - 2) * -1

            if (indexX > -1) {
              indexX = Math.max(Math.min(indexX, closets.length - 1), 0)

              index = nodes.findIndex((node) => node === closets[indexX])
            } else {
              index = nodes.findIndex((node) => node === closets[0])
            }
          } else if (depths[index + 1] > depths[index]) {
            index = index + 1
            position = 'above'
            setTarget(target.parentElement.nextElementSibling.children[0])
          }
        }

        if (parents[index] && position !== 'in') {
          parent = nodes.findIndex((node) => node === parents[index])
        } else if (position === 'in') {
          parent = index
        }

        setCurrent(index)
        setPosition(position)
        setParentHighlighted(parent)

        info.current = { current: index, position }
      },
      [position, current]
    )

    const dropHandler = () => {
      const { current, position } = info.current

      if (isUndefined(current) || disableDrops[current]) return

      setInfo({
        drag: items.length ? items.map((index) => nodes[index]) : undefined,
        drop: nodes[current],
        position
      })
    }

    const dragHandler = useCallback(
      (event: DraggableEvent, data: DraggableData) => {
        const rectWrapper = viewportRef.current.getBoundingClientRect()

        const targets = document
          .elementsFromPoint(
            Math.max(
              Math.min(data.x, rectWrapper.right - offset),
              rectWrapper.left + offset
            ),
            Math.max(
              Math.min(data.y, rectWrapper.bottom - offset),
              rectWrapper.top + offset
            )
          )
          .filter((target) => target.closest<HTMLElement>('[data-index]'))

        if (targets.length) {
          const target = targets[0].closest<HTMLElement>('[data-index]')

          setTarget(target)

          let position: TreeViewPositions = 'in'
          let parent!: number
          let index = +target.dataset.index

          const node = nodes[index]
          const rect = target.getBoundingClientRect()
          const height = node.children ? 10 : rect.height / 2
          const y = data.y

          distance.current += event instanceof MouseEvent && event.movementX

          if (rect.top + height >= y) {
            position = 'above'
          }
          if (rect.bottom - height <= y) {
            position = 'below'

            const closets = getAllParents(index).reverse()

            if (closets.length) {
              closets.push(node)
              let indexX =
                closets.length - Math.ceil(distance.current / indent) * -1

              if (indexX > -1) {
                indexX = Math.max(Math.min(indexX, closets.length - 1), 0)

                index = nodes.findIndex((node) => node === closets[indexX])
              } else {
                index = nodes.findIndex((node) => node === closets[0])
              }
            } else if (depths[index + 1] > depths[index]) {
              index = index + 1
              position = 'above'

              setTarget(target.nextElementSibling)
            }
          }

          if (parents[index] && position !== 'in') {
            parent = nodes.findIndex((node) => node === parents[index])
          } else if (position === 'in') {
            parent = index
          }

          setCurrent(index)
          setPosition(position)
          setParentHighlighted(parent)

          info.current = { current: index, position }
        }
      },
      [position, current]
    )

    let draggableEvents = {}
    let droppableEvents = {}

    if (overflowed) {
      draggableEvents = { onStop: dropHandler, onDrag: dragHandler }
    } else {
      droppableEvents = { onMove: moveHandler, onDrop: dropHandler }
    }

    return (
      <Droppable {...droppableEvents}>
        {() => (
          <Draggable
            phantom={false}
            move={false}
            onStart={startHandler}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
            {...draggableEvents}
          >
            {children}
          </Draggable>
        )}
      </Droppable>
    )
  }
)

Sortable.displayName = '@yomtor/ui/Sortable'
