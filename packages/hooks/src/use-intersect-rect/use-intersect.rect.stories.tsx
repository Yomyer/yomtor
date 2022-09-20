import React, { useCallback, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useIntersectRect } from './use-intersect-rect'
import { useLongPress } from '../use-long-press/use-long-press'

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
    const a = new DOMRect(aX, aY, 40, 40)
    const b = new DOMRect(50, 50, 40, 40)
    const isIntersecting = useIntersectRect(a, b)
    const onLongPress = (dir: string) => {
        switch (dir) {
            case 'up':
                setAY(aY - 5)
                break
            case 'down':
                setAY(aY + 5)
                break
            case 'right':
                setAX(aX + 5)
                break
            case 'left':
                setAX(aX - 5)
                break
        }
    }
    const longPressEventUp = useLongPress(() => onLongPress('up'))
    const longPressEventDown = useLongPress(() => onLongPress('down'))
    const longPressEventRight = useLongPress(() => onLongPress('right'))
    const longPressEventLeft = useLongPress(() => onLongPress('left'))

    return (
        <Demo>
            <svg width='500' height='300' id='svg'>
                <rect
                    width={a.width}
                    height={a.height}
                    x={a.x}
                    y={a.y}
                    style={{ fill: isIntersecting ? '#f7735c' : '#97d164' }}
                />
                <rect
                    width={b.width}
                    height={b.height}
                    x={b.x}
                    y={b.y}
                    style={{ fill: '#84c5e3' }}
                />
            </svg>
            <div>
                <button {...longPressEventRight} style={{ margin: '5px' }}>
                    RIGHT
                </button>
                <button {...longPressEventLeft} style={{ margin: '5px' }}>
                    LEFT
                </button>
                <button {...longPressEventUp} style={{ margin: '5px' }}>
                    UP
                </button>
                <button {...longPressEventDown} style={{ margin: '5px' }}>
                    DOWN
                </button>
            </div>
        </Demo>
    )
}

export const Playground = Template.bind({})

Playground.args = {}
