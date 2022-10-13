import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import useStyles from './Droppable.styles'
import { DropEvent, DroppableProps } from './Droppable.props'
import { useDropzone, Accept } from 'react-dropzone'
import { isArray, isFunction, pickBy } from 'lodash'
import { Box } from '../Box'
import { useComponentDefaultProps } from '@yomtor/styles'

const defaultProps: Partial<DroppableProps> = {}

export const Droppable = forwardRef<HTMLDivElement, DroppableProps>(
  (props, ref) => {
    const {
      classNames,
      styles,
      onDrop,
      onEnter,
      onLeave,
      onMove,
      onReject,
      children,
      accept,
      maxSize = Infinity,
      click = false,
      multiple,
      disabled,
      loading,
      external = false,
      ...others
    } = useComponentDefaultProps('Droppable', defaultProps, props)

    const element = useRef<HTMLDivElement>()
    useImperativeHandle(ref, () => element.current)

    const counter = useRef(0)
    const data = useRef()
    const [dragging, setDragging] = useState<boolean>(false)
    const [over, setOver] = useState<boolean>()
    const [isDropAccept, setIsDropAccept] = useState<boolean>()
    const [isDropReject, setIsDropReject] = useState<boolean>()

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'Droppable', classNames }
    )

    const move = (event: Event | File[]) => {
      data.current = (event as CustomEvent).detail
      if (!over) {
        setOver(true)
        onEnter && onEnter(createEvent(event))
      }
      onMove && onMove(createEvent(event))
    }

    const clear = () => {
      counter.current = 0
      setOver(false)
      setDragging(false)
    }

    const drop = (event: Event, files?: File[]) => {
      onDrop && onDrop(createEvent(event, files))
      clear()
    }

    const dragStart = () => {
      counter.current++
      setDragging(true)
    }

    const dragStop = () => {
      counter.current--
      if (!counter.current) {
        setDragging(false)
      }
    }

    const enterHandler = (event: Event, force?: boolean) => {
      if (over || force) {
        setOver(true)
        onEnter && onEnter(createEvent(event, force))
      }
    }
    const leaveHandler = (event: Event, force?: boolean) => {
      if (over || force) {
        setOver(false)
        onLeave && onLeave(createEvent(event, force))
      }
    }

    const createEvent = (
      event: Event | File[],
      files?: boolean | File[]
    ): DropEvent => {
      return {
        type: files ? 'files' : 'event',
        props: !files && data.current,
        defaultEvent: !(event instanceof Array) ? event : null,
        files: isArray(files) ? files : [],
        target: element.current
      }
    }

    const toggleEvents = (add = true) => {
      const event = add ? 'addEventListener' : 'removeEventListener'
      document[event]('onDragStart', dragStart)
      document[event]('dragenter', dragStart)
      document[event]('onDragStop', dragStop)
      document[event]('dragleave', dragStop)
      document[event]('drop', clear)

      if (!element.current) return
      element.current[event]('onDropMove', move)
      element.current[event]('onDropClear', clear)
      element.current[event]('onDrop', drop)
    }

    useEffect(() => {
      if (!data.current) return
      if (!over) {
        setIsDropReject(false)
        setIsDropAccept(false)
        return
      }
      if (
        !accept ||
        (accept &&
          Object.values(accept).reduce((stack, current) => {
            if (isArray(current) || !stack) return stack
            if (
              isFunction(current) &&
              !current({ type: 'event', props: data.current })
            )
              return false

            return true
          }, true))
      ) {
        setIsDropReject(false)
        setIsDropAccept(true)
      } else {
        setIsDropReject(true)
        setIsDropAccept(false)
      }
    }, [over, accept])

    useEffect(() => {
      toggleEvents(!disabled)

      return () => {
        toggleEvents(false)
      }
    }, [over, disabled])

    const externalDisabled = disabled || loading || !external
    const { getRootProps, getInputProps, isDragAccept, isDragReject } =
      useDropzone({
        onDropAccepted: (files, event: never) => drop(event, files),
        onDropRejected: (fileRejections) => onReject(fileRejections),
        onDragEnter: (event: never) => enterHandler(event, true),
        onDragLeave: (event: never) => leaveHandler(event, true),
        disabled: externalDisabled,
        accept: pickBy(accept, (value) => isArray(value)) as Accept, // Object.values(accept).reduce((stash, current)=> isArray(current) && stash[], {}), //.filter((item) => isString(item)) as string[]),
        multiple,
        maxSize,
        noClick: !click,
        noKeyboard: !click
      })

    return (
      <Box
        className={cx(classes.root, {
          [classes.over]: over,
          [classes.dragging]: dragging,
          [classes.error]: isDragReject || isDropReject
        })}
        ref={element}
        onMouseEnter={(event: never) => enterHandler(event)}
        onMouseLeave={(event: never) => leaveHandler(event)}
        {...getRootProps({ ref: element })}
        data-droppable
      >
        <>
          {!externalDisabled && <input {...getInputProps()} />}
          {(isFunction(children) &&
            children({
              accepted: isDragAccept || isDropAccept,
              rejected: isDragReject || isDropReject,
              overed: over,
              dragged: dragging
            })) ||
            children}
        </>
      </Box>
    )
  }
) as any

Droppable.displayName = '@yomtor/ui/Droppable'
