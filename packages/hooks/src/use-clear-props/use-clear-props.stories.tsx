import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

type Props = {
  children: React.ReactNode
}

const Demo: React.FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default {
  title: 'Hooks/useClearProps',
  component: Demo,
  argTypes: {}
} as ComponentMeta<typeof Demo>

const Template: ComponentStory<typeof Demo> = ({ ...props }) => {

  return (
    <Demo>
      <button onClick={() => console.log('Prefers')} >Color Scheme</button>
    </Demo>
  )
}

export const Playground = Template.bind({})

Playground.args = {}
