import React, { useCallback, useEffect, useRef, useState } from 'react'
import { GroupToolProps } from './GroupTool.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '../Editor.context'
import { Tool, Group, ToolEvent, Rectangle, Item } from '@yomtor/paper'
import { first, orderBy } from 'lodash'
import { useHotkeys } from '@yomtor/hooks'

const defaultProps: Partial<GroupToolProps> = {}

export const GroupTool = (props: GroupToolProps) => {
  const {} = useComponentDefaultProps('GroupTool', defaultProps, props)
  const [tool, setTool] = useState<Tool>()
  const { canvas } = useEditorContext()

  const group = useCallback(() => {
    const activeItems = orderBy(canvas.project.activeItems, 'index')
    if (activeItems.length) {
      const group = new Group({ name: 'Group' })

      group.insertBelow(activeItems[0])
      group.insertChildren(0, activeItems)

      tool.activeMain()
      canvas.project.deactivateAll()
      group.actived = true

      canvas.project.emit(['selection:updated', 'object:created'], {
        items: canvas.project.activeItems
      })
    }
  }, [tool])

  const ungroup = useCallback(() => {
    const activeItems = canvas.project.activeItems.slice()

    activeItems.forEach((item) => {
      if (item.className === 'Group') {
        item.children.slice().forEach((child) => {
          child.insertBelow(item)
          child.actived = true
        })

        item.remove()
      }
    })

    canvas.project.emit(['selection:updated', 'object:deleted'], {
      items: canvas.project.activeItems
    })
  }, [tool])

  useEffect(() => {
    if (!canvas) return

    setTool(canvas.createTool('GroupTool', false, ['SelectorTool']))

    canvas.project.on('enter', (e: ToolEvent) => {
      if (e.item instanceof Group) {
        const rect = new Rectangle(e.point)
        const items = orderBy(
          e.item.getItems({
            overlapping: rect,
            recursive: false,
            match: (item: Item) => {
              if (item.className === 'Group') {
                const children = item.getItems({
                  class: canvas.Item,
                  overlapping: rect
                })
                return !!children.length
              }

              return true
            }
          }),
          ['index'],
          ['desc']
        )

        if (items.length) {
          canvas.project.deactivateAll()
          first(items).actived = true

          canvas.project.emit('selection:updated', { items: [first(items)] })
        }
      }
    })
  }, [canvas])

  useHotkeys({ keys: 'cmd+g', down: group }, [tool])
  useHotkeys({ keys: 'cmd+shift+g', down: ungroup }, [tool])

  return <></>
}

GroupTool.displayName = '@yomtor/core/GroupTool'
