import React from 'react'
import { Box } from './Box'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Atoms/Misc/Box',
    component: Box,
    argTypes: {
        component: { control: 'text' }
    }
} as ComponentMeta<typeof Box>

const Template: ComponentStory<typeof Box> = ({ ...props }) => {
    return (
        <Box
            {...props}
            mt={10}
            sx={(theme) => ({
                color: theme.palette.primary.main
            })}
        ></Box>
    )
}

export const Playground = Template.bind({})

Playground.args = {
    component: 'div',
    children: 'dasdasda'
}
