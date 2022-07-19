import React from 'react'
import { Container } from './Container'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
}

export const argTypes = {
    sx: { table: { disable: true } },
    style: { table: { disable: true } },
    styles: { table: { disable: true } },
    className: { table: { disable: true } },
    classNames: { table: { disable: true } },
    component: { control: 'text' }
}

export const decorators = [
    (Story) => (
        <Container>
            <Story />
        </Container>
    )
]
