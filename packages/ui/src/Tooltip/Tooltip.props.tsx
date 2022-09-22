import { TooltipProps as BaseTooltipProps } from '@mantine/core'
import { YomtorColor } from '@yomtor/styles'

export interface TooltipProps extends BaseTooltipProps {
  color?: YomtorColor
}
