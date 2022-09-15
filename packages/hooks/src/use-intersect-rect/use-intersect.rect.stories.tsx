import React, { useRef, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useIntersectRect } from './use-intersect-rect'

type Props = {
  children: React.ReactNode
}

const Demo: React.FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default {
  title: 'Hooks/useIntersectRect',
  component: Demo,
  argTypes: {}
} as ComponentMeta<typeof Demo>

const Template: ComponentStory<typeof Demo> = ({ ...props }) => {
  const [aX, setAX] = useState<number>(100)
  const [aY, setAY] = useState<number>(50)
  const a = new DOMRect(aX, aY, 40, 40);
  const b = new DOMRect(50, 50, 40, 40);
  const isIntersecting = useIntersectRect(a, b);

  return (
    <Demo>
      <svg width="500" height="300" id="svg">
        <rect width={a.width} height={a.height} x={a.x} y={a.y} style={{ fill: isIntersecting ? 'red' : 'green' }} />
        <rect width={b.width} height={b.height} x={b.x} y={b.y} style={{ fill: 'blue' }} />
      </svg>
      <div>
        <button onClick={() => setAX(aX + 5)}>RIGHT</button>
        <button onClick={() => setAX(aX - 5)}>LEFT</button>
        <button onClick={() => setAY(aY - 5)}>UP</button>
        <button onClick={() => setAY(aY + 5)}>DOWN</button>
      </div>
    </Demo>
  )
}

export const Playground = Template.bind({})

Playground.args = {}
