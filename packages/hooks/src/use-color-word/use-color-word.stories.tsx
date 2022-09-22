import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useColorWord } from './use-color-word'

type Props = {
  children: React.ReactNode
}

const Demo: React.FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default {
  title: 'Hooks/useColorWord',
  component: Demo,
  argTypes: {}
} as ComponentMeta<typeof Demo>

const Template: ComponentStory<typeof Demo> = ({ ...props }) => {
  const [text, setText] = useState<string>('')
  const color = useColorWord(text)

  return (
    <Demo>
      <div
        className='App'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: color
        }}
      >
        <span style={{ marginTop: '20px', fontSize: '30px' }}>{color}</span>
        <input
          style={{
            padding: '10px 20px',
            fontSize: '20px',
            borderRadius: '10px',
            border: 0
          }}
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={'Enter text...'}
        />
      </div>
    </Demo>
  )
}

export const Playground = Template.bind({})

Playground.args = {}
