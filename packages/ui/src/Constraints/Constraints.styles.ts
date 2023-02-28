import { createStyles } from '@yomtor/styles'
import { ConstraintsProps, ConstraintsType } from './Constraints.props'

export interface ConstraintsStylesParams {
  vertical: ConstraintsType
  horizontal: ConstraintsType
}

export default createStyles(
  (theme, { vertical, horizontal }: ConstraintsStylesParams) => {
    return {
      root: {
        width: 64,
        height: 64,
        border: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[4]
        }`,
        flexDirection: 'column',
        display: 'flex',
        position: 'relative',
        borderRadius: theme.radius.sm
      },
      outer: {
        flex: '0 0 auto',
        height: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      inner: {},
      vertical: {
        flex: '0 0 25px',
        height: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      horizontal: {},
      target: {},
      verticalHandler: {
        flex: '0 0 auto',
        height: 8,
        width: 3,
        backgroundColor: 'red'
      },
      horizontalHandler: {}
    }
  }
)
