import React, {
    useState,
    useRef,
    useEffect,
    KeyboardEvent,
    FormEventHandler
} from 'react'
import { clearGlobalCursor, setGlobalCursor, Resize } from '@yomtor/cursors'
import { useLongPress, useClearProps } from '@yomtor/hooks'

import { NumericFieldStyles } from './NumericField.styles'
import { NumericFieldProps } from './NumericField.props'

import { Field } from '../Field'
import Draggable, {
    DraggableData,
    DraggableEvent,
    DraggableEventHandler
} from 'react-draggable'
import { Input } from '../Input'
import { ArrowIcon } from '@yomtor/icons'
import { useValid } from './useValid'
import { isUndefined } from 'lodash'
import { Button } from '../Button'

/**
 * Description
 */
export const NumericField: React.FC<NumericFieldProps> = ({
    multiple,
    suffix,
    prefix,
    abs,
    max,
    min,
    integrer,
    mutipleText,
    draggable,
    withArrows,
    arrowPosition = 'end',
    onChange,
    ...props
}) => {
    const [defaultValue, setDefatulValue] = useState(props.defaultValue)
    const [showArrows, setShowArrows] = useState(false)
    const [focused, setFocused] = useState(false)
    const [dragging, setDragging] = useState(false)
    const { classes } = NumericFieldStyles({
        ...{ showArrows, focused, arrowPosition, prefix, suffix, withArrows }
    })
    const validatorProps = { abs, integrer }

    const input = useRef<HTMLInputElement>()
    const origin = { ...props }

    if (!mutipleText) mutipleText = 'Multiple'

    useEffect(() => {
        input.current.value = multiple ? '' : defaultValue.toString()
    }, [multiple])

    const update = (e: React.KeyboardEvent<HTMLInputElement>, offset = 0) => {
        if (e.altKey && !integrer) {
            offset /= 10
        }
        if (e.shiftKey) {
            offset *= 10
        }

        let value = Number(
            (+e.target.value.replace(',', '.') + offset).toFixed(2)
        )

        if (!useValid(validatorProps, value)) {
            value = Number(defaultValue)
        }

        if (abs && value < 0 && !multiple) {
            value = 0
        }

        if (!isUndefined(max) && value > +max && !multiple) {
            value = +max
        }

        if (!isUndefined(min) && value < +min && !multiple) {
            value = +min
        }

        e.target.value = Number(value).toString()

        onChange && onChange(e)
        setDefatulValue(+e.target.value)
    }

    props.onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        update(e as unknown as React.KeyboardEvent<HTMLInputElement>)
        setFocused(false)
        origin.onBlur && origin.onBlur(e)
    }

    props.onFocus = (e) => {
        setDefatulValue(e.target.value)
        setFocused(true)
        origin.onFocus && origin.onFocus(e)
    }

    props.onInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (useValid(validatorProps, e.target.value)) {
            setDefatulValue(e.target.value)
        }
        origin.onInput && origin.onInput(e)
    }

    props.onKeyPress = (e) => {
        if (e.key === 'Enter') {
            update(e)
        }
        origin.onKeyPress && origin.onKeyPress(e)
    }

    props.onKeyDown = (e) => {
        if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
            update(e, e.key === 'ArrowUp' ? 1 : -1)
            e.preventDefault()
        }
        origin.onKeyDown && origin.onKeyDown(e)
    }

    const onDrag = (e: DraggableEvent, data: DraggableData) => {
        if (!data.deltaX) return

        update(
            {
                shiftKey: e.shiftKey,
                altKey: e.altKey,
                target: input.current
            } as React.KeyboardEvent<HTMLInputElement>,
            data.deltaX
        )
        input.current.focus()
    }

    const onDragStart = () => {
        setResizeCursor()
        setDragging(true)
        setTimeout(() => input.current.focus())
    }

    const onDragStop = (e: DraggableEvent) => {
        clearGlobalCursor(Resize)

        setDragging(false)
        onChange &&
            onChange({
                ...e,
                target: input.current
            } as unknown as React.KeyboardEvent<HTMLInputElement>)
    }

    const setResizeCursor = () => {
        if (!draggable || props.disabled) return
        setGlobalCursor(Resize)
    }

    const clearResizeCursor = () => {
        if (!dragging) {
            clearGlobalCursor(Resize)
        }
    }

    const handleIncrease = useLongPress((e: React.MouseEvent) => {
        e.target = input.current
        update(e as unknown as React.KeyboardEvent<HTMLInputElement>, 1)
    })

    const handleDecrease = useLongPress((e: React.MouseEvent) => {
        e.target = input.current
        update(e as unknown as React.KeyboardEvent<HTMLInputElement>, -1)
    })

    return (
        <Field {...props} draggable={draggable} onDrag={onDrag}>
            <div
                className={classes.root}
                onMouseEnter={() => !props.disabled && setShowArrows(true)}
                onMouseLeave={() => !props.disabled && setShowArrows(false)}
            >
                <Draggable
                    axis='x'
                    onDrag={onDrag}
                    onStart={onDragStart}
                    onStop={onDragStop}
                    disabled={!draggable || props.disabled}
                >
                    <label
                        className={classes.prefix}
                        onMouseEnter={setResizeCursor}
                        onMouseLeave={clearResizeCursor}
                    >
                        {prefix}
                    </label>
                </Draggable>

                <Input
                    ref={input}
                    {...{
                        ...useClearProps(props),
                        defaultValue,
                        placeholder: multiple ? mutipleText : ''
                    }}
                />
                <Draggable
                    axis='x'
                    onDrag={onDrag}
                    onStart={onDragStart}
                    onStop={onDragStop}
                    disabled={!draggable || props.disabled}
                >
                    <label
                        className={classes.suffix}
                        onMouseEnter={setResizeCursor}
                        onMouseLeave={clearResizeCursor}
                    >
                        {suffix}
                    </label>
                </Draggable>

                {withArrows ? (
                    <div className={classes.arrows}>
                        <Button {...handleIncrease}>
                            <ArrowIcon rotate={180} />
                        </Button>
                        <Button {...handleDecrease}>
                            <ArrowIcon />
                        </Button>
                    </div>
                ) : null}
            </div>
        </Field>
    )
}

NumericField.defaultProps = {
    defaultValue: '0',
    mutipleText: 'Multiple',
    withArrows: true
}