import React, {
  forwardRef,
  useReducer,
  useRef,
  useState,
  useEffect
} from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import {
  NumberInput as BaseNumberInput,
  NumberInputHandlers
} from '@mantine/core'
import { NumberInputProps } from './NumberInput.props'
import { Draggable, DraggableData, DraggableEvent } from '../Draggable'
import useStyles from './NumberInput.styles'
import { range } from 'lodash'
import { abs } from '@yomtor/utils'

const defaultProps: Partial<NumberInputProps> = {
  size: 'md',
  radius: 'xs',
  compact: true,
  variant: 'toggle',
  hideControls: true,
  draggable: true,
  precision: 2,
  removeTrailingZeros: true
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
      ...others
    } = useComponentDefaultProps('NumberInput', defaultProps, props)

    const { classes, cx } = useStyles(
      { compact, draggable, variant, ...others },
      { name: 'NumberInput', unstyled }
    )

    const [drag, setDrag] = useState<number>(0)
    const [delta, setDelta] = useState<number>(0)
    const [step, setStep] = useState<number>(1)

    const inputRef = useRef<NumberInputHandlers>()

    const dragHandler = (event: DraggableEvent, data: DraggableData) => {
      if (!data.deltaX) return

      if (event.shiftKey) {
        setStep(10)
      } else if (event.altKey) {
        setStep(0.1)
      } else {
        setStep(1)
      }
      setDelta(data.deltaX)
      setDrag(drag + 1)
    }

    useEffect(() => {
      if (!drag) return
      range(0, abs(delta)).forEach((index) => {
        console.log(index)
        inputRef.current[delta > 0 ? 'increment' : 'decrement']()
      })
    }, [drag])

    return (
      <BaseNumberInput
        {...others}
        ref={ref}
        className={className}
        classNames={classes}
        handlersRef={inputRef}
        step={step}
        icon={
          <Draggable move={false} axis='x' onDrag={dragHandler} distance={0}>
            <div>{icon}</div>
          </Draggable>
        }
      />
    )
  }
)

NumberInput.displayName = '@yomtor/ui/NumberInput'
