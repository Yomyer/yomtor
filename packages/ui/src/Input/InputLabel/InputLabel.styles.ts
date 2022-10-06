import { createStyles } from '@yomtor/styles'
import { InputLabelProps } from './InputLabel.props'

export default createStyles((theme, { below, position }: InputLabelProps) => ({
  label: {
    order: below && 1
  },
  required: {}
}))
