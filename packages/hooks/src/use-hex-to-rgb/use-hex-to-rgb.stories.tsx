import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useHexToRgb } from './use-hex-to-rgb'
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
  const rgb = useHexToRgb(hex)
  console.log(rgb)

  return (
    <Demo>
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
          <>
            <span
              style={{
                marginLeft: '20px',
                padding: '5px',
                fontSize: '30px',
                color: rgb ?? ''
              }}
            >
              {rgb}
            </span>
            <div
              style={{
                backgroundColor: rgb ?? '',
                width: '30px',
                height: '30px',
                display: 'inline-block',
                margin: '10px'
              }}
            ></div>
          </>
        )}
      </div>
    </Demo>
  )
}

export const Playground = Template.bind({})

Playground.args = {}
