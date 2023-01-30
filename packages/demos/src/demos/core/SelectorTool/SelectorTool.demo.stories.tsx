import { storiesOf } from '@storybook/react'
import { attachDemos } from '../../../attach-demos'
import * as demos from './index'

attachDemos(storiesOf('Core/SelectorTool', module), demos)
