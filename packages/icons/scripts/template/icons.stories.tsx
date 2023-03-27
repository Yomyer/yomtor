import React, { useEffect, useRef } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
__imports__(noCase)

const icons = { __icons__(noCase) }


type Props = {
    rotate: number
    icon: React.ReactNode
}

const Canvas: React.FC<Props> = ({ icon: Icon, rotate }) => {
    return (
        <div
            style={{
                background: 'rgba(0,0,0,0.1)',
                height: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                fontSize: 32
            }}
        >
            <Icon rotate={rotate} size="xl" />
        </div>
    )
}

export default {
    title: 'Utils/Icons',
    component: Canvas,
    argTypes: {}
} as ComponentMeta<typeof Canvas>

const Template: ComponentStory<typeof Canvas> = ({ rotate, ...props }) => {
    return (
        <div
            style={{
                display: 'grid',
                gap: 10,
                gridTemplateColumns: 'repeat(6, 1fr)'
            }}
        >
            {Object.keys(icons).map((key) => (
                <Canvas key={key} icon={icons[key]} rotate={rotate} />
            ))}
        </div>
    )
}

export const Playground = Template.bind({})

Playground.args = {
    rotate: 0
}
