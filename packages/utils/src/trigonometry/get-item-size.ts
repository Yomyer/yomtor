import { Size, Point } from '@yomtor/paper'
import { rotatePoint } from './rotate-point'

export const getItemSize = (corner: Point, center: Point, angle: number) => {
  corner = rotatePoint(corner, center, angle)
  return new Size((corner.x - center.x) * 2, (corner.y - center.y) * 2)
}
