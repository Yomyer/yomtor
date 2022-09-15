import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useColorWord } from './use-color-word'

type Props = {
  children: React.ReactNode
}

interface RandomColor {
  hue: number,
  saturation: number,
  lightness: number
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
  const [word, setWord] = useState<string>('');
  const [randomColor, setRandomColor] = useState<RandomColor>();
  const generateColor = (event) => {
    setWord(event.currentTarget.value);
    setRandomColor(useColorWord(word));
  }
  return (
    <Demo>
      <input value={word} onChange={(generateColor)} />
      {randomColor && <p style={{ color: `hsl(${randomColor.hue}, ${randomColor.saturation}%, ${randomColor.lightness}%)` }}>{word}</p>}
    </Demo>
  )
}

export const Playground = Template.bind({})

Playground.args = {}
