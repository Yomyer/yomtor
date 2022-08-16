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

const disables = [
    'm',
    'mx',
    'my',
    'mt',
    'mb',
    'ml',
    'mr',
    'p',
    'px',
    'py',
    'pt',
    'pb',
    'pl',
    'pr',
    'sx',
    'style',
    'styles',
    'className',
    'classNames',
    'unstyled'
]

export const argTypes = disables.reduce((stash, current) => {
    stash[current] = { table: { disable: true } }
    return stash
}, {})

export const decorators = [
    (Story) => (
        <Container>
            <Story />
        </Container>
    )
]
