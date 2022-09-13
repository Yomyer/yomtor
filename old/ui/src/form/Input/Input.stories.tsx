import React from 'react'
import { Input } from './Input'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Form/Input',
    component: Input,
    argTypes: {}
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = ({ ...props }) => {
    return <Input></Input>
}

export const Playground = Template.bind({})

Playground.args = {
    color: 'red'
}
