import { Point, Size } from '@yomtor/paper'

export function normalize(size: Size): Size
export function normalize(point: Point): Point
export function normalize(number: number): number
export function normalize(value: any): any {
  if (value instanceof Size) {
    return new Size(normalize(value.width), normalize(value.height))
  }
  if (value instanceof Point) {
    return new Point(normalize(value.x), normalize(value.y))
  }
  if (Math.abs(value) < 0.00001) {
    return 0
  }
  return value
}
