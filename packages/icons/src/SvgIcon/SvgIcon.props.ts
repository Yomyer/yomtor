import { MouseEventHandler } from 'react'

export type SvgIconProps = {
    children?: React.ReactNode
    rotate?: number
    viewbox?: string
    hidden?: boolean
    onClick?: MouseEventHandler<SVGSVGElement>
}
