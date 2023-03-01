import { ObjectPathTool, ObjectPathToolProps } from '../ObjectPathTool'
import React, { forwardRef } from 'react'
import { Rectangle } from '@yomtor/cursors'

export const ArtboardTool = forwardRef<HTMLDivElement, ObjectPathToolProps>(
  (props, ref) => {
    return (
      <ObjectPathTool
        type='artboard'
        hotKey='f'
        cursor={Rectangle}
        {...props}
        ref={ref}
      />
    )
  }
)

ArtboardTool.displayName = '@yomtor/core/ArtboardTool'
