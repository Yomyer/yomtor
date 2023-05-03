import { ObjectPathToolProps } from './ObjectPathTool.props'
import { useComponentDefaultProps, useYomtorTheme } from '@yomtor/styles'
import { useEditorContext } from '../Editor.context'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { Artboard, Item, KeyEvent, Path, Tool, ToolEvent } from '@yomtor/paper'
import { Cross, Rectangle, useCursor } from '@yomtor/cursors'
import { useHotkeys } from '@yomtor/hooks'
import { useObjectPath } from './use-object-path'

const defaultProps: Partial<ObjectPathToolProps> = {
  onInserMode: () => {},
  hotKey: 'r',
  cursor: Rectangle,
  type: 'rectangle'
}

export const ObjectPathTool = forwardRef<HTMLDivElement, ObjectPathToolProps>(
  (props, ref) => {
    const { onInserMode, toolRef, type, cursor, hotKey, children } =
      useComponentDefaultProps('ObjectTool', defaultProps, props)
    const { canvas } = useEditorContext()
    const theme = useYomtorTheme()
    const [insertMode, setInserMode] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [tool, setTool] = useState<Tool>()
    const phantom = useRef<Item>(null)
    const { showCursor, hideCursor } = useCursor()

    const onClick = useCallback(() => {
      setInserMode(true)
    }, [canvas])

    useEffect(() => {
      if (!canvas) return
      setTool(canvas.createTool('Insert'))
    }, [canvas])

    useEffect(() => {
      if (!tool) return

      onInserMode((canvas.project.insertMode = insertMode))

      if (insertMode) {
        tool.activate()
        canvas.project.clearHighlightedItem()
      } else if (tool && insertMode === false) {
        canvas.project.selector.clearInfo()
        if (phantom.current) phantom.current.remove()
        tool.activeMain()
      }
    }, [insertMode])

    useEffect(() => {
      if (!tool) return

      tool.onActivate = () => {
        showCursor([Cross, cursor])
      }

      tool.onDeactivate = () => {
        hideCursor([Cross, cursor])
        setInserMode(null)
      }

      tool.onMouseDown = (event: ToolEvent) => {
        setInserMode(true)
      }

      tool.onMouseDrag = (event: ToolEvent) => {
        const distance = event.downPoint
          .multiply(canvas.view.zoom)
          .getDistance(event.point.multiply(canvas.view.zoom))

        if (distance > 5) {
          setDragging(true)
          canvas.project.deactivateAll()

          phantom.current = useObjectPath({
            canvas,
            event,
            theme,
            type,
            dragging: true
          })

          if (!(phantom.current instanceof Artboard)) {
            const artboard = canvas.project.hitTest(event.downPoint, {
              fill: true,
              stroke: false,
              legacy: true,
              class: Artboard
            })

            if (artboard) {
              artboard.item.insertChild(
                artboard.item.children.length + 1,
                phantom.current
              )
            }
          }

          phantom.current.actived = true
          const transformTool = canvas.getTool('TransformTool')
          transformTool.activeMain()
          transformTool.idle = true

          canvas.project.selector.emit(
            'mousedown',
            Object.assign(event, {
              target: canvas.project.selector.getControl('bottomRight')
            })
          )
          showCursor([Cross, cursor])
        }
      }

      tool.onMouseUp = (event: ToolEvent) => {
        setInserMode(false)

        if (!dragging) {
          phantom.current && phantom.current.remove()
          canvas.project.deactivateAll()
          const item = useObjectPath({ canvas, event, theme, type, dragging })

          if (!(item instanceof Artboard)) {
            const artboard = canvas.project.hitTest(event.downPoint, {
              fill: true,
              stroke: false,
              legacy: true,
              class: Artboard
            })

            if (artboard) {
              artboard.item.insertChild(artboard.item.children.length + 1, item)
            }
          }

          item.actived = true
        }
      }

      tool.onKeyDown = (event: KeyEvent) => {
        if (event.key === 'escape') {
          setInserMode(false)
          canvas.project.emit('tool:keydown', event)
        }
      }

      canvas.view.on('keydown', (event: KeyEvent) => {
        if (event.key === 'escape') {
          setDragging(true)
        }
      })

      canvas.view.on('mouseup', () => {
        setDragging(false)
        phantom.current = null
        hideCursor([Cross, cursor])
        canvas.getTool('TransformTool').idle = false
      })
      // canvas.view.on('mousedrag', () => setDragging(true))

      if (toolRef) {
        toolRef.current = tool
      }
    }, [tool, dragging, theme])

    useHotkeys(
      {
        keys: hotKey,
        down: () => {
          if (tool && !dragging) {
            setInserMode(true)
          }
        }
      },
      [tool, dragging]
    )

    return (
      <>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement<any>(child, { onClick })
          }
          return child
        })}
      </>
    )
  }
)

ObjectPathTool.displayName = '@yomtor/core/ObjectPathTool'
