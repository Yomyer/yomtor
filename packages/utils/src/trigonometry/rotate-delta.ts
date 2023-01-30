import { Point } from '@yomtor/paper'
import { rotatePoint } from './rotate-point'
import { sign } from '../math/sign'
import { getDirection } from './get-direction'

export const rotateDelta = (point: Point, corner: Point, angle: number) => {
  point = rotatePoint(point, corner, -angle)
  const distancePoint = Math.hypot(point.x - corner.x, point.y - corner.y)
  const anglePoint = Math.atan2(point.y - corner.y, point.x - corner.x)

  const horizontalPoint = rotatePoint(
    new Point(
      corner.x + Math.cos(anglePoint) * distancePoint,
      point.y - Math.sin(anglePoint) * distancePoint
    ),
    corner,
    angle
  )

  const verticalPoint = rotatePoint(
    new Point(
      point.x - Math.cos(anglePoint) * distancePoint,
      corner.y + Math.sin(anglePoint) * distancePoint
    ),
    corner,
    angle
  )

  const distance = new Point(
    Math.hypot(horizontalPoint.x - corner.x, horizontalPoint.y - corner.y),
    Math.hypot(verticalPoint.x - corner.x, verticalPoint.y - corner.y)
  ).multiply(sign(getDirection(point, corner)) as any)

  return distance
}
