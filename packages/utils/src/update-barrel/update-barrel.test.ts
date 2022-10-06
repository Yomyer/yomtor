import { updateBarrel } from './update-barrel'

test('update-barrel', async () => {
  const be = [
    './Button.demo.compact',
    './Button.demo.configurator',
    './Sub.demo.compact',
    './Sub.demo.configurator'
  ]
  expect(
    await updateBarrel(__dirname + '/mocks', {
      ignore: '*.stories.*',
      find: '*'
    })
  ).toStrictEqual(be)
})
