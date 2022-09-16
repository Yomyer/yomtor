import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useIsHotkeyPressed } from './use-hotkeys-pressed'

type Props = {
    children: React.ReactNode
}

const Demo: React.FC<Props> = ({ children }) => {
    return <>{children}</>
}

export default {
    title: 'Hooks/useIsHotkeysPressed',
    component: Demo,
    argTypes: {}
} as ComponentMeta<typeof Demo>

const Template: ComponentStory<typeof Demo> = ({ ...props }) => {
    return (
        <Demo>
            <input onChange={() => console.log(useIsHotkeyPressed('up'))} />
        </Demo>
    )
}

export const Playground = Template.bind({})

Playground.args = {}
