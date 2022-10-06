import { padEnd } from 'lodash'

export const useColorWord = (text: string): string => {
  const seed = 16777215
  const factor = 49979693
  let b = 1
  let d = 0
  let f = 1
  if (text.length > 0) {
    for (let i = 0; i < text.length; i++) {
      text[i].charCodeAt(0) > d && (d = text[i].charCodeAt(0))
      f = seed / d
      b = (b + text[i].charCodeAt(0) * factor) % seed
    }
  }
  let hex = ((b * text.length) % seed).toString(16)
  hex = padEnd(hex, 6, hex)

  return '#' + hex
}
