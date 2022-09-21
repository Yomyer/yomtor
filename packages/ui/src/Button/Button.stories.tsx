import React from 'react'
import { YOMTOR_COLORS } from '@yomtor/styles'
import { Button } from './Button'
import { Group } from '@mantine/core'

export default { title: 'UI/Button' }

export function Primary() {
    return <Button variant='filled'>Filled</Button>
}

export function Colors() {
    const items = YOMTOR_COLORS.map((color) => (
        <Group mt='xl' key={color}>
            <Button color={color} variant='filled'>
                Filled
            </Button>
            <Button color={color}>Default</Button>

            <Button color={color} variant='white'>
                White
            </Button>
            <Button color={color} variant='light'>
                Light
            </Button>
            <Button color={color} variant='outline'>
                Outline
            </Button>
            <Button color={color} variant='gradient'>
                Gradient
            </Button>
        </Group>
    ))

    return <div>{items}</div>
}
