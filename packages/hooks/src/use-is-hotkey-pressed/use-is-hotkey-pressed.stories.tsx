import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useIsHotkeyPressed } from './use-is-hotkey-pressed'
import { useHotkeys } from '../use-hotkeys/use-hotkeys'

type Props = {
  children: React.ReactNode
}

const Demo: React.FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default {
  title: 'Hooks/useIsHotkeyPressed',
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
      <p style={{ color: isHotKeyPressed ? 'blue' : null }}>
        Try typing A
      </p>
      <input onChange={() => setIsHotKeyPressed(useIsHotkeyPressed('a'))} />
    </Demo>
  )
}

export const Playground = Template.bind({})

Playground.args = {}
