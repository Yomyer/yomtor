import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { NumberIcon as BaseNumberIcon } from '@mantine/core'
import { NumberIconProps } from './NumberIcon.props'
import useStyles from './NumberIcon.styles'

const defaultProps: Partial<NumberIconProps> = {}

export const NumberIcon = forwardRef<HTMLDivElement, NumberIconProps>(
  (props, ref) => {
    const { unstyled, className, ...others } = useComponentDefaultProps(
      'NumberIcon',
      defaultProps,
      props
    )

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'NumberIcon', unstyled }
    )

    return (
      <BaseNumberIcon
        {...others}
        ref={ref}
        className={cx(className, classes.root)}
      />
    )
  }
)

NumberIcon.displayName = '@yomtor/ui/NumberIcon'
