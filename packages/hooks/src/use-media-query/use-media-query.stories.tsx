import React, { useState } from 'react'
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

interface Result {
    sentence: string
    color: string
    match: boolean
}

const Template: ComponentStory<typeof Demo> = ({ ...props }) => {
    const [result, setResult] = useState<Result>()
    const matchOrientation = useMediaQuery('(orientation: landscape)')
    const matchWidth = useMediaQuery('(min-width: 600px)')

    return (
        <Demo>
            <button
                onClick={() =>
                    setResult({
                        sentence: 'Orientation is landscape:',
                        color: matchOrientation ? 'green' : 'red',
                        match: matchOrientation
                    })
                }
                style={{ margin: '5px' }}
            >
                Orientation
            </button>
            <button
                onClick={() =>
                    setResult({
                        sentence: 'View is wider than 600px:',
                        color: matchWidth ? 'green' : 'red',
                        match: matchWidth
                    })
                }
                style={{ margin: '5px' }}
            >
                Width
            </button>
            {result && (
                <p>
                    {result.sentence}
                    <span style={{ color: result.color, margin: '5px' }}>
                        {result.match.toString()}
                    </span>
                </p>
            )}
        </Demo>
    )
}

export const Playground = Template.bind({})

Playground.args = {}
