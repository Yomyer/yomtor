import { DefaultProps } from '@yomtor/styles'

export type TreeNodeData<T = { [key: string]: unknown }> = T & {
    [key: string]: unknown
} & {
    node?: TreeNodeData
    label?: string
    collapsed?: boolean
    children?: TreeNodeData[]
}

export type TreeNodeProps = DefaultProps & TreeNodeData
