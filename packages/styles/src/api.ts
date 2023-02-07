export {
  useComponentDefaultProps,
  ColorSchemeProvider,
  GlobalStyles,
  NormalizeCSS,
  // extractSystemStyles,
  useMantineColorScheme as useYomtorColorScheme,
  useMantineTheme as useYomtorTheme,
  MANTINE_SIZES as YOMTOR_SIZES
} from '@mantine/styles'

export type {
  ColorScheme,
  DefaultProps,
  Sx,
  ClassNames,
  Styles,
  CSSObject,
  Tuple,
  MantineStyleSystemProps as YomtorStyleSystemProps,
  MantineStyleSystemSize as YomtorStyleSystemSize,
  MantineNumberSize as YomtorNumberSize,
  MantineSize as YomtorSize,
  MantineSizes as YomtorSizes,
  MantineThemeOther as YomtorThemeOther,
  MantineGradient as YomtorGradient
} from '@mantine/styles'

export type { EmotionCache, Selectors, UseStylesOptions } from '@mantine/styles'

export {
  keyframes,
  createStyles,
  Global,
  useCss,
  useEmotionCache,
  defaultMantineEmotionCache as defaultYomtorEmotionCache,
  createEmotionCache
} from '@mantine/styles'
