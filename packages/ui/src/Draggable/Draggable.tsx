import React, {
  Children,
  cloneElement,
  forwardRef,
  useEffect,
  useRef,
  useState
} from 'react'
import useStyles from './Draggable.styles'
import { useComponentDefaultProps } from '@yomtor/styles'
import { DraggableProps } from './Draggable.props'
import ReactDragable, {
  DraggableData,
  DraggableEvent,
  DraggableCore
} from 'react-draggable'

const defaultProps: Partial<DraggableProps> = {
  move: true,
  throttle: 1,
  distance: 5,
  axis: 'both'
}

export const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
  (props, ref) => {
    const {
      children,
      move,
      axis,
      distance,
      phantom,
      throttle,
      stop,
      onDrag,
      onStart,
      onStop,
      ...others
    } = useComponentDefaultProps('Group', defaultProps, props)

    const nodes = useRef<EventTarget[]>([])
    const [dragging, setDragging] = useState<boolean>()
    const [start, setStart] = useState<boolean>()
    const handlerRef = useRef<HTMLDivElement>()
    const phantomRef = useRef<HTMLDivElement>()
    const [animated, setAnimated] = useState<boolean>()
    const offset = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
    const delta = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

    const { classes, cx } = useStyles(
      { ...others, dragging, move, phantom, animated },
      { name: 'Draggable' }
    )

    const startHandler = (_: DraggableEvent, data: DraggableData) => {
      offset.current = { x: data.x, y: data.y }
    }

    const intersect = (target: HTMLElement) => {
      return target.closest('[data-droppable]')
    }

    const stopHandler = (event: DraggableEvent, data: DraggableData) => {
      if (start) {
        setStart(false)

        if (intersect(event.target as HTMLElement)) {
          event.target.dispatchEvent(
            new CustomEvent('onDrop', {
              bubbles: true,
              detail: { ...others, mouseEvent: event }
            })
          )
          updateAnimation(move ? false : undefined)
        } else {
          updateAnimation(move ? true : undefined)
        }

        document.dispatchEvent(
          new CustomEvent('onDragStop', {
            bubbles: true,
            detail: { ...others, mouseEvent: event }
          })
        )

        nodes.current.forEach((n) => {
          n.dispatchEvent(
            new CustomEvent('onDropClear', {
              bubbles: true,
              detail: { ...others, mouseEvent: event }
            })
          )
        })

        nodes.current = []

        onStop && onStop(event, data)

        phantomRef.current &&
          (phantomRef.current.style.transform = `translate(0px, 0px)`)
      }
    }

    const dragHandler = (event: DraggableEvent, data: DraggableData) => {
      delta.current.x = data.lastX - offset.current.x
      delta.current.y = data.lastY - offset.current.y

      if (axis && axis !== 'both' && axis !== 'x') {
        delta.current.x = 0
      }
      if (axis && axis !== 'both' && axis !== 'y') {
        delta.current.y = 0
      }

      if (
        !dragging &&
        Math.sqrt(
          delta.current.x * delta.current.x + delta.current.y * delta.current.y
        ) <= distance
      )
        return

      if (!start) {
        document.dispatchEvent(new Event('onDragStart', { bubbles: true }))
        onStart && onStart(event, data)
      }

      if (intersect(event.target as HTMLElement)) {
        event.target.dispatchEvent(
          new CustomEvent('onDropMove', {
            bubbles: true,
            detail: { ...others, mouseEvent: event }
          })
        )
        if (!nodes.current.includes(event.target)) {
          nodes.current.push(event.target)
        }
      }

      onDrag && onDrag(event, data)

      setDragging(true)
      setStart(true)

      updatePhantomPosition()
    }

    const updateAnimation = (status: boolean) => {
      phantomRef.current &&
        (phantomRef.current.style.transition = `transform ${
          status ? '.3s' : '.00001ms'
        } ease-in-out`)

      setAnimated(status)
    }

    const createPhantom = () => {
      phantomRef.current = handlerRef.current.cloneNode(true) as HTMLDivElement
      document.body.append(phantomRef.current)
      phantomRef.current.classList.add(...classes.phantom.split(' '))

      const { top, left, width, height } =
        handlerRef.current.getBoundingClientRect()

      phantomRef.current.style.top = `${top}px`
      phantomRef.current.style.left = `${left}px`
      phantomRef.current.style.width = `${width}px`
      phantomRef.current.style.height = `${height}px`
      phantomRef.current.style.opacity = handlerRef.current.style.opacity

      const transitionend = () => {
        setDragging(false)
        phantom && destroyPhantom()
      }

      phantomRef.current.addEventListener('transitionend', transitionend)
      updatePhantomPosition()
    }

    const destroyPhantom = () => {
      updateAnimation(undefined)
      phantomRef.current && phantomRef.current.remove()
    }

    const updatePhantomPosition = () => {
      phantomRef.current &&
        (phantomRef.current.style.transform = `translate(${delta.current.x}px, ${delta.current.y}px)`)
    }

    useEffect(() => {
      if (dragging) {
        move && createPhantom()
      } else {
        !phantom && destroyPhantom()
      }
      return destroyPhantom
    }, [dragging])

    return (
      <DraggableCore
        {...others}
        onDrag={dragHandler}
        onStop={stopHandler}
        onStart={startHandler}
        offsetParent={document.querySelector('body')}
      >
        {React.cloneElement(React.Children.only(children), {
          className: cx(children.props.className, classes.handler),
          ref: handlerRef
        })}
      </DraggableCore>
    )
  }
)
