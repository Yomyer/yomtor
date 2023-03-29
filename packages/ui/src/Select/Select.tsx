import React, { forwardRef, useEffect, useRef } from 'react'
import { useComponentDefaultProps, getSize } from '@yomtor/styles'

import { Select as BaseSelect } from '@mantine/core'
import { SelectProps } from './Select.props'
import useStyles from './Select.styles'
import { useMergedRef, useResizeObserver } from '@yomtor/hooks'
import { SelectItem } from './SelectItem/SelectItem'
import { SelectScrollArea } from './SelectScrollArea/SelectScrollArea'
import { ArrowIcon } from '@yomtor/icons'

const arrowSizes = {
  xs: 10,
  sm: 11,
  md: 12,
  lg: 15,
  xl: 18
}

const defaultProps: Partial<SelectProps> = {
  size: 'md',
  radius: 'xs',
  compact: true,
  ticked: true,
  variant: 'toggle',
  itemComponent: undefined,
  dropdownComponent: SelectScrollArea
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (props, ref) => {
    const { unstyled, onChange, ticked, size, compact, className, ...others } =
      useComponentDefaultProps('Select', defaultProps, props)

    const select = useRef<HTMLElement>()

    const { classes, cx } = useStyles(
      { compact, ticked, size, ...others },
      { name: 'Select', unstyled }
    )

    if (ticked) {
      others.itemComponent = SelectItem
      others['data-ticked'] = true
    }

    const changeHandler = (value) => {
      onChange && onChange(value)

      if (ticked) {
        const resizeObserver = new ResizeObserver(() => {
          select.current.blur()
          resizeObserver.disconnect()
        })
        resizeObserver.observe(select.current)
      }
    }

    return (
      <BaseSelect
        {...others}
        ref={useMergedRef(ref, select)}
        className={className}
        classNames={classes}
        rightSection={<ArrowIcon size={getSize({ sizes: arrowSizes, size })} />}
        onChange={changeHandler}
      />
    )
  }
)

Select.displayName = '@yomtor/ui/Select'
