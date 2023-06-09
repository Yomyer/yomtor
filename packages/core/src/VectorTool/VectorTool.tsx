import React, { useEffect, useState } from 'react'
import { VectorToolProps } from './VectorTool.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '../Editor.context'
import { Tool, ToolEvent, Path, Rectangle } from '@yomtor/paper'

const defaultProps: Partial<VectorToolProps> = {}

export const VectorTool = (props: VectorToolProps) => {
  const {} = useComponentDefaultProps('VectorTool', defaultProps, props)
  const [tool, setTool] = useState<Tool>()
  const { canvas } = useEditorContext()

  useEffect(() => {
    if (!canvas) return

    setTool(
      canvas.createTool('VectorTool', false, ['SelectorTool', 'TransformTool'])
    )
  }, [canvas])

  useEffect(() => {
    if (!tool) return

    canvas.project.on('enter', (e: ToolEvent) => {
      if (e.item instanceof Path) {
        tool.activate()
        tool.hideOtherTools()
      }
    })

    canvas.project.on('exit', (e: ToolEvent) => {
      tool.activeMain()
      tool.showOtherTools()
    })

    tool.onDoubleClick = (e: ToolEvent) => {
      tool.activeMain()
      tool.showOtherTools()
    }
  }, [tool])

  return <></>
}

VectorTool.displayName = '@yomtor/core/VectorTool'
