import { updateBarrel } from './update-barrel'
import path from 'path'

test('update-barrel', async () => {
  const be = [
    './Button.demo.compact',
    './Button.demo.configurator',
    './Sub.demo.compact',
    './Sub.demo.configurator'
  ]
  expect(
    await updateBarrel(path.join(__dirname, 'mocks'), {
      ignore: '*.stories.*',
      find: '*'
    })
  ).toStrictEqual(be)
})
