import { DefaultProps } from '@yomtor/styles'

export interface SelectItemProps extends DefaultProps {
  label?: string
  value?: string
  right?: string
  selected?: string
}
