import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useHexToRGB } from './use-hex-to-rgb'
type Props = {
  children: React.ReactNode
}

const Demo: React.FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default {
  title: 'Hooks/useHexToRgb',
  component: Demo,
  argTypes: {}
} as ComponentMeta<typeof Demo>

const Template: ComponentStory<typeof Demo> = ({ ...props }) => {
  const [hex, setHex] = useState<string>('')
  const rgb = useHexToRGB(hex)
  console.log(rgb)

  return (
    <Demo>
      <input
        style={{
          padding: '10px 20px',
          fontSize: '20px',
          borderRadius: '10px',
          border: 0
        }}
        type='text'
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        placeholder={'Enter an HEX color...'}
      />
      {rgb && (
        <span
          style={{
            marginLeft: '20px',
            padding: '5px',
            fontSize: '30px',
            backgroundColor: rgb ?? ''
          }}
        >
          {rgb}
        </span>
      )}
    </Demo>
  )
}

export const Playground = Template.bind({})

Playground.args = {}
