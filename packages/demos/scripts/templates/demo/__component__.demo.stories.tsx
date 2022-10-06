import { storiesOf } from '@storybook/react'
import { attachDemos } from '../../../attach-demos'
import * as demos from './index'

attachDemos(
  storiesOf('UI/__folder__(pascalCase)/__component__(pascalCase)', module),
  demos
)
