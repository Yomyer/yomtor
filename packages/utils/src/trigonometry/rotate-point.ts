import { Point } from '@yomtor/paper'

export const rotatePoint = (
  point: Point,
  center: Point,
  angle: number
): Point => {
  let radians = (angle * Math.PI) / 180
  const diff = point.subtract(center)
  const distance = Math.sqrt(diff.x * diff.x + diff.y * diff.y)

  radians += Math.atan2(diff.y, diff.x)

  return new Point(
    center.x + distance * Math.cos(radians),
    center.y + distance * Math.sin(radians)
  )
}
