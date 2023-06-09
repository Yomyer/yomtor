import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useComponentDefaultProps } from '@mantine/styles'
import { SelectorToolProps } from './SelectorTool.props'
import { useEditorContext } from '../Editor.context'
import {
  Artboard,
  Control,
  Group,
  Item,
  KeyEvent,
  Path,
  Point,
  Rectangle,
  Tool,
  ToolEvent
} from '@yomtor/paper'
import {
  differenceWith,
  find,
  intersectionWith,
  isEqual,
  isInteger
} from 'lodash'
import { useYomtorTheme } from '@yomtor/styles'
import { HotKeysEvent, useHotkeys } from '@yomtor/hooks'
import { round } from '@yomtor/utils'

const defaultProps: Partial<SelectorToolProps> = {
  move: true,
  clone: true
}

export const SelectorTool = (props: SelectorToolProps) => {
  const { move: isMove } = useComponentDefaultProps(
    'SelectorTool',
    defaultProps,
    props
  )

  const { canvas } = useEditorContext()
  const theme = useYomtorTheme()
  const [tool, setTool] = useState<Tool>()
  const selector = useRef<Group>(null)
  const mode = useRef<string>('none')
  const activedItems = useRef<Item[]>([])
  const selectRect = useRef<Path>(null)
  const moved = useRef<boolean>(false)
  const selectItems = useRef<Item[]>(null)
  const positions = useRef<Record<string, Point>>({})
  const outside = useRef<boolean>(true)

  const lastPoint = useRef<Point>(null)

  const compareToItemList = (a: Item[], b: Item[]): boolean => {
    return isEqual(
      (a || []).map((item) => item.uid).sort(),
      (b || []).map((item) => item.uid).sort()
    )
  }

  const isActiveItemsUpdated = (): boolean => {
    return compareToItemList(activedItems.current, canvas.project.activeItems)
  }

  const updateAtiveItems = () => {
    activedItems.current = [...canvas.project.activeItems]
  }

  const hightlightController = (e?: ToolEvent) => {
    if (selectRect.current) return
    if (!e) return

    const item = canvas.project.getItemByPoint(e.point, {
      legacy: e.modifiers.meta
    })

    if (item) {
      item.highlighted = true
      canvas.project.emit('hightlight:created')
    } else {
      canvas.project.highlightedItem &&
        (canvas.project.highlightedItem.highlighted = false)
      canvas.project.emit('hightlight:cleared')
    }
  }

  const rectSelectorController = (e: KeyEvent | ToolEvent) => {
    if (e instanceof canvas.ToolEvent) {
      selectRect.current && selectRect.current.remove()
      selectRect.current = new canvas.Path.Rectangle({
        from: e.downPoint,
        to: e.point,
        strokeColor: theme.colors.primary[5],
        fillColor: theme.fn.rgba(theme.colors.primary[5], 0.2),
        strokeWidth: 1 / canvas.view.zoom,
        guide: true
      })

      selectRect.current.removeOn({
        up: true,
        drag: true,
        move: true
      })
    }

    if (selectRect.current) {
      const itemMatch = {
        class: canvas.Item,
        inside: e.modifiers.alt && selectRect.current.bounds,
        overlapping: !e.modifiers.alt && selectRect.current.bounds,
        match: (item: Item) => {
          if (item.artboard && item.artboard.actived) {
            return false
          }

          if (item.className === 'Group') {
            const children = item.getItems({
              class: canvas.Item,
              overlapping: selectRect.current.bounds
            })
            return !!children.length
          }

          if (item.parent && item.parent.className === 'Group') {
            return false
          }

          return !item.guide && !(item instanceof Artboard)
        }
      }
      const artboardMatch = {
        class: canvas.Artboard,
        inside: selectRect.current.bounds
      }

      if (selectRect.current.layer) {
        const items = canvas.project.activeLayer
          .getItems(artboardMatch)
          .concat(canvas.project.activeLayer.getItems(itemMatch))

        // canvas.project.deactivateAll()

        const deactives = e.modifiers.shift
          ? intersectionWith(
              items,
              activedItems.current,
              (a: Item, b: Item) => a.uid === b.uid
            )
          : []

        const actives = e.modifiers.shift
          ? differenceWith(
              activedItems.current.concat(items),
              deactives,
              (a: Item, b: Item) => a.uid === b.uid
            )
          : activedItems.current.concat(items)

        if (!compareToItemList(actives, canvas.project.activeItems)) {
          actives.forEach((item) => (item.actived = true))
          deactives.forEach((item) => (item.actived = false))
        }

        canvas.project.activeItems.forEach((item) => {
          if (!actives.find((find) => item.uid === find.uid)) {
            item.actived = false
          }
        })

        if (e.modifiers.shift && selectItems.current === null) {
          selectItems.current = [...canvas.project.activeItems]
        }

        if (
          !compareToItemList(selectItems.current, canvas.project.activeItems)
        ) {
          let action = 'updated'

          if (!canvas.project.activeItems.length) {
            action = 'cleared'
          }

          if (!(selectItems.current || []).length && !deactives.length) {
            action = 'created'
          }

          canvas.project.emit(`selection:${action}`, {
            ...{ items: actives }
          })
        }
        selectItems.current = [...canvas.project.activeItems]
      }
    }
  }

  const move = useCallback(
    (e: ToolEvent | HotKeysEvent) => {
      if (!isMove) return

      canvas.project.activeItems.forEach((item) => {
        let delta = e.delta

        if (e instanceof ToolEvent) {
          delta = e.point.subtract(lastPoint.current)
        }

        if (!positions.current[item.uid])
          positions.current[item.uid] = item.position

        positions.current[item.uid] = positions.current[item.uid].add(delta)

        item.boundPosition = round(positions.current[item.uid])
      })

      if (e instanceof ToolEvent) {
        const artboard = canvas.project.hitTestArtboard(e.point, {
          match: (hit) => {
            return !hit?.item?.actived
          }
        })

        canvas.project.activeItems.forEach((item) => {
          if (
            (artboard && !item.artboard) ||
            (artboard && artboard.item !== item.artboard)
          ) {
            artboard.item.insertChild(artboard.item.children.length + 1, item)
            item.actived = true
          } else if (
            !artboard &&
            item.artboard &&
            (!outside.current || !item.intersects(item.artboard))
          ) {
            item.artboard.parent.insertChild(
              item.artboard.parent.children.length + 1,
              item
            )
            item.actived = true
          }
        })
      }

      if (mode.current === 'move') {
        canvas.project.emit('object:moving', e)
        moved.current = true
      }
    },
    [canvas, isMove]
  )

  const arrowMove = useCallback(
    (e: HotKeysEvent) => {
      if (
        tool &&
        tool.mainActived &&
        canvas.project.activeItems.length &&
        !e.isPressed('cmd')
      ) {
        mode.current = 'move'

        e.delta = e.delta.multiply((e.isPressed('shift') && 10) || 1)
        move(e)

        mode.current = 'none'
      }
    },
    [tool, isMove]
  )

  const enter = useCallback(() => {
    if (tool.actived) {
      let children = []

      canvas.project.activeItems
        .filter((item) => item.children)
        .forEach((item) => {
          children = children.concat(item.children)
        })

      if (children.length) {
        canvas.project.deactivateAll()

        children.splice(0).forEach((item) => {
          item.actived = true
        })
      } else if (canvas.project.activeItems.length === 1) {
        canvas.project.emit('enter', { item: canvas.project.activeItems[0] })
      }
    }
  }, [tool])

  useEffect(() => {
    if (!canvas) return
    setTool(canvas.createTool('SelectorTool', true))
  }, [canvas])

  useEffect(() => {
    if (!tool) return

    let beforeMode = 'mode'

    canvas.project.on('exit', (e: ToolEvent) => {
      if (tool.actived) {
        const parents = []
        canvas.project.activeItems.forEach((item) => {
          parents.push(item.parent)
        })

        canvas.project.deactivateAll()

        parents.forEach((item) => {
          item.actived = true
        })
      }
    })

    tool.onActivate = () => {
      if (!isActiveItemsUpdated()) {
        canvas.project.emit('selection:created', {
          ...{ items: canvas.project.activeItems }
        })
        updateAtiveItems()
      }
      mode.current = ['move'].includes(beforeMode) ? beforeMode : 'none'

      tool.paused = false
    }

    tool.onDeactivate = () => {
      beforeMode = mode.current
      mode.current = 'none'
    }

    tool.onDoubleClick = (e: ToolEvent) => {
      if (e.item) {
        e.item = canvas.project.getItem({
          overlapping: new Rectangle(e.point),
          actived: true
        })

        if (e.item) {
          canvas.project.emit('enter', e)
        }
      }
    }

    tool.onMouseDown = (e: ToolEvent, force?: boolean) => {
      if (!tool.actived && !force) return
      let action = null
      mode.current = 'select'

      canvas.project.clearHighlightedItem()

      // Todo aquí verificamos si hace click en un control :D
      if (selector.current) {
        action = selector.current.hitTest(e.downPoint, {
          stroke: false,
          fill: true
        })
        mode.current = 'action'
      }

      if (!action) {
        const item = canvas.project.getItemByPoint(e.downPoint, {
          legacy: e.modifiers.meta
        })

        const updated = canvas.project.activeItems.length
          ? 'updated'
          : 'created'

        if (!e.modifiers.shift && (force || !item || (item && !item.actived))) {
          canvas.project.deactivateAll()
        }

        if (item) {
          tool.paused = true

          if (!item.actived) {
            item.actived = true
          } else if (e.modifiers.shift) {
            item.actived = false
          }

          mode.current = 'move'

          if (!isActiveItemsUpdated()) {
            canvas.project.emit(`selection:${updated}`, e)
          }

          updateAtiveItems()

          canvas.project.emit(`selection:pressed`, e)
        } else if (activedItems.current.length && !e.modifiers.shift) {
          canvas.project.emit(`selection:cleared`, e)
          activedItems.current = []
        }

        if (!item) {
          mode.current = 'select'
        }

        lastPoint.current = e.point

        const artboard = canvas.project.hitTestArtboard(e.point)
        outside.current = artboard
          ? !artboard.item.bounds.contains(e.downPoint)
          : true
      }
    }

    tool.onMouseDrag = (e: ToolEvent) => {
      if (!e.downPoint || !e.point) {
        return
      }

      const distance = Math.hypot(
        e.downPoint.x - e.point.x,
        e.downPoint.y - e.point.y
      )

      if (distance < 2 / canvas.view.zoom) {
        return
      }

      if (mode.current === 'move') {
        move(e)
      }

      if (mode.current === 'select') {
        rectSelectorController(e)
      }

      lastPoint.current = e.point
    }

    tool.onMouseMove = (e: ToolEvent) => {
      if (e.item instanceof Control || !isMove) return

      hightlightController(e)
    }

    tool.onMouseUp = (e: ToolEvent) => {
      selectItems.current = null
      selectRect.current = null
      positions.current = {}

      if (moved.current) {
        canvas.project.emit('object:moved', e)
        moved.current = false
      } else if (!e.modifiers.shift) {
        tool.onMouseDown(e, true)
      }

      mode.current = 'none'

      updateAtiveItems()

      tool.paused = false
    }

    tool.onKeyDown = (e: KeyEvent) => {
      if (e.modifiers.alt && mode.current === 'select') {
        rectSelectorController(e)
      }
    }

    tool.onKeyUp = (e: KeyEvent) => {
      if (mode.current !== 'move' && selectRect.current) {
        rectSelectorController(e)
        mode.current = 'select'
      }
    }
  }, [tool, isMove])

  useHotkeys(
    {
      keys: 'arrows,shift+arrows',
      down: (_, e: HotKeysEvent) => {
        arrowMove(e)
      }
    },
    [tool, isMove]
  )

  useHotkeys(
    {
      keys: '*+cmd',
      down: () => hightlightController(),
      up: () => hightlightController()
    },
    [tool]
  )

  useHotkeys(
    {
      keys: 'escape',
      down: (e) => {
        canvas.project.emit('exit')
      }
    },
    [tool]
  )

  useHotkeys(
    {
      keys: 'enter',
      down: enter
    },
    [tool]
  )

  return <></>
}

SelectorTool.displayName = '@yomtor/core/SelectorTool'
