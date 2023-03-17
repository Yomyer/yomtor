import { useMantineTheme } from '@mantine/styles'
import { pick } from 'lodash'
import React from 'react'
import { attachFunctions } from './functions/attach-functions'
import { YomtorThemeOverride } from './types'

export const Overwrite = ({ theme }: { theme: YomtorThemeOverride }) => {
  Object.assign(useMantineTheme(), pick(theme, ['icons']))
  Object.assign(useMantineTheme(), attachFunctions(useMantineTheme()))
  return <></>
}
