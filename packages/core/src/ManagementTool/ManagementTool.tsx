import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useComponentDefaultProps } from '@mantine/styles'
import { ManagementToolProps } from './ManagementTool.props'
import { useEditorContext } from '../Editor.context'
import {
  Item,
  KeyEvent,
  MouseEvent,
  Point,
  Tool,
  ToolEvent
} from '@yomtor/paper'
import { useHotkeys } from '@yomtor/hooks'
import { clearCursor, Clone, Default, setCursor } from '@yomtor/cursors'
import { clone } from 'lodash'

const defaultProps: Partial<ManagementToolProps> = {}

export const ManagementTool = (props: ManagementToolProps) => {
  const {} = useComponentDefaultProps('ManagementTool', defaultProps, props)

  const { canvas } = useEditorContext()
  const clonedItems = useRef<Record<string, Item>>({})
  const beforePositions = useRef<Record<string, Point>>({})
  const activedItems = useRef<Item[]>([])
  const mouseEvent = useRef<MouseEvent>(null)
  const clipboard = useRef<Item[]>([])

  const setBeforePositions = () => {
    activedItems.current = [...canvas.project.activeItems]
    beforePositions.current = activedItems.current.reduce((positions, item) => {
      if (!positions[item.uid]) {
        positions[item.uid] = item.position.clone()
      }

      return positions
    }, beforePositions.current)
  }

  const cloneController = (status: boolean) => {
    if (status) {
      activedItems.current.forEach((item) => {
        if (beforePositions.current[item.uid]) {
          const cloned = item.clone()
          item.highlighted = item.actived = false
          item.position = beforePositions.current[item.uid]
          cloned.actived = true
          clonedItems.current[item.uid] = cloned
        }
      })
    } else if (Object.keys(clonedItems.current).length) {
      activedItems.current.forEach((item) => {
        const clone = clonedItems.current[item.uid]
        if (clone) {
          item.actived = true
          item.position = clone.position
          clone.remove()
        }
      })
    }
  }

  const removeDuplicates = () => {
    activedItems.current.forEach((item) => {
      const clone = clonedItems.current[item.uid]
      if (clone && clone.position.equals(item.position)) {
        clone.remove()
        item.actived = true
        delete clonedItems.current[item.uid]
      }
    })
  }

  const cut = () => {
    clipboard.current = [...canvas.project.activeItems]
    canvas.project.activeItems.forEach((item) => item.remove())
  }

  const copy = () => {
    clipboard.current = [...canvas.project.activeItems]
  }

  const paste = () => {
    console.log(clipboard.current)
    clipboard.current.forEach((item) => {
      item.clone()
      // item.highlighted = item.actived = false
    })
    // clipboard.current = clone(canvas.project.activeItems)
  }

  useEffect(() => {
    if (!canvas) return

    canvas.view.on('mousemove', (e: MouseEvent) => {
      if (e.target.layer) {
        mouseEvent.current = e
        if (e.modifiers.alt) {
          setCursor(Default, 0, Clone)
        }
      } else {
        mouseEvent.current = null
        clearCursor(Default, 0, Clone)
      }
    })

    canvas.project.on('selection:pressed', (e: MouseEvent) => {
      setBeforePositions()
      if (e.modifiers.alt) {
        cloneController(true)
      }
    })

    canvas.view.on('mouseup', (e: MouseEvent) => {
      beforePositions.current = {}
      if (e.modifiers.alt) {
        removeDuplicates()
        clonedItems.current = {}
        cloneController(true)

        canvas.project.fire(['selection:updated', 'object:created'], {
          items: canvas.project.activeItems
        })
      }
    })

    canvas.view.on('keydown', (e: KeyEvent) => {
      if (['delete', 'backspace'].includes(e.key)) {
        let items = [...canvas.project.activeItems]

        items.forEach((item) => item.remove())
        canvas.project.fire('selection:cleared', { items })

        canvas.project.fire('object:deleted', {
          items: items.map((item) => {
            item.data.deleted = true
            return item
          })
        })

        items = null
      }
    })
  }, [canvas])

  useHotkeys(
    {
      keys: '*+alt',
      down: () => {
        setCursor(Default, 0, Clone)
        cloneController(true)
      },
      up: () => {
        clearCursor(Default, 0, Clone)
        cloneController(false)
      }
    },
    [canvas]
  )

  useHotkeys(
    {
      keys: 'cmd+c',
      down: () => {
        if (canvas.mainTool.actived) {
          copy()
        }
      }
    },
    [canvas]
  )

  useHotkeys(
    {
      keys: 'cmd+x',
      down: () => {
        if (canvas.mainTool.actived) {
          cut()
        }
      }
    },
    [canvas]
  )

  useHotkeys(
    {
      keys: 'cmd+v',
      down: () => {
        if (canvas.mainTool.actived) {
          paste()
        }
      }
    },
    [canvas]
  )

  return <></>
}

ManagementTool.displayName = '@yomtor/core/ManagementTool'