import { Point, Size } from '@yomtor/paper'

export function sign(size: Size): Size
export function sign(point: Point): Point
export function sign(number: number): number
export function sign(value: any): any {
  if (value instanceof Size) {
    return new Size(sign(value.width), sign(value.height))
  }
  if (value instanceof Point) {
    return new Point(sign(value.x), sign(value.y))
  }
  return Math.sign(value)
}
