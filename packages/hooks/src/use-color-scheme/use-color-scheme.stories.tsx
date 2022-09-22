import React from 'react'
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
  const preferedColorScheme = useColorScheme()

  return (
    <Demo>
      <p>
        Preferred color scheme:
        <span
          style={{
            padding: '5px'
          }}
        >
          {`${preferedColorScheme} ${
            preferedColorScheme === 'light' ? '☀' : '☾'
          }`}
        </span>
      </p>
    </Demo>
  )
}

export const Playground = Template.bind({})

Playground.args = {}
