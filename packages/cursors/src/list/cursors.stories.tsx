import React, { useEffect, useRef } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Cursor, {
    clearCursor,
    clearGlobalCursor,
    cursorWithScope,
    generateSVGCursor,
    setCursor,
    setGlobalCursor
} from '../utils/cursorUtils'
import Buti from './Buti'
import Clone from './Clone'
import Comment from './Comment'
import Cross from './Cross'
import Default from './Default'
import Feather from './Feather'
import Grab from './Grab'
import Grabbing from './Grabbing'
import Maximize from './Maximize'
import Minimize from './Minimize'
import Picker from './Picker'
import Rectangle from './Rectangle'
import Remove from './Remove'
import Resize from './Resize'
import Rotate from './Rotate'

const cursors = { Buti, Clone, Comment, Cross, Default, Feather, Grab, Grabbing, Maximize, Minimize, Picker, Rectangle, Remove, Resize, Rotate }

type Props = {
    cursor?: Cursor
    action?: Cursor
    rotate?: number
}

const Canvas: React.FC<Props> = ({ cursor, rotate, action }) => {
    const cursorRef = useRef<HTMLDivElement>()
    const actionRef = useRef<HTMLDivElement>()

    const enterHandler = () => {
        setGlobalCursor(cursor, rotate, action)
    }

    const leaveHandler = () => {
        clearGlobalCursor(cursor, rotate, action)
    }

    useEffect(() => {
        cursorRef.current.appendChild(
            generateSVGCursor({
                cursor,
                rotation: rotate
            })
        )
        actionRef.current.appendChild(
            generateSVGCursor({
                cursor: Default,
                action: cursor,
                rotation: rotate
            })
        )
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
            style={{
                background: 'rgba(0,0,0,0.1)',
                height: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}
            onMouseEnter={enterHandler}
            onMouseLeave={leaveHandler}
        >
            <div style={{ flex: '1 1 100%', textAlign: 'center' }}>
                {cursor.id}
            </div>
            <div
                ref={cursorRef}
                style={{
                    border: `1px solid rgba(255,255,255, 0.1)`,
                    display: 'flex'
                }}
            ></div>
            <div
                ref={actionRef}
                style={{
                    border: `1px solid rgba(255,255,255, 0.1)`,
                    display: 'flex'
                }}
            ></div>
        </div>
    )
}

export default {
    title: 'Utils/Cursors',
    component: Canvas,
    argTypes: {
        action: {
            control: {
                type: 'select'
            },
            options: ['NoCursor', ...Object.keys(cursors)],
            mapping: { NoCursor: null, ...cursors }
        }
        // myBooleanProp: { control: { type: 'boolean' } },
        // mySelectProp: { options: ['Hello', 'World'], control: { type: 'select' } },
    }
} as ComponentMeta<typeof Canvas>

const Template: ComponentStory<typeof Canvas> = ({
    rotate,
    action,
    ...props
}) => {
    return (
        <div
            style={{
                display: 'grid',
                gap: 10,
                gridTemplateColumns: 'repeat(6, 1fr)'
            }}
        >
            {Object.keys(cursors).map((key) => (
                <Canvas
                    key={key}
                    cursor={cursors[key]}
                    rotate={rotate}
                    action={action}
                />
            ))}
        </div>
    )
}

export const Playground = Template.bind({})

Playground.args = {
    rotate: 0
}
