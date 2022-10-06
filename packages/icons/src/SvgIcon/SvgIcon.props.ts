import { YomtorNumberSize } from '@yomtor/styles'
import { CSSProperties, MouseEventHandler } from 'react'

export type SvgIconProps = {
  children?: React.ReactNode
  rotate?: number
  viewbox?: string
  hidden?: boolean
  onClick?: MouseEventHandler<SVGSVGElement>
  size?: YomtorNumberSize
  style?: CSSProperties
}
