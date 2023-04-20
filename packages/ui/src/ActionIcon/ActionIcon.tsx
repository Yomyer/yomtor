import React, { forwardRef } from 'react'
import { createPolymorphicComponent } from '@yomtor/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import { ActionIcon as BaseActionIcon } from '@mantine/core'
import { ActionIconProps } from './ActionIcon.props'
import Ink from 'react-ink'
import useStyles from './ActionIcon.styles'
import { ActionIconGroup } from './ActionIconGroup/ActionIconGroup'

const defaultProps: Partial<ActionIconProps> = {
  size: 'md',
  variant: 'toggle',
  radius: 'xs',
  compact: true,
  actived: false
}

export const _ActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>(
  (props, ref) => {
    const { unstyled, actived, icon, compact, children, ...others } =
      useComponentDefaultProps('ActionIcon', defaultProps, props)

    const { classes, cx } = useStyles(
      { actived, ...others, compact },
      { name: 'ActionIcon', unstyled }
    )

    return (
      <BaseActionIcon {...others} ref={ref} className={classes.root}>
        <Ink hasTouch={false} opacity={0.05} />
        {(icon && <>{icon}</>) || <>{children}</>}
      </BaseActionIcon>
    )
  }
) as any

_ActionIcon.displayName = '@yomtor/ui/ActionIcon'
_ActionIcon.Group = ActionIconGroup

export const ActionIcon = createPolymorphicComponent<
  'button',
  ActionIconProps,
  { Group: typeof ActionIconGroup }
>(_ActionIcon)
