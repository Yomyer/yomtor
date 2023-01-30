import { Item, Point } from '@yomtor/paper'
import { isUndefined } from 'lodash'
import { rotatePoint } from './rotate-point'

export const scaleWithRotate = function (
  item: Item,
  factor: Point,
  pivot?: Point,
  center?: Point,
  angle?: number
) {
  const oldAngle = item.angle
  center = center || item.bounds.center
  pivot = pivot || center

  angle = (isUndefined(angle) && item.inheritedAngle) || 0

  if (item.angle !== angle) {
    item.angle = 0
  }

  pivot = rotatePoint(pivot, center, -angle)

  item.rotate(-angle, center)
  item.scale(factor.x, factor.y, pivot)
  item.rotate(angle, center)

  item.angle = oldAngle
}
