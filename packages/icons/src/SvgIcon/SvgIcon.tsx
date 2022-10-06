import React from 'react'
import { SvgIconProps } from './SvgIcon.props'
import { SvgIconStyles } from './SvgIcon.styles'

export const SvgIcon: React.FC<SvgIconProps> = ({
  children,
  viewbox,
  rotate,
  hidden,
  size,
  ...props
}) => {
  // interface GetSize {
  //   size: string | number
  //   sizes: Record<string, any>
  // }

  // const sizes = {
  //   xs: 18,
  //   sm: 22,
  //   md: 28,
  //   lg: 34,
  //   xl: 44
  // }

  // const sizefn = (props: GetSize): string | number => {
  //   if (typeof props.size === 'number') {
  //     return props.size
  //   }
  //   const computedSize = props.sizes[props.size]
  //   return computedSize != undefined ? computedSize : null
  // }

  // const finalSize = sizefn({ size, sizes })

  const { classes } = SvgIconStyles({ hidden, rotate, size })

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
