import { ConstraintsToolProps } from './ConstraintsTool.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '../Editor.context'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Tool,
  Grid,
  Control,
  Group,
  Path,
  Selector,
  Rectangle,
  Matrix
} from '@yomtor/paper'
import { useEventListener, useHotkeys } from '@yomtor/hooks'
import { isFunction } from 'lodash'

const defaultProps: Partial<ConstraintsToolProps> = {
  factor: 8,
  pixelGrid: true
}

export const ConstraintsTool = (props: ConstraintsToolProps) => {
  const {} = useComponentDefaultProps('ConstraintsTool', defaultProps, props)
  const { canvas } = useEditorContext()
  const [tool, setTool] = useState<Tool>()

  useEffect(() => {
    if (!canvas) return
    setTool(canvas.createTool('ConstraintsTool'))
  }, [canvas])

  const getCenters = ({
    selector,
    bounds
  }: {
    selector: Selector
    bounds: Rectangle
  }) => {
    const rect = new Path({ insert: false })
    rect.add([selector.topLeft.x, selector.topLeft.y])
    rect.add([selector.topRight.x, selector.topRight.y])
    rect.add([selector.bottomRight.x, selector.bottomRight.y])
    rect.add([selector.bottomLeft.x, selector.bottomLeft.y])
    rect.add([selector.topLeft.x, selector.topLeft.y])

    const centerTop = rect.getIntersections(
      new Path.Line({
        insert: false,
        to: selector.center,
        from: [selector.center.x, selector.top - rect.bounds.height]
      })
    )[0]?.point

    const centerBottom = rect.getIntersections(
      new Path.Line({
        insert: false,
        to: selector.center,
        from: [selector.center.x, bounds.bottom]
      })
    )[0]?.point

    const centerLeft = rect.getIntersections(
      new Path.Line({
        insert: false,
        to: selector.center,
        from: [selector.left - rect.bounds.width, selector.center.y]
      })
    )[0]?.point

    const centerRight = rect.getIntersections(
      new Path.Line({
        insert: false,
        to: selector.center,
        from: [bounds.right, selector.center.y]
      })
    )[0]?.point

    return { centerTop, centerBottom, centerLeft, centerRight }
  }

  useEffect(() => {
    if (!tool) return

    new Control('verticalConstraints', new Group(), ({ control, selector }) => {
      const items = canvas.project.activeItems
      control.item.removeChildren()

      if (items.length !== 1 || (items.length && !items[0].artboard)) return

      const item = items[0]
      const constraints = item.constraints
      const zoom = canvas.view.zoom
      const horizontal = constraints.horizontal
      const vertical = constraints.vertical
      const angle = item.artboard.angle

      const matrix = new Matrix().rotate(angle, item.artboard.bounds.center)
      const bounds = matrix.transformBounds(
        item.artboard.bounds,
        item.artboard.bounds.clone()
      )

      const { centerTop, centerBottom, centerLeft, centerRight } = getCenters({
        bounds,
        selector
      })

      const params = {
        strokeColor: selector.strokeColor,
        strokeWidth: 0.5 / zoom,
        dashArray: [3 / zoom, 2 / zoom],
        insert: false,
        from: [0, 0],
        to: [0, 0]
      }

      const paramsV = Object.assign({}, params)
      const paramsH = Object.assign({}, params)

      switch (vertical) {
        default:
          paramsV.from = [centerTop.x, bounds.top]
          paramsV.to = [centerTop.x, centerTop.y]
          break
      }

      switch (horizontal) {
        default:
          paramsH.from = [bounds.left, centerLeft.y]
          paramsH.to = [centerLeft.x, centerLeft.y]
          break
      }

      const vLine = new Path.Line(paramsV)
      const hLine = new Path.Line(paramsH)

      control.item.addChild(vLine)
      control.item.addChild(hLine)
    })
  }, [tool])

  return <></>
}

ConstraintsTool.displayName = '@yomtor/core/ConstraintsTool'
