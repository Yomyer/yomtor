import { Point, Size } from '@yomtor/paper'

export function roundToNearestEven(size: Size): Size
export function roundToNearestEven(point: Point): Point
export function roundToNearestEven(number: number): number
export function roundToNearestEven(value: any): any {
  if (value instanceof Size) {
    return new Size(
      roundToNearestEven(value.width),
      roundToNearestEven(value.height)
    )
  }
  if (value instanceof Point) {
    return new Point(roundToNearestEven(value.x), roundToNearestEven(value.y))
  }

  const number = Math.round(value)
  return !(number % 2) ? number : number - 1
}
