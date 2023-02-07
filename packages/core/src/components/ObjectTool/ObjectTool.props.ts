import { Cursor } from '@yomtor/cursors'
import { Item, PaperScope, Tool, ToolEvent } from '@yomtor/paper'
import { YomtorTheme } from '@yomtor/styles'
import { MutableRefObject, ReactNode } from 'react'

export type CreateEvent = {
  event: ToolEvent
  canvas: PaperScope
  theme: YomtorTheme
}

export interface ObjectToolProps {
  onInserMode?: (status: boolean) => void
  hotKey?: string
  name?: string
  cursor?: Cursor
  onPhantom: (event: CreateEvent) => Item
  onObject: (event: CreateEvent) => Item
  toolRef?: MutableRefObject<Tool>
  children?: ReactNode
}
