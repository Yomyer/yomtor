import React, { forwardRef, useEffect, useRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Select as BaseSelect } from '@mantine/core'
import { SelectProps } from './Select.props'
import useStyles from './Select.styles'
import { useMergedRef } from '@yomtor/hooks'
import { SelectItem } from './SelectItem/SelectItem'

const defaultProps: Partial<SelectProps> = {
  size: 'md',
  radius: 'xs',
  compact: true,
  ticked: true,
  variant: 'toggle',
  initiallyOpened: true,
  itemComponent: undefined
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (props, ref) => {
    const { unstyled, ticked, compact, className, ...others } =
      useComponentDefaultProps('Select', defaultProps, props)

    const select = useRef<HTMLElement>()

    const { classes, cx } = useStyles(
      { compact, ticked, ...others },
      { name: 'Select', unstyled }
    )

    if (ticked) {
      others.itemComponent = SelectItem
    }

    return (
      <BaseSelect
        {...others}
        ref={useMergedRef(ref, select)}
        className={className}
        classNames={classes}
        transitionProps={{
          transition: 'fade',
          duration: 80,
          timingFunction: 'ease'
        }}
      />
    )
  }
)

Select.displayName = '@yomtor/ui/Select'
