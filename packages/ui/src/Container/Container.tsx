import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Container as BaseContainer } from '@mantine/core'
import { ContainerProps } from './Container.props'
import useStyles from './Container.styles'

const defaultProps: Partial<ContainerProps> = {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const { unstyled, className, ...others } = useComponentDefaultProps(
      'Container',
      defaultProps,
      props
    )

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'Container', unstyled }
    )

    return (
      <BaseContainer
        {...others}
        ref={ref}
        className={cx(className, classes.root)}
      />
    )
  }
) as any

Container.displayName = '@yomtor/ui/Container'
