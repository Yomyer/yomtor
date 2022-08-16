import { MouseEventHandler } from 'react'

export type SvgIconProps = {
    children?: React.ReactNode
    rotate?: number
    viewport?: string
    hidden?: boolean
    onClick?: MouseEventHandler<SVGSVGElement>
}
