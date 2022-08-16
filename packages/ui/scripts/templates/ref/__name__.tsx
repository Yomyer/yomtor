import React, { forwardRef } from 'react'
import { __name__Props } from './__name__.props'
import { __name__Styles } from './__name__.styles'
import { Box } from '../../misc/Box/Box'

import {
    createPolymorphicComponent,
    extractSystemStyles,
    useSx
} from '@yomtor/styles'

export const ___name__ = forwardRef<
    HTML__name__Element,
    __name__Props & { component: any }
>(({ className, classNames, component, style, styles, ...others }, ref) => {
    const { classes } = __name__Styles(
        {
            classNames,
            styles,
            ...others
        },
        { classNames, styles, name: '__name__' }
    )

    return (
        <Box
            component={'__component__(kebabCase)'}
            ref={ref}
            className={classes.root}
            style={style}
            {...others}
        />
    )
})

___name__.displayName = '__name__'

export const __name__ = createPolymorphicComponent<
    '__component__(kebabCase)',
    __name__Props
>(___name__)
