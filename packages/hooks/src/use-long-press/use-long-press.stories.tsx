import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useLongPress } from './use-long-press'

type Props = {
  children: React.ReactNode
}

const Demo: React.FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default {
  title: 'Hooks/useLongPress',
  component: Demo,
  argTypes: {}
} as ComponentMeta<typeof Demo>

const Template: ComponentStory<typeof Demo> = ({ ...props }) => {
  const [longPressCount, setLongPressCount] = useState(0)
  const onLongPress = () => {
    setLongPressCount(longPressCount + 1)
  }

  const longPressEvent = useLongPress(onLongPress)
  return (
    <Demo>
      <button {...longPressEvent}>Press me</button>
      <p>Long press count: {longPressCount}</p>
    </Demo>
  )
}

export const Playground = Template.bind({})

Playground.args = {}
