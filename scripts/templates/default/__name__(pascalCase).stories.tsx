import React from 'react'
import { __name__(pascalCase) } from './__name__(kebabCase)'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: '__atomicity__(pascalCase)s/__folder__(pascalCase)/__name__',
    component: __name__(pascalCase),
    argTypes: {
        // myBooleanProp: { control: { type: 'boolean' } },
        // mySelectProp: { options: ['Hello', 'World'], control: { type: 'select' } },
    }
} as ComponentMeta<typeof __name__(pascalCase)>

const Template: ComponentStory<typeof __name__(pascalCase)> = ({ children, ...props }) => {
    return <__name__(pascalCase) {...props}>{children}</__name__(pascalCase)>
}

export const Playground = Template.bind({})

Playground.args = {
    color: 'red'
}
