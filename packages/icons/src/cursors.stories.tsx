import React, { useEffect, useRef } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Cursor, {
    clearCursor,
    clearGlobalCursor,
    cursorWithScope,
    setCursor,
    setGlobalCursor
} from './utils/cursorUtils'
import Buti from './cursors/Buti'
import Default from './cursors/Default'
import Test from './cursors/Test'

const cursors = { Buti, Default, Test }

type Props = {
    cursor?: Cursor
}

const Canvas: React.FC<Props> = ({ cursor }) => {
    const ref = useRef<HTMLDivElement>()

    const enterHandler = () => {
        setGlobalCursor(cursor)
    }

    const leaveHandler = () => {
        clearGlobalCursor(cursor)
    }

    useEffect(() => {
        //cursorWithScope(ref.current)
    }, [])

    useEffect(() => {
        /*setCursor(cursor)
        return () => {
            clearCursor(cursor)
        }*/
    }, [cursor])

    return (
        <div
            ref={ref}
            style={{
                background: 'rgba(0,0,0,0.1)',
                width: 100,
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

const Template: ComponentStory<typeof Canvas> = ({ ...props }) => {
    return (
        <>
            {Object.keys(cursors).map((key) => (
                <Canvas key={key} cursor={cursors[key]} />
            ))}
        </>
    )
}

export const Playground = Template.bind({})

Playground.args = {}
