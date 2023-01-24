import React from 'react'
import {
  Group,
  Input,
  useMantineTheme,
  ColorSwatch,
  CheckIcon
} from '@mantine/core'
import { upperFirst } from '@mantine/hooks'
import { DEFAULT_THEME, useYomtorTheme, YOMTOR_COLORS } from '@yomtor/styles'

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

  const colors = Object.keys(DEFAULT_THEME.colors).map((color) => (
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
        color:
          theme.colorScheme === 'dark' ? theme.colors[color][2] : theme.white,
        flex: '0 1 calc(12% - 4px)'
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

ColorControl.initialValue = ''
