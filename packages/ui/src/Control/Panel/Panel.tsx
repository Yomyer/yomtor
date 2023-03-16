import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { PanelProps } from './Panel.props'
import useStyles from './Panel.styles'

const defaultProps: Partial<PanelProps> = {}

export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { unstyled, className, ...others } = useComponentDefaultProps(
    'Panel',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Panel', unstyled })

  return <div {...others} ref={ref} className={cx(className, classes.root)} />
})

Panel.displayName = '@yomtor/ui/Panel'
