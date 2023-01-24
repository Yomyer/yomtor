import { useMantineTheme } from '@mantine/styles'
import React, { useContext, useEffect } from 'react'
import { attachFunctions } from './functions/attach-functions'

export const Overwrite = () => {
  Object.assign(useMantineTheme(), attachFunctions(useMantineTheme()))

  return <></>
}
