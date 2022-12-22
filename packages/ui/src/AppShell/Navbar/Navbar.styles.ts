import { createStyles } from '@yomtor/styles'
import { NavbarProps } from './Navbar.props'

export default createStyles((theme, {}: NavbarProps) => ({
  root: {},
  handler: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 10,
    background: 'red',
    opacity: 0.2,
    right: 0,
    transform: 'translateX(5px)'
  }
}))
