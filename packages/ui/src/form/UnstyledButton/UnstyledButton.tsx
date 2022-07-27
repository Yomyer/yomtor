import React, { forwardRef } from 'react'
import { UnstyledButtonStyles } from './UnstyledButton.styles'
import {
    UnstyledButtonComponent,
    UnstyledButtonProps
} from './UnstyledButton.props'
import { Box } from '../../misc/Box/Box'
import Ink from 'react-ink'
import { PolymorphicRef } from '@yomtor/styles'

export const UnstyledButton: UnstyledButtonComponent = forwardRef(
    <C extends React.ElementType = 'button'>(
        {
            component = 'button',
            hoverOpacity = 0.3,
            withInk = true,
            classNames,
            styles,
            children,
            fullWidth,
            ...props
        }: UnstyledButtonProps<C>,
        ref: PolymorphicRef<C>
    ) => {
        const { classes } = UnstyledButtonStyles(
            {
                hoverOpacity,
                fullWidth,
                ...props
            },
            { classNames, styles, name: 'Button' }
        )

        return (
            <Box<string>
                component={component}
                ref={ref}
                className={classes.root}
                {...props}
            >
                <span className={classes.hover} />
                <span className={classes.content}>{children}</span>
                {withInk && <Ink hasTouch={false} opacity={0.05} />}
            </Box>
        )
    }
)
