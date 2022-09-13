import React from 'react'
import { Input } from './Input'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Form_old/Input',
    component: Input,
    argTypes: {
        onChange: { action: 'Changed' }
    }
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = ({ children, ...props }) => {
    return (
        <Input {...props} defaultValue='value'>
            {children}
        </Input>
    )
}

export const Playground = Template.bind({})

Playground.args = {}
