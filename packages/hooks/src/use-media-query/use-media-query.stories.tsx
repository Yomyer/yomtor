import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useMediaQuery } from './use-media-query'

type Props = {
  children: React.ReactNode
}

const Demo: React.FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default {
  title: 'Hooks/useMediaQuery',
  component: Demo,
  argTypes: {}
} as ComponentMeta<typeof Demo>

const Template: ComponentStory<typeof Demo> = ({ ...props }) => {

  const matchOrientation = useMediaQuery('(orientation: landscape)')
  const matchWidth = useMediaQuery('(min-width: 600px)')

  return (
    <Demo>
      <button onClick={() => console.log('Is landscape', matchOrientation)} >Orientation</button>
      <button onClick={() => console.log('Is wider than 600px', matchWidth)} >Width</button>
    </Demo>
  )
}

export const Playground = Template.bind({})

Playground.args = {}
