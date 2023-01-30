import { PiBy180 } from './pi-by-180'

export const degreesToRadians = (degrees: number): number => {
  return degrees * PiBy180
}
