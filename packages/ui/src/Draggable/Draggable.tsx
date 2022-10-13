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
    const delta = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

    const { classes, cx } = useStyles(
      { ...others, dragging, move, phantom, animated },
      { name: 'Draggable' }
    )

    const startHandler = (_: DraggableEvent, data: DraggableData) => {
      delta.current = { x: 0, y: 0 }
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
      delta.current.x += data.deltaX
      delta.current.y += data.deltaY

      if (axis && axis !== 'both' && axis !== 'x') {
        delta.current.x = 0
      }
      if (axis && axis !== 'both' && axis !== 'y') {
        delta.current.y = 0
      }

      if (
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
        createPhantom()
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
      >
        {React.cloneElement(React.Children.only(children), {
          className: cx(children.props.className, classes.handler),
          ref: handlerRef
        })}
      </DraggableCore>
    )
    /*
    const nodes = useRef<EventTarget[]>([])
    const handlerRef = useRef<HTMLDivElement>()
    const phantomRef = useRef<HTMLDivElement>()
    const [dragging, setDragging] = useState<boolean>()
    const [animated, setAnimated] = useState<boolean>()
    const [offset, setOffset] = useState<{ x: number; y: number }>()
    const distance = useRef<number>(0)
    const status = useRef<'started' | 'dragging' | 'idle'>('idle')

    const { classes, cx } = useStyles(
      { ...others, dragging, animated },
      { name: 'Draggable' }
    )

    const updatePanthom = () => {
      const { top, left, width, height } =
        handlerRef.current.getBoundingClientRect()

      phantomRef.current.style.top = `${top}px`
      phantomRef.current.style.left = `${left}px`
      phantomRef.current.style.width = `${width}px`
      phantomRef.current.style.height = `${height}px`
    }

    const updateAnimation = (status: boolean) => {
      phantomRef.current &&
        (phantomRef.current.style.transition = `transform ${
          status ? '.3s' : '.00001ms'
        } ease-in-out`)

      setAnimated(status)
    }

    const intersect = (target: HTMLElement) => {
      return target.closest('[data-droppable]')
    }

    const startHandler = (_: DraggableEvent, data: DraggableData) => {
      setOffset({
        x: -data.x || 0,
        y: -data.y || 0
      })

      distance.current = 0
      status.current = 'started'
    }

    const stopHandler = (event: DraggableEvent, data: DraggableData) => {
      if (status.current !== 'dragging') return

      setDragging(false)

      distance.current = 0
      status.current = 'idle'

      if (intersect(event.target as HTMLElement)) {
        event.target.dispatchEvent(
          new CustomEvent('onDrop', {
            bubbles: true,
            detail: { ...others, mouseEvent: event }
          })
        )
        updateAnimation(others.move ? false : undefined)
      } else {
        updateAnimation(others.move ? true : undefined)
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

      others.onStop && others.onStop(event, data)

      if (others.move && phantomRef.current) {
        console.log('stop')
        phantomRef.current.style.transform = `translate(0px, 0px)`
      }
    }

    const dragHandler = (event: DraggableEvent, data: DraggableData) => {
      distance.current += Math.abs(data.deltaX) + Math.abs(data.deltaY)
      handlerRef.current.style.removeProperty('transform')

      // handlerRef.current.classList.add(...classes.start.split(' '))

      if (distance.current <= start) return

      if (status.current === 'started') {
        setDragging(true)
        document.dispatchEvent(new Event('onDragStart', { bubbles: true }))
        others.onStart && others.onStart(event, data)
        status.current = 'dragging'
      } else {
        updatePhantomPosition(data)

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

        others.onDrag && others.onDrag(event, data)
      }
    }

    const updatePhantomPosition = (data: DraggableData) => {
      if (!others.move) return
      let { x, y } = offset

      x = data.x + x
      y = data.y + y

      if (others.axis && others.axis !== 'both' && others.axis !== 'x') {
        x = 0
      }
      if (others.axis && others.axis !== 'both' && others.axis !== 'y') {
        y = 0
      }

      updatePanthom()
      phantomRef.current.style.transform = `translate(${x}px, ${y}px)`
    }

    useEffect(() => {
      console.log('a')
      // handlerRef.current.classList.add(...classes.start.split(' '))

      if (dragging && others.move) {
        phantomRef.current = handlerRef.current.cloneNode(
          true
        ) as HTMLDivElement
        document.body.append(phantomRef.current)

        phantomRef.current.classList.remove(...classes.handler.split(' '))
        phantomRef.current.classList.add(...classes.phantom.split(' '))
        handlerRef.current.classList.add(...classes.handler.split(' '))

        updatePanthom()

        const transitionend = () => {
          updateAnimation(undefined)
          phantomRef.current.remove()
          handlerRef.current.classList.remove(...classes.handler.split(' '))
          handlerRef.current.style.removeProperty('transform')
        }

        phantomRef.current.addEventListener('transitionend', transitionend)
      } else {
        handlerRef.current.classList.add(...classes.handler.split(' '))
      }
    }, [dragging])

    return (
      <>
        <ReactDragable
          {...others}
          axis='both'
          onDrag={dragHandler}
          onStop={stopHandler}
          onStart={startHandler}
          positionOffset={offset}
          disabled={others.disabled}
          grid={[throttle, throttle]}
          // defaultClassNameDragging={classes.handler}
          nodeRef={handlerRef}
        >
          {cloneElement(Children.only(children), {
            className: cx(children.props.className),
            ref: handlerRef
          })}
        </ReactDragable>
      </>
    )
    */
  }
)
