import { Point, Size } from '@yomtor/paper'

export function abs(size: Size): Size
export function abs(point: Point): Point
export function abs(number: number): number
export function abs(value: any): any {
  if (value instanceof Size) {
    return new Size(abs(value.width), abs(value.height))
  }
  if (value instanceof Point) {
    return new Point(abs(value.x), abs(value.y))
  }
  return Math.abs(value)
}
