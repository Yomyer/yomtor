import { createStyles } from '@yomtor/styles'
import { ControlProps } from './Control.props'

export interface ControlStylesParams {}

export default createStyles((theme, {}: ControlStylesParams) => ({
  root: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]
    }`,
    padding: '8px 0',
    '&:last-of-type': {
      borderBottom: 'none'
    }
  }
}))
