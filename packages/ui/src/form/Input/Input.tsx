import React, { forwardRef } from 'react'
import { InputProps } from './Input.props'
import { InputStyles } from './Input.styles'
import { Box } from '../../misc/Box/Box'

import {
    createPolymorphicComponent,
    extractSystemStyles,
    useSx
} from '@yomtor/styles'

export const _Input = forwardRef<
    HTMLInputElement,
    InputProps & { component: any }
>(({ className, classNames, component, style, styles, ...others }, ref) => {
    const { classes, cx } = InputStyles(
        {
            classNames,
            styles,
            ...others
        },
        { classNames, styles, name: 'Input' }
    )

    const { systemStyles, rest } = extractSystemStyles(others)

    return (
        <Box
            className={cx(classes.root, className)}
            style={style}
            {...systemStyles}
        >
            <Box
                component={'input'}
                ref={ref}
                className={classes.root}
                {...rest}
            />
        </Box>
    )
})

_Input.displayName = 'Input'

export const Input = createPolymorphicComponent<'input', InputProps>(_Input)
