import React from 'react'
import { UnstyledButton } from './UnstyledButton'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Form/UnstyledButton',
    component: UnstyledButton
} as ComponentMeta<typeof UnstyledButton>

const Template: ComponentStory<typeof UnstyledButton> = ({ ...props }) => {
    return <UnstyledButton {...props}>Button</UnstyledButton>
}

export const Playground = Template.bind({})

Playground.args = {
    fullWidth: false,
    hoverOpacity: 0.3,
    component: 'button',
    withInk: true
}
