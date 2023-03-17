type YomtorDemoControlType =
  | 'boolean'
  | 'color'
  | 'select'
  | 'string'
  | 'size'
  | 'number'
  | 'segmented'

export type PropsType<T = unknown> = {
  toString: () => {}
  props: string
} & T

interface MantineDemoControlProps {
  type: YomtorDemoControlType
  name: string
  label?: string
  initialValue?: any
  defaultValue?: any
  capitalize?: boolean
  data?: { label: string; value: string }[]
  min?: number
  max?: number
  step?: number
}

interface YomtorDemoBase {
  component?: React.FC
  wrapper?: React.FC<{ children: React.ReactNode }>
  code?: string
  background?: (colorScheme: 'light' | 'dark') => string
}

interface YomtorCodeDemo extends YomtorDemoBase {
  type: 'demo'
  demoProps?: {
    spacing?: boolean
    demoBackground?: string
    toggle?: boolean
    githubLink?: string
    inline?: boolean
  }
}

interface YomtorConfiguratorDemo extends YomtorDemoBase {
  type: 'configurator'
  codeTemplate(props: PropsType, children?: string): string
  configurator?: MantineDemoControlProps[]
  configuratorProps?: {
    previewBackground?: string
    multiline?: boolean | number
    includeCode?: boolean
    filter?: string[]
    center?: boolean
  }
}

export type YomtorDemo = YomtorCodeDemo | YomtorConfiguratorDemo
