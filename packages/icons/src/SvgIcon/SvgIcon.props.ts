import { YomtorNumberSize, DefaultProps } from '@yomtor/styles'
import { CSSProperties, MouseEventHandler } from 'react'

export interface SvgIconProps extends DefaultProps {
  children?: React.ReactNode
  rotate?: number
  viewbox?: string
  hidden?: boolean
  onClick?: MouseEventHandler<SVGSVGElement>
  size?: YomtorNumberSize
  style?: CSSProperties
}
