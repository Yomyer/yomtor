import React, { forwardRef } from 'react'
import { createPolymorphicComponent } from '@mantine/core'
import { useComponentDefaultProps } from '@yomtor/styles'

import { __mantine__ as Base__mantine__ } from '@mantine/core'
import { __name__Props } from './__name__.props'
import useStyles from './__name__.styles'

const defaultProps: Partial<__name__Props> = {}

export const __name__ = forwardRef<HTMLDivElement, __name__Props>(
  (props, ref) => {
    const { unstyled, classsName, ...others } = useComponentDefaultProps(
      '__name__',
      defaultProps,
      props
    )

    const { classes, cx } = useStyles(
      { ...others },
      { name: '__name__', unstyled }
    )

    return (
      <Base__mantine__
        {...others}
        ref={ref}
        className={cx(classsName, classes.root)}
      />
    )
  }
) as any

__name__.displayName = '@yomtor/ui/__name__'
