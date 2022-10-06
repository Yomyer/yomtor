import React, { forwardRef } from 'react'
import { createPolymorphicComponent } from '@yomtor/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import { ActionIcon as BaseActionIcon } from '@mantine/core'
import { ActionIconProps } from './ActionIcon.props'
import useStyles from './ActionIcon.styles'

const defaultProps: Partial<ActionIconProps> = {}

export const _ActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>(
  (props, ref) => {
    const { unstyled, ...others } = useComponentDefaultProps(
      'ActionIcon',
      defaultProps,
      props
    )

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'ActionIcon', unstyled }
    )

    return <BaseActionIcon {...others} ref={ref} className={classes.root} />
  }
) as any

_ActionIcon.displayName = '@yomtor/ui/ActionIcon'

export const ActionIcon = createPolymorphicComponent<'button', ActionIconProps>(
  _ActionIcon
)
