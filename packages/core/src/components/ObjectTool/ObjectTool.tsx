import { ObjectToolProps } from './ObjectTool.props'
import { useComponentDefaultProps, useYomtorTheme } from '@yomtor/styles'
import { useEditorContext } from '../../Editor.context'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { Artboard, Item, KeyEvent, Tool, ToolEvent } from '@yomtor/paper'
import { clearCursor, Cross, setCursor } from '@yomtor/cursors'
import { useHotkeys } from '@yomtor/hooks'

const defaultProps: Partial<ObjectToolProps> = {
  onInserMode: () => {},
  hotKey: 'r'
}

export const ObjectTool = forwardRef<HTMLDivElement, ObjectToolProps>(
  (props, ref) => {
    const {
      onInserMode,
      onPhantom,
      onObject,
      toolRef,
      cursor,
      hotKey,
      children
    } = useComponentDefaultProps('ObjectTool', defaultProps, props)
    const { canvas } = useEditorContext()
    const theme = useYomtorTheme()
    const [insertMode, setInserMode] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [tool, setTool] = useState<Tool>()
    const phantom = useRef<Item>(null)

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
      } else if (tool && insertMode === false) {
        canvas.project.selector.clearInfo()
        if (phantom.current) phantom.current.remove()
        tool.activeMain()
      }
    }, [insertMode])

    useEffect(() => {
      if (!tool) return

      tool.onActivate = () => {
        console.log('activated', hotKey)
        setCursor(Cross, 0, cursor)
      }

      tool.onDeactivate = () => {
        clearCursor(Cross, 0, cursor)
        setInserMode(null)
      }

      tool.onMouseDown = (event: ToolEvent) => {
        canvas.project.selector.emit('mousedown', event)
      }

      tool.onMouseDrag = (event: ToolEvent) => {
        if (phantom.current) phantom.current.remove()

        phantom.current = onPhantom({ event, canvas, theme })

        canvas.project.selector.setInfo(
          `${phantom.current.bounds.width} x ${phantom.current.bounds.height}`,
          event.point
        )
      }

      tool.onMouseUp = (event: ToolEvent) => {
        setInserMode(false)

        if (phantom.current) {
          phantom.current.remove()
          canvas.project.deactivateAll()

          const item = onObject({ event, canvas, theme })

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
          canvas.project.fire('tool:keydown', event)
        }
      }

      canvas.view.on('keydown', (event: KeyEvent) => {
        if (event.key === 'escape') {
          setDragging(true)
        }
      })

      canvas.view.on('mouseup', () => setDragging(false))
      canvas.view.on('mousedrag', () => setDragging(true))

      if (toolRef) {
        toolRef.current = tool
      }
    }, [tool, theme])

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
            return React.cloneElement(child, { onClick })
          }
          return child
        })}
      </>
    )
  }
)

ObjectTool.displayName = '@yomtor/core/ObjectTool'
