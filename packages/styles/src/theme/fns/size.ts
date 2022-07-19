import { YomtorSizes } from '../../constants'

export type Size = (args: {
    size: YomtorSizes | number
    sizes: Record<YomtorSizes, string | number>
}) => number

export const size = (args: {
    size: YomtorSizes | number
    sizes: Record<YomtorSizes, string | number>
}) => {
    if (!isNaN(+args.size)) {
        return +args.size
    }

    return args.sizes[args.size] || args.size || args.sizes.md
}
