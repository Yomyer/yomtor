import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useColorScheme } from './use-color-scheme'

type Props = {
  children: React.ReactNode
}

const Demo: React.FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default {
  title: 'Hooks/useColorScheme',
  component: Demo,
  argTypes: {}
} as ComponentMeta<typeof Demo>

const Template: ComponentStory<typeof Demo> = ({ ...props }) => {

  const preferedColorScheme = useColorScheme();

  return (
    <Demo>
      <button onClick={() => console.log('Prefers', preferedColorScheme)} >Color Scheme</button>
    </Demo>
  )
}

export const Playground = Template.bind({})

Playground.args = {}
