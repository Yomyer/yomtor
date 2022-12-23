import React, { forwardRef, useRef, useState } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'
import { ResizePanelProps, ResizeSizes } from './ResizePanel.props'
import useStyles from './ResizePanel.styles'

import { Draggable } from '../../Draggable'
import {
  setGlobalCursor,
  clearGlobalCursor,
  ResizePanel as ResizePanelCursor
} from '@yomtor/cursors'

import { useMergedRef } from '@mantine/hooks'
import { flushSync } from 'react-dom'

const defaultProps: Partial<ResizePanelProps> = {
  resize: false,
  min: 0
}

export const ResizePanel = forwardRef<HTMLDivElement, ResizePanelProps>(
  (props, ref) => {
    const elRef = useRef<HTMLElement>()

    const {
      sizes: defaultSizes,
      resize,
      min,
      max,
      className,
      direction,
      children,
      panel: Panel,
      ...others
    } = useComponentDefaultProps('ResizePanel', defaultProps, props)
    const [internalSize, setInternalSize] = useState<ResizeSizes>(defaultSizes)
    const [sizes, setSizes] = useState<ResizeSizes>(defaultSizes)
    const [dragging, setDragging] = useState(false)
    const [stop, setStop] = useState(false)
    const isH = ['e', 'w'].includes(direction)

    const { classes, cx } = useStyles(
      { isH, direction, dragging, ...others },
      { name: 'ResizePanel' }
    )

    const enterHandler = () => {
      setGlobalCursor(ResizePanelCursor, !isH && 90)
    }

    const leaveHandler = () => {
      !dragging && clearGlobalCursor(ResizePanelCursor, !isH && 90)
    }

    const startDragging = () => {
      setDragging(true)
    }

    const stopHandler = () => {
      setSizeRange(getSize())
      setDragging(false)
    }

    const getSize = () => {
      return isH ? elRef.current?.offsetWidth : elRef.current.offsetHeight
    }

    const getParentSize = () => {
      return isH
        ? elRef.current?.parentElement?.offsetWidth
        : elRef.current?.parentElement?.offsetHeight
    }

    const dragHandler = (event: any, ui: any) => {
      const s = internalSize ||
        sizes || {
          base: getSize()
        }

      setSizeRange(s.base + (isH ? ui.deltaX : ui.deltaY))
    }

    const setSizeRange = (size: number) => {
      setInternalSize({ ...sizes, base: size })

      if (size <= min || size <= 1) {
        size = min || 1
      }

      if (size >= max || size >= getParentSize()) {
        size = max || getParentSize()
      }

      setSizes({ ...sizes, base: size })
    }

    return (
      <Panel
        {...{
          ...others,
          ...(isH ? { width: sizes } : { height: sizes })
        }}
        ref={useMergedRef(ref, elRef)}
        className={cx(className, classes.root)}
        styles={(_, { fixed }) => ({
          root: { position: !fixed && 'relative' }
        })}
      >
        {children}
        {resize && (
          <Draggable
            axis={isH ? 'x' : 'y'}
            onDrag={dragHandler}
            onStart={startDragging}
            onStop={stopHandler}
            distance={0}
            move={false}
            stop={stop}
            phantom
          >
            <div
              className={classes.handler}
              onMouseEnter={enterHandler}
              onMouseLeave={leaveHandler}
            />
          </Draggable>
        )}
      </Panel>
    )
  }
)

ResizePanel.displayName = '@yomtor/ui/ResizePanel'
