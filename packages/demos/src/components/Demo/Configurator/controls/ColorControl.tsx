import React from 'react'
import {
  Group,
  Input,
  useMantineTheme,
  ColorSwatch,
  CheckIcon
} from '@mantine/core'
import { upperFirst } from '@mantine/hooks'
import { useYomtorTheme, YOMTOR_COLORS } from '@yomtor/styles'
import { DEFAULT_COLORS } from 'packages/styles/src/theme/default-colors'

interface ColorControlProps {
  value: string
  label: string
  onChange(value: string): void
}

export function ColorControl({
  value,
  label,
  onChange,
  ...others
}: ColorControlProps) {
  const theme = useYomtorTheme()

  console.log(theme.colors['warning'][5], theme.colors['warning'][7])

  const colors = YOMTOR_COLORS.map((color) => (
    <ColorSwatch
      color={
        theme.colorScheme === 'dark'
          ? theme.colors[color][7]
          : theme.colors[color][5]
      }
      component='button'
      key={color}
      onClick={() => onChange(color)}
      radius='sm'
      sx={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors[2] : theme.white,
        flex: '1 0 calc(15% - 4px)'
      }}
    >
      {value === color && <CheckIcon width={12} height={12} />}
    </ColorSwatch>
  ))

  return (
    <Input.Wrapper labelElement='div' label={upperFirst(label)} {...others}>
      <Group spacing={2} mt={5}>
        {colors}
      </Group>
    </Input.Wrapper>
  )
}

ColorControl.initialValue = 'blue'
