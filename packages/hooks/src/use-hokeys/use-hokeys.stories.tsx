import React, { useEffect, useRef } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { HotKeysEvent, useHotkeys } from './use-hokeys'

type Props = {
    children: React.ReactNode
}

const Demo: React.FC<Props> = ({ children }) => {
    useHotkeys({
        keys: 'arrows',
        callbackDown: (event: KeyboardEvent, ui: HotKeysEvent) => {
            console.log(ui)
        },
        callbackUp: () => {
            console.log('up')
        },
        options: {}
    })
    return <>{children}</>
}

export default {
    title: 'Hooks/useHotkeys',
    component: Demo,
    argTypes: {}
} as ComponentMeta<typeof Demo>

const Template: ComponentStory<typeof Demo> = ({ ...props }) => {
    return (
        <Demo>
            <input />
        </Demo>
    )
}

export const Playground = Template.bind({})

Playground.args = {}
