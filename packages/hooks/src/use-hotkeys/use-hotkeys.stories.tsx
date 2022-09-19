import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { HotKeysEvent, useHotkeys } from './use-hotkeys'
import hotkeys from 'hotkeys-js'

type Props = {
    children: React.ReactNode
}

const Demo: React.FC<Props> = ({ children }) => {
    return <>{children}</>
}

export default {
    title: 'Hooks/useHotkeys',
    component: Demo,
    argTypes: {}
} as ComponentMeta<typeof Demo>

const Template: ComponentStory<typeof Demo> = ({ ...props }) => {
    const [key, setKey] = useState<string>()
    useHotkeys({
        keys: 'arrows',
        callbackDown: (event: KeyboardEvent, ui: HotKeysEvent) => {
            setKey(event.key)
        },
        callbackUp: () => {
            setKey(undefined)
        },
        options: {}
    })
    return (
        <Demo>
            <p>Press any arrow outside the input</p>
            <input />
            <p>Key pressed: {key && <span>{key}</span>}</p>
        </Demo>
    )
}

export const Playground = Template.bind({})

Playground.args = {}
