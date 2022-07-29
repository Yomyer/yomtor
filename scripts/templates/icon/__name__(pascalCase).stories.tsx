import React from 'react'
import { __name__(pascalCase)Icon } from './__name__'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Icons/__name__',
    component: __name__(pascalCase)Icon,
    argTypes: {
        viewport: { table: { disable: true } }
    }
} as ComponentMeta<typeof __name__(pascalCase)Icon>

const Template: ComponentStory<typeof __name__(pascalCase)Icon> = ({ ...props }) => {
    return <__name__(pascalCase)Icon {...props} />
}

export const Playground = Template.bind({})

Playground.args = {
    hidden: false
}
