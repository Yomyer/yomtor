import React from 'react'
import { ArrageIcon, ArrowIcon, LockIcon, HideIcon } from '@yomtor/icons'
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core'

interface MainLinkProps {
  icon: React.ReactNode
  color: string
  label: string
}

function MainLink({ icon, color, label }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0]
        }
      })}
    >
      <Group>
        <ThemeIcon color={color} variant='light'>
          {icon}
        </ThemeIcon>

        <Text size='sm'>{label}</Text>
      </Group>
    </UnstyledButton>
  )
}

const data = [
  {
    icon: <ArrageIcon size={16} />,
    color: 'blue',
    label: 'Pull Requests'
  },
  { icon: <ArrowIcon size={16} />, color: 'teal', label: 'Open Issues' },
  { icon: <LockIcon size={16} />, color: 'violet', label: 'Discussions' },
  { icon: <HideIcon size={16} />, color: 'grape', label: 'Databases' }
]

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />)
  return <div>{links}</div>
}
