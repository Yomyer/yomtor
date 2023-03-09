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
  Matrix,
  Point
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
    bounds,
    angle
  }: {
    selector: Selector
    bounds: Rectangle
    angle: number
  }) => {
    const start = new Path({ insert: false, fillColor: 'green', opacity: 0.2 })
    start.add([selector.topLeft.x, selector.topLeft.y])
    start.add([selector.topRight.x, selector.topRight.y])
    start.add([selector.bottomRight.x, selector.bottomRight.y])
    start.add([selector.bottomLeft.x, selector.bottomLeft.y])
    start.add([selector.topLeft.x, selector.topLeft.y])

    const end = new Path({ insert: false, fillColor: 'yellow', opacity: 0.2 })
    end.add([bounds.topLeft.x, bounds.topLeft.y])
    end.add([bounds.topRight.x, bounds.topRight.y])
    end.add([bounds.bottomRight.x, bounds.bottomRight.y])
    end.add([bounds.bottomLeft.x, bounds.bottomLeft.y])
    end.add([bounds.topLeft.x, bounds.topLeft.y])

    const matrix = new Matrix().rotate(angle, end.bounds.center)
    const rotation = new Matrix().rotate(-angle, end.bounds.center)

    const unite = start
      .clone()
      .transform(rotation)
      .unite(end.clone().transform(rotation))
    unite.fillColor = 'red'

    const uniteBounds = unite.activeInfo
    const a = new Path(unite.pathData)
    a.fillColor = 'blue'

    const lineTop = new Path.Line({
      insert: true,
      strokeColor: 'red',
      to: uniteBounds.topCenter,
      from: uniteBounds.bottomCenter
    })
    lineTop.rotate(angle, bounds.center)

    const lineBottom = new Path.Line({
      insert: false,
      to: selector.center,
      from: matrix.transformPoint(
        new Point([selector.center.x, selector.bottom + bounds.height]),
        null
      )
    })
    const lineLeft = new Path.Line({
      insert: false,
      to: selector.center,
      from: matrix.transformPoint(
        new Point([selector.left - bounds.width, selector.center.y]),
        null
      )
    })
    const lineRight = new Path.Line({
      insert: false,
      to: selector.center,
      from: matrix.transformPoint(
        new Point([selector.right + bounds.width, selector.center.y]),
        null
      )
    })

    return {
      start: {
        top: start.getIntersections(lineTop)[0]?.point,
        bottom: start.getIntersections(lineBottom)[0]?.point,
        left: start.getIntersections(lineLeft)[0]?.point,
        right: start.getIntersections(lineRight)[0]?.point
      },
      end: {
        top: end.getIntersections(lineTop)[0]?.point,
        bottom: end.getIntersections(lineBottom)[0]?.point,
        left: end.getIntersections(lineLeft)[0]?.point,
        right: end.getIntersections(lineRight)[0]?.point
      }
    }
  }

  useEffect(() => {
    if (!tool) return

    new Control(
      'verticalConstraints',
      new Group(),
      ({ control, selector }) => {
        const items = canvas.project.activeItems
        control.item.removeChildren()

        if (items.length !== 1 || (items.length && !items[0].artboard)) return

        const item = items[0]
        const constraints = item.constraints
        const zoom = canvas.view.zoom
        const horizontal = constraints.horizontal
        const vertical = constraints.vertical
        const angle = item.artboard.angle
        const bounds = item.artboard.activeInfo as unknown as Rectangle

        const { start, end } = getCenters({
          selector,
          bounds,
          angle
        })

        const params = {
          strokeColor: selector.strokeColor,
          strokeWidth: 0.5 / zoom,
          dashArray: [3 / zoom, 2 / zoom],
          insert: true,
          from: new Point([0, 0]),
          to: new Point([0, 0])
        }

        const paramsV = Object.assign({}, params)
        const paramsH = Object.assign({}, params)

        switch (vertical) {
          default:
            paramsV.from = end.top
            paramsV.to = start.top
            break
        }

        switch (horizontal) {
          default:
            //paramsH.from = new Point([bounds.left, centerLeft.y])
            //paramsH.to = new Point([centerLeft.x, centerLeft.y])
            break
        }

        const vLine = new Path.Line(paramsV)
        const hLine = new Path.Line(paramsH)

        control.item.addChild(vLine)
        control.item.addChild(hLine)
      },
      false
    )
  }, [tool])

  return <></>
}

ConstraintsTool.displayName = '@yomtor/core/ConstraintsTool'
