import { isString } from 'lodash'
import { PropsType } from '../types'

const Props = (props: string) => {
  const pattern = /(\w+)=((\{.*?\})|(".*?"))/g

  const obj = {}

  for (const match of props.matchAll(pattern)) {
    const [value, name] = match
    obj[name] = value
  }

  return new Proxy<PropsType>(
    {
      ...obj,
      props,
      toString: () => {
        return props
      }
    },
    {
      get(target, prop) {
        if (prop === 'toString') {
          return function () {
            return target.props
          }
        }
        if (isString(prop)) {
          return target[prop] || ''
        }
      }
    }
  )
}
export default Props
