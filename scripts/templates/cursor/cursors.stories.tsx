import React, { useEffect, useRef } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Cursor, {
    clearCursor,
    clearGlobalCursor,
    cursorWithScope,
    setCursor,
    setGlobalCursor
} from '../utils/cursorUtils'
__imports__(noCase)

const cursors = { __cursors__(noCase) }

type Props = {
    cursor?: Cursor
    rotate?: number
}

const Canvas: React.FC<Props> = ({ cursor, rotate }) => {
    const ref = useRef<HTMLDivElement>()

    const enterHandler = () => {
        setGlobalCursor(cursor, rotate)
    }

    const leaveHandler = () => {
        clearGlobalCursor(cursor, rotate)
    }

    useEffect(() => {
        // cursorWithScope(ref.current)
    }, [])

    useEffect(() => {
        /*
        setCursor(cursor)
        return () => {
            clearCursor(cursor)
        }
        */
    }, [cursor])

    return (
        <div
            ref={ref}
            style={{
                background: 'rgba(0,0,0,0.1)',
                height: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onMouseEnter={enterHandler}
            onMouseLeave={leaveHandler}
        >
            {cursor.id}
        </div>
    )
}

export default {
    title: 'Utils/Cursors',
    component: Canvas,
    argTypes: {
        cursor: {
            control: {
                type: 'select'
            },
            options: Object.keys(cursors),
            mapping: cursors
        }
        // myBooleanProp: { control: { type: 'boolean' } },
        // mySelectProp: { options: ['Hello', 'World'], control: { type: 'select' } },
    }
} as ComponentMeta<typeof Canvas>

const Template: ComponentStory<typeof Canvas> = ({ rotate, ...props }) => {
    return (
        <div
            style={{
                display: 'grid',
                gap: 10,
                gridTemplateColumns: 'repeat(6, 1fr)'
            }}
        >
            {Object.keys(cursors).map((key) => (
                 <Canvas key={key} cursor={cursors[key]} rotate={rotate} />
            ))}
        </div>
    )
}

export const Playground = Template.bind({})

Playground.args = {
    rotate: 0
}
