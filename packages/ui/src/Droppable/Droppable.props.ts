import React from 'react'
import { DefaultProps } from '@yomtor/styles'
import { FileRejection, Accept } from 'react-dropzone'

export type DropzoneStatus = {
  accepted: boolean
  rejected: boolean
  overed: boolean
  dragged: boolean
}

export type DropEvent<D = { [key: string]: unknown }> = {
  type: string
  fileRejections?: FileRejection[]
  props: D
  files?: File[]
  defaultEvent?: Event
  target?: HTMLElement
}

export type DroppableStatus = {
  accepted: boolean
  rejected: boolean
  overed: boolean
  dragged: boolean
}
export type DroppableProps = DefaultProps & {
  onDrop?: (data: DropEvent) => void | false
  onEnter?: (event: DropEvent) => void | false
  onMove?: (event: DropEvent) => void | false
  onLeave?: (event: DropEvent) => void | false
  onReject?(fileRejections: FileRejection[]): void
  children?: React.ReactNode | ((args?: DroppableStatus) => React.ReactNode)
  accept?: Accept | { [key: string]: (event: DropEvent) => boolean }
  multiple?: boolean
  maxSize?: number
  disabled?: boolean
  loading?: boolean
  click?: boolean
  external?: boolean
}
