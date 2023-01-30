import { Point } from '@yomtor/paper'
import { rotatePoint } from './rotate-point'

export const getDirection = function (point: Point, center: Point, angle = 0) {
  point = rotatePoint(point, center, angle)
  const radius = Math.atan2(point.x - center.x, point.y - center.y)

  return new Point(Math.sin(radius), Math.cos(radius))
}
