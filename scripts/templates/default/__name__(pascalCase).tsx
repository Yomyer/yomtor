import React from 'react'
import { __name__(pascalCase)Styles } from './__name__(kebabCase).styles'
import { __name__(pascalCase)Props } from './__name__(kebabCase).props'

export const __name__: React.FC<__name__(pascalCase)Props> = ({
    classNames,
    children,
    ...props
}) => {
    const { classes, cx } = __name__(pascalCase)Styles(
        { ...props },
        { name: '__name__(pascalCase)', classNames }
    )

    return (
        <div className={classes.root} {...props}>
            {children}
        </div>
    )
}

__name__.defaultProps = {
    color: 'red'
}
