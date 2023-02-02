import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useComponentDefaultProps } from '@mantine/styles'
import { CloneToolProps } from './CloneTool.props'
import { useEditorContext } from '../Editor.context'
import { Item, MouseEvent, Point, Tool, ToolEvent } from '@yomtor/paper'
import { useHotkeys } from '@yomtor/hooks'
import { clearCursor, Clone, Default, setCursor } from '@yomtor/cursors'

const defaultProps: Partial<CloneToolProps> = {}

export const CloneTool = (props: CloneToolProps) => {
  const {} = useComponentDefaultProps('CloneTool', defaultProps, props)

  const { canvas } = useEditorContext()
  const [tool, setTool] = useState<Tool>()
  const clonedItems = useRef<Record<string, Item>>({})
  const beforePositions = useRef<Record<string, Point>>({})
  const activedItems = useRef<Item[]>([])
  const mouseEvent = useRef<MouseEvent>(null)

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
          cloned.fillColor = 'blue'
          cloned.actived = true
          clonedItems.current[item.uid] = cloned

          console.log('meclono')
        }
      })
    } else {
      activedItems.current.forEach((item) => {
        item.actived = true

        const clone = clonedItems.current[item.uid]
        if (clone) {
          item.position = clone.position
          clone.remove()
        }

        console.log('me borro y me dejo tal cual xD')
      })
      /*
      clonedItems.current.forEach((item) => {
        item.remove()
      })*/
    }

    /*
    if (mode.current === 'clone') {
      canvas.project.clearHighlightedItem()

      if (!clonedItems.current.length) {
        clonedItems.current = canvas.project.activeItems.map((item) => {
          const cloned = item.clone()
          beforePositions.current[cloned.uid] =
            beforePositions.current[item.uid]
          return cloned
        })

        canvas.project.deactivateAll()
        clonedItems.current.forEach((item) => item.set({ actived: true }))

        if (Object.keys(beforePositions.current).length) {
          activedItems.current.forEach(
            (item) => (item.position = beforePositions.current[item.uid])
          )

          canvas.fire('object:created', {
            items: activedItems.current
          })
        }
      }
    } else {
      if (clonedItems.current.length) {
        canvas.project.deactivateAll()

        clonedItems.current.map((item, index) => {
          if (activedItems.current.length) {
            activedItems.current[index].actived = true
            activedItems.current[index].position = item.position
          }

          item.remove()
        })
        clonedItems.current = []

        canvas.fire('object:deleted', {
          items: activedItems.current
        })
      }
    }
    */
  }

  useEffect(() => {
    if (!canvas) return

    canvas.view.on('mousemove', (e: MouseEvent) => {
      if (e.target.layer) {
        mouseEvent.current = e
        if (e.modifiers.alt) {
        }
      } else {
        mouseEvent.current = null
      }
    })

    canvas.on('selection:pressed', (e: MouseEvent) => {
      setBeforePositions()
      if (e.modifiers.alt) {
        cloneController(true)
      }
    })

    canvas.view.on('mouseup', (e: MouseEvent) => {
      beforePositions.current = {}
      if (e.modifiers.alt) {
        clonedItems.current = {}
        cloneController(true)
      }
    })
  }, [canvas])

  /*
  useEffect(() => {
    if (!tool) return

   
    tool.onActivate = () => {
      setCursor(Default, 0, Clone)
      cloneController()
    }

    tool.onDeactivate = () => {
      clearCursor(Default, 0, Clone)
      // beforePositions.current = {}
      cloneController()
    }

    tool.onMouseDrag = (e: ToolEvent) => {
      if (!e.downPoint || !e.point) {
        return
      }

      console.log('drag?')

      cloneController()
    }
 
  }, [tool])
     */

  useHotkeys(
    {
      keys: '*+alt',
      down: () => {
        if (mouseEvent.current) {
          setCursor(Default, 0, Clone)
          cloneController(true)
          //tool.activate()
        }
      },
      up: () => {
        clearCursor(Default, 0, Clone)
        cloneController(false)
        //tool.activeMain()
      }
    },
    [canvas]
  )

  useHotkeys(
    {
      keys: 'cmd+c',
      down: () => {
        console.log('copy')
      }
    },
    [canvas]
  )

  return <></>
}

CloneTool.displayName = '@yomtor/core/CloneTool'
