import React from 'react'
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
      <p
        style={{ color: matchOrientation ? '#304683' : '#228850' }}
      >{`Orientation is ${matchOrientation ? 'landscape' : ' portrait'}`}</p>
      <p style={{ color: matchWidth ? '#304683' : '#228850' }}>{`Width is ${
        matchWidth ? 'larger' : 'smaller'
      } than 600px`}</p>
    </Demo>
  )
}

export const Playground = Template.bind({})

Playground.args = {}
