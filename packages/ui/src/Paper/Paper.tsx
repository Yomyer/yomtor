import React, { forwardRef } from 'react'
import { createPolymorphicComponent } from '@mantine/core'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Paper as BasePaper } from '@mantine/core'
import { PaperProps } from './Paper.props'
import useStyles from './Paper.styles'

const defaultProps: Partial<PaperProps> = {}

export const _Paper = forwardRef<HTMLDivElement, PaperProps>((props, ref) => {
  const { unstyled, ...others } = useComponentDefaultProps(
    'Paper',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Paper', unstyled })

  return <BasePaper {...others} ref={ref} className={classes.root} />
}) as any

_Paper.displayName = '@yomtor/ui/Paper'

export const Paper = createPolymorphicComponent<'div', PaperProps>(_Paper)
