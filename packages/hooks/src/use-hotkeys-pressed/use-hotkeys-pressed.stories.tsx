import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useIsHotkeyPressed } from './use-hotkeys-pressed'
import { HotKeysEvent, useHotkeys } from '../use-hotkeys/use-hotkeys'

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
    const [isHotKeyPressed, setIsHotKeyPressed] = useState<boolean>(false)
    useHotkeys({
        keys: '*'
    })
    return (
        <Demo>
            <p>Try typing A</p>
            <input
                onChange={() => setIsHotKeyPressed(useIsHotkeyPressed('a'))}
            />
            {isHotKeyPressed && <p>You added an A</p>}
        </Demo>
    )
}

export const Playground = Template.bind({})

Playground.args = {}
