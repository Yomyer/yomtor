import React from 'react'
import { TreeObjectNode } from './TreeObjectNode'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Molecules/Display/TreeObjectNode',
    component: TreeObjectNode,
    argTypes: {
        // myBooleanProp: { control: { type: 'boolean' } },
        // mySelectProp: { options: ['Hello', 'World'], control: { type: 'select' } },
    }
} as ComponentMeta<typeof TreeObjectNode>

const Template: ComponentStory<typeof TreeObjectNode> = ({ ...props }) => {
    return <TreeObjectNode {...props}></TreeObjectNode>
}

export const Playground = Template.bind({})

Playground.args = {
    node: {
        label: 'Muñeco xD'
    }
}
