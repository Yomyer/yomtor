import React, { forwardRef } from 'react'
import { ForwardRefWithStaticComponents } from '@yomtor/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Tooltip as BaseTooltip } from '@mantine/core'
import { TooltipProps } from './Tooltip.props'
import useStyles from './Tooltip.styles'

const defaultProps: Partial<TooltipProps> = {
  withArrow: true,
  color: 'primary'
}

export const _Tooltip = forwardRef<HTMLElement, TooltipProps>((props, ref) => {
  const { unstyled, ...others } = useComponentDefaultProps(
    'Tooltip',
    defaultProps,
    props
  )

  const { classes } = useStyles({ ...others }, { name: 'Tooltip', unstyled })

  return <BaseTooltip {...others} className={classes.root} />
}) as any

_Tooltip.displayName = '@yomtor/ui/Tooltip'
_Tooltip.Group = BaseTooltip.Group
_Tooltip.Floating = BaseTooltip.Floating

export const Tooltip: ForwardRefWithStaticComponents<
  TooltipProps,
  { Group: typeof BaseTooltip.Group; Floating: typeof BaseTooltip.Floating }
> = _Tooltip
