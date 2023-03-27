import React, { forwardRef } from 'react'
import { SvgIconProps } from './SvgIcon.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import useStyles from './SvgIcon.styles'

const defaultProps: Partial<SvgIconProps> = {
  rotate: null,
  viewbox: '0 0 32 32',
  hidden: false,
  size: 'md'
}

export const SvgIcon = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  const { children, rotate, size, hidden, viewbox, className, ...others } =
    useComponentDefaultProps('SvgIcon', defaultProps, props)

  const { classes, cx } = useStyles(
    { rotate, hidden, size, ...others },
    { name: 'SvgIcon' }
  )

  return (
    <svg ref={ref} viewBox={viewbox} className={cx(classes.root, className)}>
      {children}
    </svg>
  )
})
