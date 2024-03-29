import '@mantine/styles'
import type {
  DefaultYomtorColor,
  YomtorTheme,
  CSSObject,
  VariantOutput as YomtorVariantOutput
} from '@yomtor/styles/src'

declare module '@mantine/styles' {
  export declare function useMantineTheme(): YomtorTheme
  export type Sx = CSSObject | ((theme: YomtorTheme) => CSSObject)
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
