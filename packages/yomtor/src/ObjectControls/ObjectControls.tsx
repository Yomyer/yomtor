import { ObjectControlsProps } from './ObjectControls.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useCallback, useEffect, useState } from 'react'
import { TreeView, TreeViewDropInfo } from '@yomtor/ui'
import { ChangeFlag, Item } from '@yomtor/paper'
import { startCase } from 'lodash'

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

  const sortHandler = (data: TreeViewDropInfo<Item>) => {
    data.drag.forEach((item) => item.insertAbove(data.drop))

    data.drag.forEach((item) => {
      if (['above', 'below'].includes(data.position)) {
        item['insert' + startCase(data.position)](data.drop)
      } else {
        data.drop.insertChild(data.drop.children.length, item)
      }

      item.actived = true
    })

    setData([...canvas.project.activeLayer.children])
  }

  return (
    <TreeView<Item> data={data} multiple reverse sortabled onSort={sortHandler}>
      {(node, item) => <div>{node.name}</div>}
    </TreeView>
  )
}
