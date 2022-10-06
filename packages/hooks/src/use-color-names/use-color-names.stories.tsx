import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useColorNames } from './use-color-names'
type Props = {
  children: React.ReactNode
}

const Demo: React.FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default {
  title: 'Hooks/useColorNames',
  component: Demo,
  argTypes: {}
} as ComponentMeta<typeof Demo>

const Template: ComponentStory<typeof Demo> = ({ ...props }) => {
  const [colorName, setColorName] = useState<string>('')
  const hex = useColorNames(colorName)

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
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          placeholder='Enter a color name...'
        />
        {hex && (
          <>
            <span
              style={{
                marginLeft: '20px',
                padding: '5px',
                fontSize: '30px',
                color: hex ?? ''
              }}
            >
              {hex}
            </span>
            <div
              style={{
                backgroundColor: hex ?? '',
                width: '30px',
                height: '30px',
                display: 'inline-block',
                margin: '10px'
              }}
            />
          </>
        )}
      </div>
    </Demo>
  )
}

export const Playground = Template.bind({})

Playground.args = {}
