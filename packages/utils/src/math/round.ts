import { Point, Size } from '@yomtor/paper'

export function round(size: Size, toFix?: number): Size
export function round(point: Point, toFix?: number): Point
export function round(number: number, toFix?: number): number
export function round(value: any, toFix = 0): any {
  if (value instanceof Size) {
    return new Size(round(value.width, toFix), round(value.height, toFix))
  }
  if (value instanceof Point) {
    return new Point(round(value.x, toFix), round(value.y, toFix))
  }
  return Number((value || 0).toFixed(toFix))
}
