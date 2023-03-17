import { useMantineTheme } from '@mantine/styles'
import React, { useContext, useEffect } from 'react'
import { attachFunctions } from './functions/attach-functions'
import { YomtorTheme, YomtorThemeOverride } from './types'

export const Overwrite = ({ theme }: { theme: YomtorThemeOverride }) => {
  Object.assign(useMantineTheme(), theme)
  Object.assign(useMantineTheme(), attachFunctions(useMantineTheme()))

  return <></>
}
