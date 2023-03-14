import { createStyles, YomtorTheme, CSSObject } from '@yomtor/styles'
import { transform } from 'lodash'
import { ConstraintsProps, ConstraintPositions } from './Constraints.props'

export interface ConstraintsStylesParams {
  vertical: ConstraintPositions
  horizontal: ConstraintPositions
  verticalHover: ConstraintPositions
  horizontalHover: ConstraintPositions
}

const getVerticalHover = (theme: YomtorTheme): CSSObject => ({
  '&:before': {
    content: '""',
    position: 'absolute',
    background: theme.colors.primary[5],
    top: -2,
    bottom: -2,
    width: 12,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: -1,
    opacity: 0.2
  }
})
const getHorizontalHover = (theme: YomtorTheme): CSSObject => ({
  '&:before': {
    content: '""',
    position: 'absolute',
    background: theme.colors.primary[5],
    left: -2,
    right: -2,
    height: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: -1,
    opacity: 0.2
  }
})

const getVerticalActive = (theme: YomtorTheme): CSSObject => ({
  backgroundColor: theme.colors.primary[5],
  width: 3
})

const getHorizontalActive = (theme: YomtorTheme): CSSObject => ({
  backgroundColor: theme.colors.primary[5],
  height: 3
})

export default createStyles(
  (
    theme,
    {
      vertical,
      horizontal,
      verticalHover,
      horizontalHover
    }: ConstraintsStylesParams
  ) => {
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
      column: {
        flex: '0 0 25px',
        height: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      row: {
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
        backgroundColor: color,
        position: 'relative'
      },
      horizontalHandler: {
        flex: '0 0 auto',
        height: 1,
        width: 8,
        backgroundColor: color,
        position: 'relative'
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
      },
      top: {
        ...(verticalHover === 'start' &&
          vertical !== 'start' &&
          getVerticalHover(theme)),
        ...(['both', 'start'].includes(vertical) && getVerticalActive(theme))
      },
      bottom: {
        ...(verticalHover === 'end' &&
          vertical !== 'end' &&
          getVerticalHover(theme)),
        ...(['both', 'end'].includes(vertical) && getVerticalActive(theme))
      },
      left: {
        ...(horizontalHover === 'start' &&
          horizontal !== 'start' &&
          getHorizontalHover(theme)),
        ...(['both', 'start'].includes(horizontal) &&
          getHorizontalActive(theme))
      },
      right: {
        ...(horizontalHover === 'end' &&
          horizontal !== 'end' &&
          getHorizontalHover(theme)),
        ...(['both', 'end'].includes(horizontal) && getHorizontalActive(theme))
      },
      horizontal: {
        ...(horizontalHover === 'center' &&
          horizontal !== 'center' &&
          getHorizontalHover(theme)),
        ...(horizontal === 'center' && getHorizontalActive(theme))
      },
      vertical: {
        ...(verticalHover === 'center' &&
          vertical !== 'center' &&
          getVerticalHover(theme)),
        ...(vertical === 'center' && getVerticalActive(theme))
      }
    }
  }
)
