import { createStyles } from '@yomtor/styles'
import { transform } from 'lodash'
import { ConstraintsProps, ConstraintsType } from './Constraints.props'

export interface ConstraintsStylesParams {
  vertical: ConstraintsType
  horizontal: ConstraintsType
}

export default createStyles(
  (theme, { vertical, horizontal }: ConstraintsStylesParams) => {
    const color =
      theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[0]
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
      inner: {
        flex: '1 0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      vertical: {
        flex: '0 0 25px',
        height: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      horizontal: {
        flex: '0 0 auto',
        height: '25px',
        width: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      target: {
        flex: '0 0 auto',
        position: 'relative',
        height: '38px',
        width: '38px',
        border: `1px solid ${color}`,
        borderRadius: '1px'
      },
      verticalHandler: {
        flex: '0 0 auto',
        height: 8,
        width: 1,
        backgroundColor: color
      },
      horizontalHandler: {
        flex: '0 0 auto',
        height: 1,
        width: 8,
        backgroundColor: color
      },
      horizontalCenterHandler: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        flex: '0 0 auto',
        height: 1,
        width: 16,
        backgroundColor: color
      },
      verticalCenterHandler: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        flex: '0 0 auto',
        height: 16,
        width: 1,
        backgroundColor: color
      }
    }
  }
)
