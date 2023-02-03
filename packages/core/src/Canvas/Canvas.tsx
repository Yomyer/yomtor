import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { CanvasProps } from './Canvas.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import useStyles from './Canvas.styles'
import { useEditorContext } from '../Editor.context'
import { PaperScope } from '@yomtor/paper'
import { cursorWithScope, Default, setCursor } from '@yomtor/cursors'
import { useMergedRef } from '@yomtor/hooks'

const defaultProps: Partial<CanvasProps> = {
  resize: false
}

export const Canvas = forwardRef<PaperScope, CanvasProps>((props, ref) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const paperRef = ref as React.MutableRefObject<PaperScope>

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

  useEffect(() => {
    const scope = new PaperScope()

    scope.setup(canvasRef.current)

    initCanvas(scope)
    cursorWithScope(canvasRef.current)

    paperRef && (paperRef.current = scope)
  }, [])

  useEffect(() => {
    if (!canvas) {
      return
    }

    setCursor(Default)

    canvas.project.on(['object:created', 'object:deleted'], () => {
      setHasArtboards(!!canvas.project.artboards.length)
    })
  }, [canvas])

  if (resize) {
    dinamicalProps['data-paper-resize'] = 'true'
  }

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
