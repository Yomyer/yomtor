/* eslint-disable react/no-unused-prop-types */
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement
} from 'react'
import { useComponentDefaultProps } from '@mantine/styles'
import { Box } from '../../Box'
import useStyles from './ActionIconGroup.styles'
import { ActionIconGroupProps } from './ActionIconGroup.props'
import { ActionIcon } from '@yomtor/ui'

const defaultProps: Partial<ActionIconGroupProps> = {
  orientation: 'horizontal',
  buttonBorderWidth: 1,
  compact: true
}

export const ActionIconGroup = forwardRef<HTMLDivElement, ActionIconGroupProps>(
  (props, ref) => {
    const {
      className,
      children,
      orientation,
      compact,
      variant,
      buttonBorderWidth,
      unstyled,
      ...others
    } = useComponentDefaultProps('ButtonGroup', defaultProps, props)
    const { classes, cx } = useStyles(
      { orientation, buttonBorderWidth },
      { name: 'ButtonGroup', unstyled }
    )
    return (
      <Box className={cx(classes.root, className)} ref={ref} {...others}>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, { compact, variant })
          }

          return child
        })}
      </Box>
    )
  }
)

ActionIconGroup.displayName = '@yomtor/ui/ActionIconGroup'
