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
import { Clone, Default, useCursor } from '@yomtor/cursors'
import { get } from 'lodash'

const defaultProps: Partial<ManagementToolProps> = {}

export const ManagementTool = (props: ManagementToolProps) => {
  const {} = useComponentDefaultProps('ManagementTool', defaultProps, props)

  const { canvas } = useEditorContext()
  const clonedItems = useRef<Record<string, Item>>({})
  const beforePositions = useRef<Record<string, Point>>({})
  const activedItems = useRef<Item[]>([])
  const mouseEvent = useRef<MouseEvent>(null)
  const clipboard = useRef<Item[]>([])
  const { showCursor, hideCursor } = useCursor()

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
    clipboard.current = canvas.project.activeItems.map((item) =>
      item.clone({ insert: false })
    )
  }

  const paste = () => {
    canvas.project.deactivateAll()
    clipboard.current.forEach((item) => {
      console.log(activedItems.current)
      // item.insertChild()
      // cloned.actived = true
    })
    canvas.project.clearHighlightedItem()
  }

  useEffect(() => {
    if (!canvas) return

    canvas.view.on('mousemove', (event: MouseEvent) => {
      if (event.target.layer) {
        mouseEvent.current = event
        if (event.modifiers.alt) {
          showCursor([Default, Clone])
        }
      } else {
        mouseEvent.current = null
        hideCursor([Default, Clone])
      }
    })

    canvas.project.on('selection:pressed', (event: MouseEvent) => {
      setBeforePositions()
      if (event.modifiers.alt) {
        cloneController(true)
      }
    })

    canvas.view.on('mouseup', (event: MouseEvent) => {
      beforePositions.current = {}
      if (event.modifiers.alt) {
        removeDuplicates()
        clonedItems.current = {}
        cloneController(true)

        canvas.project.emit(['selection:updated', 'object:created'], {
          items: canvas.project.activeItems
        })
      }
    })

    canvas.view.on('keydown', (event: KeyEvent) => {
      if (
        ['delete', 'backspace'].includes(event.key) &&
        get(event, 'event.target.tagName') !== 'INPUT'
      ) {
        let items = [...canvas.project.activeItems]

        items.forEach((item) => item.remove())
        canvas.project.emit('selection:cleared', { items })

        canvas.project.emit('object:deleted', {
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
        showCursor([Default, Clone])
        cloneController(true)
      },
      up: () => {
        hideCursor([Default, Clone])
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
