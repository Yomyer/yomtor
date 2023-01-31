import { Item, Point, Size } from '@yomtor/paper'
import { isUndefined } from 'lodash'
import { rotatePoint } from './rotate-point'

export function scaleWithRotate(item: Item, factor: Size)
export function scaleWithRotate(
  item: Item,
  factor: Point | Size,
  pivot?: Point,
  center?: Point,
  angle?: number
)
export function scaleWithRotate(
  item: Item,
  factor: Point | Size,
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

  if (factor instanceof Size) {
    factor = new Point(
      factor.width ? factor.width / item.bounds.width : 1,
      factor.height ? factor.height / item.bounds.height : 1
    )
  }

  item.scale(factor.x, factor.y, pivot)
  item.rotate(angle, center)

  item.angle = oldAngle
}
