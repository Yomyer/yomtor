import { EmotionCache } from '@emotion/cache'
import createEmotionServer from '@emotion/server/create-instance'
import { defaultYomtorEmotionCache } from '@yomtor/styles'

export function createStylesServer(cache?: EmotionCache) {
  return createEmotionServer(cache || defaultYomtorEmotionCache)
}
