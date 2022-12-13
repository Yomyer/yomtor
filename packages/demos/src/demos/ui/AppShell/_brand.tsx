import React from 'react'
import { Group, ActionIcon, Box } from '@mantine/core'
import { Logo } from './_logo'

import { useYomtorColorScheme } from '@yomtor/styles'

export function Brand() {
  const { colorScheme, toggleColorScheme } = useYomtorColorScheme()

  return (
    <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        paddingBottom: theme.spacing.lg,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`
      })}
    >
      <Group position='apart'>
        <Logo colorScheme={colorScheme} />
      </Group>
    </Box>
  )
}
