import '@mantine/styles'
import { DefaultYomtorColor, YomtorTheme } from '@yomtor/styles/src'

declare module '@mantine/styles' {
  export declare function createStyles<
    Key extends string = string,
    Params = void,
    Input extends Record<Key, CSSObject> = Record<Key, CSSObject>
  >(
    input:
      | ((
          theme: YomtorTheme,
          params: Params,
          createRef: (refName: string) => string
        ) => Input)
      | Input
  ): (
    params: Params,
    options?: UseStylesOptions<Key>
  ) => {
    classes: { [key in keyof Input]: string }
    cx: (...args: any) => string
    theme: YomtorTheme
  }
}
