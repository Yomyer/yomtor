import React, { forwardRef, useState } from 'react'
import { createPolymorphicComponent } from '@yomtor/utils'
import { useComponentDefaultProps } from '@yomtor/styles'
import { ConstraintsProps, ConstraintsType } from './Constraints.props'
import useStyles from './Constraints.styles'

const defaultProps: Partial<ConstraintsProps> = {}

export const _Constraints = forwardRef<HTMLButtonElement, ConstraintsProps>(
  (props, ref) => {
    const [verticalHover, setVerticalHover] = useState<ConstraintsType>(null)
    const { vertical, horizontal, ...others } = useComponentDefaultProps(
      'Constraints',
      defaultProps,
      props
    )

    const { classes, cx } = useStyles(
      { vertical, horizontal, ...others },
      { name: 'Constraints' }
    )

    return (
      <div className={classes.root}>
        <div className={classes.outer}>
          <div className={classes.vertical}>
            <div className={classes.verticalHandler} />
          </div>
        </div>
        <div className={classes.inner}>
          <div className={classes.horizontal}>
            <div className={classes.horizontalHandler} />
          </div>
          <div className={classes.target}>
            <div className={classes.horizontalCenterHandler} />
            <div className={classes.verticalCenterHandler} />
          </div>
          <div className={classes.horizontal}>
            <div className={classes.horizontalHandler} />
          </div>
        </div>
        <div className={classes.outer}>
          <div className={classes.vertical}>
            <div className={classes.verticalHandler} />
          </div>
        </div>
      </div>
    )
  }
) as any

_Constraints.displayName = '@yomtor/ui/Constraints'

export const Constraints = createPolymorphicComponent<
  'button',
  ConstraintsProps
>(_Constraints)
