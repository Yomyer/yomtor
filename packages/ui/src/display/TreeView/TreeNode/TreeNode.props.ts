import { DefaultProps } from '@yomtor/styles'

export type TreeNodeData<T = object> = T & {
    node?: TreeNodeData
    label?: string
    collapsed?: boolean
}

export type TreeNodeProps = DefaultProps & TreeNodeData
