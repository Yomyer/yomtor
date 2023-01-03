import { VirtualItem } from '@yomtor/hooks'
import { DefaultProps, Selectors, YomtorStyleSystemSize } from '@yomtor/styles'
import useStyles from './Node.styles'
type NodeStylesNames = Selectors<typeof useStyles>

export type NodeData<T = { [key: string]: unknown }> = T & {
  [key: string]: unknown
} & {
  label?: string
  collapsed?: boolean
  children?: NodeData[]
}

export interface NodeProps
  extends Omit<DefaultProps<NodeStylesNames>, YomtorStyleSystemSize> {
  depth: number
}
