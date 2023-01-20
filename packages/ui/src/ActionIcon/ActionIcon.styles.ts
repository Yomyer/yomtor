import { INPUT_SIZES } from '@mantine/core'
import { createStyles, CSSObject, YomtorNumberSize } from '@yomtor/styles'
import { ActionIconProps } from './ActionIcon.props'

export const sizes = {
  xs: { height: INPUT_SIZES.xs, paddingLeft: 14, paddingRight: 14 },
  sm: { height: INPUT_SIZES.sm, paddingLeft: 18, paddingRight: 18 },
  md: { height: INPUT_SIZES.md, paddingLeft: 22, paddingRight: 22 },
  lg: { height: INPUT_SIZES.lg, paddingLeft: 26, paddingRight: 26 },
  xl: { height: INPUT_SIZES.xl, paddingLeft: 32, paddingRight: 32 },
  'compact-xs': { height: 22, paddingLeft: 7, paddingRight: 7 },
  'compact-sm': { height: 26, paddingLeft: 8, paddingRight: 8 },
  'compact-md': { height: 30, paddingLeft: 10, paddingRight: 10 },
  'compact-lg': { height: 34, paddingLeft: 12, paddingRight: 12 },
  'compact-xl': { height: 40, paddingLeft: 14, paddingRight: 14 }
}

interface GetSizeStyles {
  compact: boolean
  size: YomtorNumberSize
  withLeftIcon: boolean
  withRightIcon: boolean
}

function getSizeStyles({
  compact,
  size,
  withLeftIcon,
  withRightIcon
}: GetSizeStyles): CSSObject {
  if (compact) {
    return sizes[`compact-${size}`]
  }

  const _sizes = sizes[size]

  return {
    ..._sizes,
    paddingLeft: withLeftIcon ? _sizes.paddingLeft / 1.5 : _sizes.paddingLeft,
    paddingRight: withRightIcon
      ? _sizes.paddingRight / 1.5
      : _sizes.paddingRight
  }
}

export default createStyles((theme, { compact, size }: ActionIconProps) => ({
  root: {
    ...getSizeStyles({
      compact,
      size,
      withLeftIcon: false,
      withRightIcon: false
    })
  }
}))
