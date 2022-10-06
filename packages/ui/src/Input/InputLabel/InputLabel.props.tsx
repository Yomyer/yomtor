import { InputLabelProps as BaseInputLabelInput } from '@mantine/core'

export type InputLabelProps = BaseInputLabelInput & {
  position: 'start' | 'center' | 'end'
  below: boolean
}
