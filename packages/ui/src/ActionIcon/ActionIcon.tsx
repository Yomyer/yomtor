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
    const {
      unstyled,
      className,
      classNames,
      actived,
      icon,
      compact,
      children,
      ...others
    } = useComponentDefaultProps('ActionIcon', defaultProps, props)

    const { classes, cx } = useStyles(
      { actived, ...others, compact },
      { name: 'ActionIcon', unstyled, classNames }
    )

    return (
      <BaseActionIcon
        {...others}
        ref={ref}
        className={cx(classes.root, className)}
      >
        <Ink hasTouch={false} opacity={0.05} />
        {(icon && <>{icon}</>) || <>{children}</>}
      </BaseActionIcon>
    )
  }
) as any

_ActionIcon.displayName = '@yomtor/ui/ActionIcon'

export const ActionIcon = createPolymorphicComponent<'button', ActionIconProps>(
  _ActionIcon
)
