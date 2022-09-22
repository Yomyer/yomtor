import React from 'react'
import { SvgIconProps } from './SvgIcon.props'
import { SvgIconStyles } from './SvgIcon.styles'

export const SvgIcon: React.FC<SvgIconProps> = ({
    children,
    viewbox,
    rotate,
    hidden,
    ...props
}) => {
    const { classes } = SvgIconStyles({ hidden, rotate })

    return (
        <svg viewBox={viewbox} className={classes.root} {...props}>
            {children}
        </svg>
    )
}

SvgIcon.defaultProps = {
    rotate: null,
    viewbox: '0 0 32 32',
    hidden: false
}
