import { ObjectControlsProps } from './ObjectControls.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useCallback, useEffect, useState } from 'react'
import { TreeView } from '@yomtor/ui'
import { ChangeFlag, Item } from '@yomtor/paper'

const defaultProps: Partial<ObjectControlsProps> = {
  zoom: 1
}

export const ObjectControls = (props: ObjectControlsProps) => {
  const {} = useComponentDefaultProps('ObjectControls', defaultProps, props)
  const { canvas } = useEditorContext()
  const [data, setData] = useState([])

  useEffect(() => {
    if (!canvas) return
    setData(canvas.project.activeLayer.children)

    canvas.project.on('changed', (type) => {
      if (type & (ChangeFlag.ACTIVE | ChangeFlag.HIGHLIGHT)) {
        setData([...canvas.project.activeLayer.children])
      }
    })
    // canvas.project.
  }, [canvas])

  return (
    <TreeView<Item> data={data} multiple reverse>
      {(node, item) => <div>{node.name}</div>}
    </TreeView>
  )
}
