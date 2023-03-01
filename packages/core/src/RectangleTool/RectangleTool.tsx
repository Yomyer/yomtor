import { ObjectPathTool, ObjectPathToolProps } from '../ObjectPathTool'
import React, { forwardRef } from 'react'

export const RectangleTool = forwardRef<HTMLDivElement, ObjectPathToolProps>(
  (props, ref) => {
    return <ObjectPathTool {...props} ref={ref} />
  }
)

RectangleTool.displayName = '@yomtor/core/RectangleTool'
