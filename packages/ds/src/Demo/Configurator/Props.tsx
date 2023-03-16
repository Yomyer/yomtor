export type PropsType<T = unknown> = {
  toString: () => {}
  props: string
} & T

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
        return target.toString()
      }
    }
  )
}
export default Props
