import React, {
  forwardRef,
  KeyboardEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import { useComponentDefaultProps, getSize } from '@yomtor/styles'

import { Select as BaseSelect } from '@mantine/core'
import { SelectProps } from './Select.props'
import useStyles from './Select.styles'
import {
  useEventListener,
  useMergedRef,
  useResizeObserver
} from '@yomtor/hooks'
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
  dropdownComponent: SelectScrollArea,
  switchDirectionOnFlip: true
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (props, ref) => {
    const {
      unstyled,
      onChange,
      ticked,
      inherit,
      size,
      compact,
      className,
      ...others
    } = useComponentDefaultProps('Select', defaultProps, props)

    const select = useRef<HTMLElement>()
    const [disableDropdown, setDisableDropdown] = useState(false)

    const { classes, cx } = useStyles(
      { compact, ticked, disableDropdown, inherit, size, ...others },
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

    const keydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
        setDisableDropdown(true)
      }
    }

    useEventListener(
      'mousemove',
      () => {
        if (disableDropdown) {
          setDisableDropdown(false)
        }
      },
      document
    )

    return (
      <>
        <BaseSelect
          {...others}
          ref={useMergedRef(ref, select)}
          className={className}
          classNames={classes}
          rightSection={
            <ArrowIcon size={getSize({ sizes: arrowSizes, size })} />
          }
          onChange={changeHandler}
          onKeyDown={keydownHandler}
        />
      </>
    )
  }
)

Select.displayName = '@yomtor/ui/Select'
