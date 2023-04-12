import { sampleSize } from 'lodash'
import { useRef } from 'react'

export const useHash = () => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  const hash = useRef<string>(sampleSize(characters, 6).join(''))

  return hash.current
}
