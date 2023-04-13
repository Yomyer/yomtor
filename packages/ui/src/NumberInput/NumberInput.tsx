import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
  SyntheticEvent
} from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import {
  NumberInput as BaseNumberInput,
  NumberInputHandlers
} from '@mantine/core'
import { NumberInputProps } from './NumberInput.props'
import { Draggable, DraggableData, DraggableEvent } from '../Draggable'
import useStyles from './NumberInput.styles'
import { isEqual, omit, random, range } from 'lodash'
import { abs } from '@yomtor/utils'
import { useEventListener, useId, useMergedRef } from '@yomtor/hooks'
import { ResizePanel, useGlobalCursor } from '@yomtor/cursors'

const defaultProps: Partial<NumberInputProps> = {
  size: 'md',
  radius: 'xs',
  compact: true,
  variant: 'toggle',
  hideControls: true,
  draggable: true,
  precision: 2,
  removeTrailingZeros: true,
  blur: true,
  noClampOnBlur: true
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    const {
      unstyled,
      icon,
      draggable,
      className,
      compact,
      variant,
      blur,
      onStop,
      onStart,
      onChange,
      draggingRef,
      mixed,
      ...others
    } = useComponentDefaultProps('NumberInput', defaultProps, props)

    const { classes, cx } = useStyles(
      { compact, draggable, variant, ...others },
      { name: 'NumberInput', unstyled }
    )

    const [drag, setDrag] = useState<number>(0)
    const [delta, setDelta] = useState<number>(0)
    const [step, setStep] = useState<number>(1)
    const disabled = useRef<boolean>()
    const inputRef = useRef<HTMLInputElement>()
    const handlersRef = useRef<NumberInputHandlers>()
    const [showCursor, hideCursor] = useGlobalCursor(ResizePanel)

    useEffect(() => {
      if (!drag) return
      handlersRef.current[delta > 0 ? 'increment' : 'decrement']()
    }, [drag])

    const dragHandler = (event: DraggableEvent, data: DraggableData) => {
      if (!data.deltaX) return

      const step = abs(data.deltaX)

      if (event.shiftKey) {
        setStep(10 * step)
      } else if (event.altKey) {
        setStep(0.1 * step)
      } else {
        setStep(1 * step)
      }

      setDelta(data.deltaX)
      setDrag(drag + 1)
    }

    const startHandler = (event: DraggableEvent, data: DraggableData) => {
      showCursor(true)
      onStart && onStart(event, data)
      draggingRef && (draggingRef.current = true)
    }
    const stopHandler = (event: DraggableEvent, data: DraggableData) => {
      hideCursor()
      onStop && onStop(event, data)
      draggingRef && (draggingRef.current = false)
    }

    const changeHandler = (value: number) => {
      console.log(value)
      if (!disabled.current) {
        onChange && onChange(value)
      }
    }

    const cursorHandlers = {
      onMouseEnter: () => {
        showCursor()
      },
      onMouseLeave: () => {
        hideCursor()
      }
    }

    const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (['Enter', 'Tab'].includes(event.key)) {
        disabled.current = false
        changeHandler(parseFloat(inputRef.current.value))
        inputRef.current.blur()
      } else {
        if (mixed) {
          // setVal(parseFloat(event.key))
          inputRef.current.value = event.key
        }

        disabled.current = true
      }
    }

    const blurHandler = (event: SyntheticEvent | MouseEvent) => {
      if (disabled.current && !isEqual(event.target, inputRef.current)) {
        disabled.current = false
        changeHandler(parseFloat(inputRef.current.value))
      }
    }

    useEventListener('mousedown', blurHandler, document)

    return (
      <BaseNumberInput
        {...others}
        ref={useMergedRef(ref, inputRef)}
        className={className}
        classNames={classes}
        handlersRef={handlersRef}
        step={step}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
        // onKeyUp={}
        formatter={(value) => (mixed ? 'Mixed' : value)}
        icon={
          <Draggable
            move={false}
            axis='x'
            onDrag={dragHandler}
            onStart={startHandler}
            onStop={stopHandler}
            distance={0}
          >
            <div {...cursorHandlers}>{icon}</div>
          </Draggable>
        }
      />
    )
  }
)

NumberInput.displayName = '@yomtor/ui/NumberInput'
