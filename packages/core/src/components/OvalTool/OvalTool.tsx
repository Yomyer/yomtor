import { ObjectPathTool, ObjectPathToolProps } from '../ObjectPathTool'
import React, { forwardRef } from 'react'
import { Rectangle } from '@yomtor/cursors'

export const OvalTool = forwardRef<HTMLDivElement, ObjectPathToolProps>(
  (props, ref) => {
    return (
      <ObjectPathTool
        type='oval'
        hotKey='o'
        cursor={Rectangle}
        {...props}
        ref={ref}
      />
    )
  }
)

OvalTool.displayName = '@yomtor/core/OvalTool'
