import { createStyles } from '@yomtor/styles'
import { InputProps } from './Input.props'

const sizes = {
  'compact-xs': { height: 22, paddingLeft: 7, paddingRight: 7 },
  'compact-sm': { height: 26, paddingLeft: 8, paddingRight: 8 },
  'compact-md': { height: 30, paddingLeft: 10, paddingRight: 10 },
  'compact-lg': { height: 34, paddingLeft: 12, paddingRight: 12 },
  'compact-xl': { height: 40, paddingLeft: 14, paddingRight: 14 }
}

export default createStyles(
  (theme, { size, variant, compact }: InputProps) => ({
    input: {
      ...theme.fn.getVariant({ variant, withFocus: true }),
      ...(compact
        ? { ...sizes[`compact-${size}`], minHeight: 'unset' }
        : undefined)
    }
  })
)
