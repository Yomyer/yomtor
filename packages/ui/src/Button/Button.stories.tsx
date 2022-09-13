import React from 'react'
import { YOMTOR_COLORS } from '@yomtor/styles'
import { Button } from './Button'

export default { title: 'Button' }

export function Colors() {
    const items = YOMTOR_COLORS.map((color) => (
        <div key={color}>
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
        </div>
    ))

    return <div>{items}</div>
}
