import { YomtorSizes } from '@yomtor/styles'

type YomtorStyleSystemValue = YomtorSizes | (string & {})

export interface YomtorStyleSystemProps {
    m?: YomtorStyleSystemValue
    my?: YomtorStyleSystemValue
    mx?: YomtorStyleSystemValue
    mt?: YomtorStyleSystemValue
    mb?: YomtorStyleSystemValue
    ml?: YomtorStyleSystemValue
    mr?: YomtorStyleSystemValue

    p?: YomtorStyleSystemValue
    py?: YomtorStyleSystemValue
    px?: YomtorStyleSystemValue
    pt?: YomtorStyleSystemValue
    pb?: YomtorStyleSystemValue
    pl?: YomtorStyleSystemValue
    pr?: YomtorStyleSystemValue
}

export type YomtorSystemSize = keyof YomtorStyleSystemProps
