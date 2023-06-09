import { createStyles, getSize, rem } from '@yomtor/styles'
import { CheckboxProps } from './Checkbox.props'

const sizes = {
  xs: rem(12),
  sm: rem(18),
  md: rem(24),
  lg: rem(30),
  xl: rem(36)
}

export default createStyles((theme, { size }: CheckboxProps) => {
  const _size = getSize({ size, sizes })
  return {
    root: {},
    inner: {
      width: _size,
      height: _size
    },
    input: {
      width: _size,
      height: _size,
      '&:focus': {
        outlineOffset: -1,
        outlineWidth: 1
      }
    },
    label: {
      lineHeight: _size
    }
  }
})
