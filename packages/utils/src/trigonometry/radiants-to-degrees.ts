import { PiBy180 } from './pi-by-180'

export const radiansToDegrees = function (radians: number): number {
  return radians / PiBy180
}
