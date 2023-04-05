import { ConstraintsToolProps } from './ConstraintsTool.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '../Editor.context'
import React, { useEffect, useState } from 'react'
import {
  Tool,
  Control,
  Group,
  Path,
  Selector,
  Rectangle,
  Matrix,
  Point
} from '@yomtor/paper'

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
    artboard,
    angle
  }: {
    selector: Selector
    artboard: Rectangle
    angle: number
  }) => {
    const selectorRect = new Path({ insert: false })
    selectorRect.add([selector.topLeft.x, selector.topLeft.y])
    selectorRect.add([selector.topRight.x, selector.topRight.y])
    selectorRect.add([selector.bottomRight.x, selector.bottomRight.y])
    selectorRect.add([selector.bottomLeft.x, selector.bottomLeft.y])
    selectorRect.add([selector.topLeft.x, selector.topLeft.y])

    const artboardRect = new Path({ insert: false })
    artboardRect.add([artboard.topLeft.x, artboard.topLeft.y])
    artboardRect.add([artboard.topRight.x, artboard.topRight.y])
    artboardRect.add([artboard.bottomRight.x, artboard.bottomRight.y])
    artboardRect.add([artboard.bottomLeft.x, artboard.bottomLeft.y])
    artboardRect.add([artboard.topLeft.x, artboard.topLeft.y])

    const rotate = new Matrix().rotate(angle, artboardRect.bounds.center)
    const rotateNormalize = new Matrix().rotate(
      -angle,
      artboardRect.bounds.center
    )

    const selectorNormalize = selectorRect.clone().transform(rotateNormalize)
    const artboardNormalize = artboardRect.clone().transform(rotateNormalize)
    const unite = selectorNormalize.unite(artboardNormalize)
    const uniteBounds = unite.info

    const vertical = new Path.Line({
      insert: false,
      to: [selectorNormalize.bounds.center.x, uniteBounds.topCenter.y],
      from: [selectorNormalize.bounds.center.x, uniteBounds.bottomCenter.y]
    })

    const horizontal = new Path.Line({
      insert: false,
      to: [uniteBounds.leftCenter.x, selectorNormalize.bounds.center.y],
      from: [uniteBounds.rightCenter.x, selectorNormalize.bounds.center.y]
    })

    const getNereastPoint = (
      line: Path,
      direction: 'x' | 'y' = 'x',
      math: 'max' | 'min' = 'min'
    ): Point => {
      const curveLoactaions = selectorNormalize.getIntersections(line)

      const value = Math[math](
        ...curveLoactaions.map((curve) => curve.point[direction])
      )

      return curveLoactaions.find((curve) => curve.point[direction] === value)
        ?.point
    }

    return {
      selectorRect: {
        top: rotate.transformPoint(getNereastPoint(vertical, 'y', 'min')),
        bottom: rotate.transformPoint(getNereastPoint(vertical, 'y', 'max')),
        left: rotate.transformPoint(getNereastPoint(horizontal, 'x', 'min')),
        right: rotate.transformPoint(getNereastPoint(horizontal, 'x', 'max'))
      },
      artboardRect: {
        top: rotate.transformPoint(
          new Point([
            selectorNormalize.info.center.x,
            artboardNormalize.bounds.top
          ])
        ),
        bottom: rotate.transformPoint(
          new Point([
            selectorNormalize.info.center.x,
            artboardNormalize.bounds.bottom
          ])
        ),
        left: rotate.transformPoint(
          new Point([
            artboardNormalize.bounds.left,
            selectorNormalize.info.center.y
          ])
        ),
        right: rotate.transformPoint(
          new Point([
            artboardNormalize.bounds.right,
            selectorNormalize.info.center.y
          ])
        )
      }
    }
  }

  useEffect(() => {
    if (!tool) return

    new Control(
      'verticalConstraints',
      new Group({ guide: true }),
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
        const artboard = item.artboard.info as unknown as Rectangle

        const { selectorRect, artboardRect } = getCenters({
          selector,
          artboard,
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

        const addConstraint = (
          direction: 'top' | 'bottom' | 'left' | 'right' | 'center'
        ) => {
          control.item.addChild(
            new Path.Line({
              ...params,
              from: artboardRect[direction],
              to: selectorRect[direction]
            })
          )
        }

        switch (vertical) {
          case 'end':
            addConstraint('bottom')
            break
          case 'start':
          case 'both':
            addConstraint('top')
            if (vertical === 'both') {
              addConstraint('bottom')
            }
            break
        }

        switch (horizontal) {
          case 'end':
            addConstraint('right')
            break
          case 'start':
          case 'both':
            addConstraint('left')
            if (horizontal === 'both') {
              addConstraint('right')
            }
            break
        }
      },
      false
    )
  }, [tool])

  return <></>
}

ConstraintsTool.displayName = '@yomtor/core/ConstraintsTool'
