import React, { forwardRef } from 'react'
import { createPolymorphicComponent } from '@yomtor/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import { ActionIcon as BaseActionIcon } from '@mantine/core'
import { ActionIconProps } from './ActionIcon.props'
import Ink from 'react-ink'
import useStyles from './ActionIcon.styles'

const defaultProps: Partial<ActionIconProps> = {
  size: 'md',
  variant: 'toggle',
  radius: 'xs',
  compact: true,
  actived: false
}

export const _ActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>(
  (props, ref) => {
    const { unstyled, compact, children, ...others } = useComponentDefaultProps(
      'ActionIcon',
      defaultProps,
      props
    )

    const { classes, cx } = useStyles(
      { ...others, compact },
      { name: 'ActionIcon', unstyled }
    )

    return (
      <BaseActionIcon {...others} ref={ref} className={classes.root}>
        <Ink hasTouch={false} opacity={0.05} />
        {children}
      </BaseActionIcon>
    )
  }
) as any

_ActionIcon.displayName = '@yomtor/ui/ActionIcon'

export const ActionIcon = createPolymorphicComponent<'button', ActionIconProps>(
  _ActionIcon
)
