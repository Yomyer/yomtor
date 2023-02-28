import React, { forwardRef } from 'react'
import { createPolymorphicComponent } from '@yomtor/utils'
import { useComponentDefaultProps } from '@yomtor/styles'
import { ConstraintsProps } from './Constraints.props'
import useStyles from './Constraints.styles'

const defaultProps: Partial<ConstraintsProps> = {}

export const _Constraints = forwardRef<HTMLButtonElement, ConstraintsProps>(
  (props, ref) => {
    const { unstyled, vertical, horizontal, ...others } =
      useComponentDefaultProps('Constraints', defaultProps, props)

    const { classes, cx } = useStyles(
      { vertical, horizontal, ...others },
      { name: 'Constraints', unstyled }
    )

    return (
      <div className={classes.root}>
        <div className={classes.outer}>
          <div className={classes.vertical}>
            <div className={classes.verticalHandler} />
          </div>
        </div>
        <div className={classes.inner}></div>
        <div className={classes.outer}></div>
      </div>
    )
  }
) as any

_Constraints.displayName = '@yomtor/ui/Constraints'

export const Constraints = createPolymorphicComponent<
  'button',
  ConstraintsProps
>(_Constraints)
