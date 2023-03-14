import React, { forwardRef, MouseEvent, useState } from 'react'
import { createPolymorphicComponent } from '@yomtor/utils'
import { useComponentDefaultProps } from '@yomtor/styles'
import {
  ConstraintsProps,
  ConstraintPositions,
  ConstraintDirections
} from './Constraints.props'
import useStyles from './Constraints.styles'
import { startCase } from 'lodash'

const defaultProps: Partial<ConstraintsProps> = {}

export const _Constraints = forwardRef<HTMLButtonElement, ConstraintsProps>(
  (props, ref) => {
    const [verticalHover, setVerticalHover] =
      useState<ConstraintPositions>(null)
    const [horizontalHover, setHorizontalHover] =
      useState<ConstraintPositions>(null)
    const [direction, setDirection] = useState<ConstraintDirections>(null)

    const { vertical, horizontal, onChange, ...others } =
      useComponentDefaultProps('Constraints', defaultProps, props)

    const { classes, cx } = useStyles(
      { vertical, horizontal, verticalHover, horizontalHover, ...others },
      { name: 'Constraints' }
    )

    const df = { setVerticalHover, setHorizontalHover }

    const events = (
      direction: ConstraintDirections,
      position: ConstraintPositions
    ) => ({
      onMouseEnter: () => df['set' + startCase(direction) + 'Hover'](position),
      onMouseLeave: () => df['set' + startCase(direction) + 'Hover'](null),
      onClick: () => {
        onChange(direction, position)
      }
    })

    const clearHandler = () => {
      setHorizontalHover(null)
      setVerticalHover(null)
    }

    const bothHandler = (event: MouseEvent) => {
      const offset = {
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY
      }
      const element = event.target as HTMLElement
      const center = {
        x: element.offsetWidth / 2,
        y: element.offsetHeight / 2
      }
      const angle = Math.atan2(offset.y - center.y, offset.x - center.x)
      let dir: ConstraintDirections =
        angle > -Math.PI / 4 && angle <= Math.PI / 4
          ? 'horizontal'
          : angle > Math.PI / 4 && angle <= (3 * Math.PI) / 4
          ? 'vertical'
          : angle > (3 * Math.PI) / 4 || angle <= (-3 * Math.PI) / 4
          ? 'horizontal'
          : 'vertical'

      clearHandler()
      if (dir === 'horizontal' && horizontal === 'center') {
        dir = 'vertical'
      }
      if (dir === 'vertical' && vertical === 'center') {
        dir = 'horizontal'
      }

      df['set' + startCase(dir) + 'Hover']('center')
      setDirection(dir)
    }

    const bothClickHandler = () => {
      onChange(direction, 'center')
    }

    return (
      <div className={classes.root}>
        <div className={classes.outer}>
          <div className={classes.column} {...events('vertical', 'start')}>
            <div className={cx(classes.verticalHandler, classes.top)} />
          </div>
        </div>
        <div className={classes.inner}>
          <div className={classes.row} {...events('horizontal', 'start')}>
            <div className={cx(classes.horizontalHandler, classes.left)} />
          </div>
          <div
            className={classes.target}
            onMouseMove={bothHandler}
            onMouseLeave={clearHandler}
            onClick={bothClickHandler}
          >
            <div
              className={cx(
                classes.horizontalCenterHandler,
                classes.horizontal
              )}
            />
            <div
              className={cx(classes.verticalCenterHandler, classes.vertical)}
            />
          </div>
          <div className={classes.row} {...events('horizontal', 'end')}>
            <div className={cx(classes.horizontalHandler, classes.right)} />
          </div>
        </div>
        <div className={classes.outer}>
          <div className={classes.column} {...events('vertical', 'end')}>
            <div className={cx(classes.verticalHandler, classes.bottom)} />
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
