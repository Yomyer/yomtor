import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { CanvasProps } from './Canvas.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import useStyles from './Canvas.styles'
import { useEditorContext } from '../../Editor.context'
import { PaperScope, Point, Size } from '@yomtor/paper'
import { cursorWithScope, Default, setCursor } from '@yomtor/cursors'
import { debounce } from 'lodash'

const defaultProps: Partial<CanvasProps> = {
  resize: false
}

export const Canvas = forwardRef<PaperScope, CanvasProps>((props, ref) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const paperRef = ref as React.MutableRefObject<PaperScope>
  const position = useRef<Point>(null)

  const { canvas, initCanvas } = useEditorContext()
  const [hasArtboards, setHasArtboards] = useState(false)
  const dinamicalProps = {}

  const { children, resize, ...others } = useComponentDefaultProps(
    'Canvas',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles(
    { hasArtboards, ...others },
    { name: 'Canvas' }
  )

  const onResize = (e) => {
    if (!canvas) return
    const rect = wrapperRef.current.getBoundingClientRect()
    const size = new Size(rect.width, rect.height)

    if (!size.equals(canvas.view.viewSize)) {
      canvasRef.current.style.width = size.width + 'px'
      canvasRef.current.style.height = size.height + 'px'
      canvasRef.current.width = size.width * 2
      canvasRef.current.height = size.height * 2
      canvas.view.viewSize = size
    }
    position.current = new Point(rect.left, rect.top)
  }

  useEffect(() => {
    const scope = new PaperScope()

    scope.setup(canvasRef.current)

    initCanvas(scope)
    cursorWithScope(canvasRef.current)

    paperRef && (paperRef.current = scope)
  }, [])

  useEffect(() => {
    if (!canvas) return

    setCursor(Default)

    canvas.project.on(['object:created', 'object:deleted'], () => {
      setHasArtboards(!!canvas.project.artboards.length)
    })

    const resizeObjserver = new ResizeObserver(onResize)
    resizeObjserver.observe(wrapperRef.current)

    return () => resizeObjserver.disconnect()
  }, [canvas])

  useEffect(() => {
    if (!canvas) return

    canvas.view.on('frame', () => {
      if (!position.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const pos = new Point(rect.left, rect.top)

      if (!position.current.equals(pos)) {
        canvas.view.center = canvas.view.center.add(
          pos.subtract(position.current)
        )
      }
    })
  }, [canvas, position])

  return (
    <div className={classes.root} ref={wrapperRef}>
      <canvas
        tabIndex={0}
        ref={canvasRef}
        className={classes.canvas}
        onMouseDown={() => {
          canvasRef.current.focus()
          canvasRef.current.blur()
        }}
        {...dinamicalProps}
      />
      <div className={classes.tools}>{children}</div>
    </div>
  )
})

Canvas.displayName = '@yomtor/core/Canvas'
