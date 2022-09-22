import { updateBarrel } from './update-barrel'

test('update-barrel', () => {
  console.log(updateBarrel(__dirname + '/mocks/*', ['*.stories.*', 'index.*']))
  //expect(updateBarrel('./mocks/*')).toBe('type', 'button')
})
