import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useState
} from 'react'
import { useComponentDefaultProps } from '@mantine/styles'
import { Box } from '../Box'
import useStyles from './GroupInput.styles'
import { GroupInputProps } from './GroupInput.props'
import { isArray } from 'lodash'

const defaultProps: Partial<GroupInputProps> = {
  orientation: 'horizontal',
  buttonBorderWidth: 1,
  compact: true,
  variant: 'toggle'
}

export const GroupInput = forwardRef<HTMLDivElement, GroupInputProps>(
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
    const [focus, setFoucs] = useState<boolean>(false)
    const { classes, cx } = useStyles(
      { orientation, buttonBorderWidth, variant, focus },
      { name: 'ButtonGroup', unstyled }
    )

    const focusHandler = (event) => {
      if (['INPUT'].includes(event.target.nodeName)) {
        setFoucs(true)
      }
    }

    const blurHandler = () => {
      setFoucs(false)
    }

    return (
      <Box className={cx(classes.root, className)} ref={ref} {...others}>
        {Children.map(children, (child, index: number) => {
          if (isArray(children) && isValidElement(child)) {
            const className = cx(classes.input, {
              [classes.first]: !index,
              [classes.last]: index === children.length - 1,
              [classes.center]: index && index !== children.length - 1
            })

            return cloneElement<any>(child, {
              compact,
              variant,
              className: className,
              classNames: {
                input: className
              },
              onFocus: focusHandler,
              onBlur: blurHandler
            })
          }

          return child
        })}
      </Box>
    )
  }
)

GroupInput.displayName = '@yomtor/ui/GroupInput'
