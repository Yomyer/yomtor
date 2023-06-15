import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
  SyntheticEvent,
  FocusEvent
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
import { useEventListener, useId, useMergedRef, clamp } from '@yomtor/hooks'
import { ResizePanel, useGlobalCursor } from '@yomtor/cursors'
import { useForceUpdate } from '@mantine/hooks'

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
  mixedLabel: 'Mixed',
  empty: true
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
      onBlur,
      onFocus,
      parser,
      classNames,
      styles,
      mixed: isMixed,
      mixedLabel,
      formatter,
      precision,
      value: defaultValue,
      removeTrailingZeros,
      min,
      max,
      empty,
      ...others
    } = useComponentDefaultProps('NumberInput', defaultProps, props)

    const { classes, cx } = useStyles(
      { compact, draggable, variant, icon, ...others },
      { classNames, styles, name: 'NumberInput', unstyled }
    )

    const rerender = useForceUpdate()
    const [drag, setDrag] = useState<number>(0)
    const [delta, setDelta] = useState<number>(0)
    const [step, setStep] = useState<number>(1)
    const [mixed, setMixed] = useState<boolean>(false)
    const [focus, setFocus] = useState<boolean>(false)
    const unabled = useRef<boolean>()
    const inputRef = useRef<HTMLInputElement>()
    const handlersRef = useRef<NumberInputHandlers>()
    const [showCursor, hideCursor] = useGlobalCursor(ResizePanel)

    const _min = typeof min === 'number' ? min : -Infinity
    const _max = typeof max === 'number' ? max : Infinity

    const value = useRef<number | ''>()
    const defValue = useRef<number>()

    useEffect(() => {
      setMixed(isMixed)
    }, [isMixed])

    useEffect(() => {
      value.current = defaultValue
      defValue.current = parseFloat(defaultValue.toString())
    }, [defaultValue])

    useEffect(() => {
      if (!drag) return
      if (mixed) {
        changeHandler(delta)
      } else {
        handlersRef.current[delta > 0 ? 'increment' : 'decrement']()
      }
    }, [drag])

    useEffect(() => {
      if (focus) inputRef.current.select()
    }, [focus])

    const parsePrecision = (val: number | '') => {
      if (val === '') return ''

      let result = val.toFixed(precision)

      if (removeTrailingZeros && precision > 0) {
        result = result.replace(new RegExp(`[0]{0,${precision}}$`), '')
        if (result.endsWith('.')) {
          result = result.slice(0, -1)
        }
      }

      return result
    }

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
    }
    const stopHandler = (event: DraggableEvent, data: DraggableData) => {
      hideCursor()
      onStop && onStop(event, data)
    }

    const changeHandler = (val: number) => {
      if (Number.isNaN(val) && empty) return
      if (Number.isNaN(val)) val = defValue.current

      value.current = val
      rerender()

      if (!unabled.current) {
        onChange && onChange(val, mixed)
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
        unabled.current = false
        changeHandler(
          parseFloat(
            parsePrecision(
              clamp(parseFloat(inputRef.current.value), _min, _max)
            )
          )
        )
        inputRef.current.blur()
        onBlur && onBlur(event as any)
      } else {
        if (mixed) {
          setMixed(false)
        }

        unabled.current = true
      }
    }

    const blurHandler = (event: SyntheticEvent | MouseEvent) => {
      if (
        focus &&
        unabled.current &&
        !isEqual(event.target, inputRef.current)
      ) {
        unabled.current = false
        changeHandler(
          parseFloat(
            parsePrecision(
              clamp(parseFloat(inputRef.current.value), _min, _max)
            )
          )
        )
      }
      if (focus && !isEqual(event.target, inputRef.current)) {
        onBlur && onBlur(event as any)
        setFocus(false)
      }
    }

    const focusHandler = (event: SyntheticEvent | MouseEvent) => {
      onFocus && onFocus(event as any)
      setFocus(true)
    }

    const downHandler = () => {
      inputRef.current.focus()
      setTimeout(() => inputRef.current.focus())
    }

    useEventListener('mousedown', blurHandler, {
      element: document,
      capture: true
    })

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
        value={value.current}
        max={max}
        min={min}
        precision={precision}
        removeTrailingZeros={removeTrailingZeros}
        parser={
          !parser
            ? (value) => {
                return value.replace(/[^(\d)|,|.]/g, '').replace(',', '.')
              }
            : parser
        }
        formatter={
          !focus
            ? !formatter
              ? (value) => (mixed ? mixedLabel : value)
              : formatter
            : undefined
        }
        onBlur={onBlur}
        onFocus={focusHandler}
        icon={
          <Draggable
            move={false}
            axis='x'
            onDrag={dragHandler}
            onStart={startHandler}
            onStop={stopHandler}
            onMouseDown={downHandler}
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
