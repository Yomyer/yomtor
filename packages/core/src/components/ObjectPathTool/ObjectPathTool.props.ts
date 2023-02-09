import { Cursor } from '@yomtor/cursors'
import { Item, PaperScope, Path, Tool, ToolEvent } from '@yomtor/paper'
import { YomtorTheme } from '@yomtor/styles'
import { MutableRefObject, ReactNode } from 'react'

export type ObjectPathTypes =
  | 'rectangle'
  | 'line'
  | 'circle'
  | 'oval'
  | 'arc'
  | 'star'
  | 'polygon'

export type ObjectpathEvent = {
  event: ToolEvent
  canvas: PaperScope
  theme: YomtorTheme
  type: ObjectPathTypes
  dragging: boolean
}

export interface ObjectPathToolProps {
  onInserMode?: (status: boolean) => void
  hotKey?: string
  name?: string
  cursor?: Cursor
  type?: ObjectPathTypes
  toolRef?: MutableRefObject<Tool>
  children?: ReactNode
}
