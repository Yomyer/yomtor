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
import { useEventListener } from '../../../hooks/src/use-event-listener/use-event-listener'

const defaultProps: Partial<ManagementToolProps> = {}

export const ManagementTool = (props: ManagementToolProps) => {
  const {} = useComponentDefaultProps('ManagementTool', defaultProps, props)

  const { canvas } = useEditorContext()
  const clonedItems = useRef<Record<string, Item>>({})
  const beforePositions = useRef<Record<string, Point>>({})
  const activedItems = useRef<Item[]>([])
  const mouseEvent = useRef<MouseEvent>(null)
  const clipboard = useRef<Item[]>([])
  const clonable = useRef<boolean>(false)
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
          item.position = beforePositions.current[item.uid].clone()
          cloned.actived = true
          clonedItems.current[item.uid] = cloned
        }
      })
    } else if (Object.keys(clonedItems.current).length) {
      activedItems.current.forEach((item) => {
        const clone = clonedItems.current[item.uid]
        if (clone) {
          item.actived = true
          item.position = clone.position.clone()
          item.resetPosition = true
          clone.remove()
        }
      })

      clonedItems.current = {}
      beforePositions.current = {}
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

  const paste = async (event: ClipboardEvent) => {
    const items = Array.from(event.clipboardData.items)
    const itemsPated = []

    const promises = items.map((item) => {
      return new Promise((resolve) => {
        const type = item.type

        if (type === 'text/plain') {
          item.getAsString((text) => {
            console.log(text)
            itemsPated.push(
              canvas.project.importSVG(text, { expandShapes: true })
            )
            resolve(true)
          })
        } else {
          resolve(true)
        }
      })
    })

    await Promise.all(promises)

    canvas.project.deactivateAll()
    itemsPated.forEach((item) => (item.actived = true))

    /*
    canvas.project.deactivateAll()
    clipboard.current.forEach((item) => {
      console.log(activedItems.current)
      // item.insertChild()
      // cloned.actived = true
    })
    canvas.project.clearHighlightedItem()
    */
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
      if (event.modifiers.alt) {
        setBeforePositions()
        cloneController(true)
      }
    })

    canvas.view.on('mouseup', (event: MouseEvent) => {
      beforePositions.current = {}
      clonedItems.current = {}

      if (event.modifiers.alt) {
        removeDuplicates()
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

  useEventListener(
    'paste',
    (e: ClipboardEvent) => {
      paste(e)
    },
    document
  )

  /*
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
  */

  return <></>
}

ManagementTool.displayName = '@yomtor/core/ManagementTool'
