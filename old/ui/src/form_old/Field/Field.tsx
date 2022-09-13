import React, { DragEvent, useState } from 'react'
import { FieldStyles } from './Field.styles'
import { FieldProps } from './Field.props'
import { setGlobalCursor, clearGlobalCursor, Resize } from '@yomtor/cursors'
import Draggable, {
    DraggableData,
    DraggableEvent,
    DraggableEventHandler
} from 'react-draggable'

/**
 * Description
 */
export const Field = <T extends HTMLElement>({
    label: labelText,
    position = 'above',
    align = 'start',
    draggable = false,
    disabled = false,
    children,
    ...props
}: Omit<FieldProps<T>, 'onDrag'> & { onDrag?: DraggableEventHandler }) => {
    const [dragging, setDraggin] = useState(false)
    const { classes } = FieldStyles({ position, align })

    const dragHandler = (e: DraggableEvent, data?: DraggableData) => {
        props.onDrag && props.onDrag(e, data)
    }

    return (
        <div className={classes.root}>
            {labelText && (
                <div className={classes.wrapper}>
                    <Draggable
                        axis='x'
                        onDrag={(e, data) => dragHandler(e, data)}
                        onStart={() => {
                            setGlobalCursor(Resize)
                            setDraggin(true)
                        }}
                        onStop={() => {
                            setDraggin(false)
                            clearGlobalCursor(Resize)
                        }}
                        disabled={!draggable || disabled}
                    >
                        <label
                            className={classes.label}
                            onMouseMove={() =>
                                draggable &&
                                !disabled &&
                                setGlobalCursor(Resize)
                            }
                            onMouseLeave={() =>
                                !dragging && clearGlobalCursor(Resize)
                            }
                        >
                            {labelText}
                        </label>
                    </Draggable>
                </div>
            )}
            <div>{children}</div>
        </div>
    )
}

Field.defaultProps = {
    position: 'above',
    align: 'start'
}