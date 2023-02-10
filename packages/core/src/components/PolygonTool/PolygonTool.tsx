import { ObjectPathTool, ObjectPathToolProps } from '../ObjectPathTool'
import React, { forwardRef } from 'react'
import { Rectangle } from '@yomtor/cursors'

export const PolygonTool = forwardRef<HTMLDivElement, ObjectPathToolProps>(
  (props, ref) => {
    return (
      <ObjectPathTool
        type='polygon'
        hotKey='p'
        cursor={Rectangle}
        {...props}
        ref={ref}
      />
    )
  }
)

PolygonTool.displayName = '@yomtor/core/PolygonTool'
