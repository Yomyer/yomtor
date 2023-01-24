import React, { forwardRef } from 'react'
import { ButtonStyles } from './Button.styles'
import { ButtonComponent, ButtonProps } from './Button.props'
import { useHover, assignRef } from '@yomtor/hooks'
import { Box } from '../../misc/Box/Box'
import Ink from 'react-ink'
import { PolymorphicRef } from '@yomtor/styles'

export const Button: ButtonComponent = forwardRef(
  <C extends React.ElementType = 'button'>(
    {
      component = 'button',
      hoverOpacity,
      classNames,
      styles,
      children,
      fullWidth,
      ...props
    }: ButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const { hovered, ref: button } = useHover<HTMLButtonElement>()

    const { classes } = ButtonStyles(
      {
        hovered,
        hoverOpacity,
        fullWidth,
        ...props
      },
      { classNames, styles, name: 'Button' }
    )

    return (
      <Box<string>
        component={component}
        ref={(node) => assignRef<HTMLButtonElement>(node, ref, button)}
        className={classes.root}
        {...props}
      >
        <span className={classes.hover} />
        <span className={classes.content}>{children}</span>
        <Ink hasTouch={false} opacity={0.05} />
      </Box>
    )
  }
)

Button.defaultProps = {
  hoverOpacity: 0.06
}
