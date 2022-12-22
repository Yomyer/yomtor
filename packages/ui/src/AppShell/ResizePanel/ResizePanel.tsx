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

const defaultProps: Partial<ResizePanelProps> = {}

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
    const [sizes, setSizes] = useState<ResizeSizes>(defaultSizes)
    const [dragging, setDragging] = useState(false)
    const isH = ['e', 'w'].includes(direction)

    const { classes, cx } = useStyles(
      { isH, direction, ...others },
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
      setDragging(false)
    }

    const dragHandler = (event: any, ui: any) => {
      const s = sizes || {
        base: isH ? elRef.current?.clientWidth : elRef.current.clientHeight
      }

      setSizes({ ...s, base: s.base + (isH ? ui.deltaX : ui.deltaY) })
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
        <Draggable
          axis={isH ? 'x' : 'y'}
          onDrag={dragHandler}
          onStart={startDragging}
          onStop={stopHandler}
          distance={0}
          move={false}
          phantom={true}
        >
          <div
            className={classes.handler}
            onMouseEnter={enterHandler}
            onMouseLeave={leaveHandler}
          />
        </Draggable>
      </Panel>
    )
  }
)

ResizePanel.displayName = '@yomtor/ui/ResizePanel'
