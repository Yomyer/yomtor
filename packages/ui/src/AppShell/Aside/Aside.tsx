import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Aside as BaseAside } from '@mantine/core'
import { AsideProps } from './Aside.props'
import useStyles from './Aside.styles'

const defaultProps: Partial<AsideProps> = {}

export const Aside = forwardRef<HTMLDivElement, AsideProps>((props, ref) => {
  const { unstyled, className, ...others } = useComponentDefaultProps(
    'Aside',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Aside', unstyled })

  return (
    <BaseAside {...others} ref={ref} className={cx(className, classes.root)} />
  )
})

Aside.displayName = '@yomtor/ui/Aside'
