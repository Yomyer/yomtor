import { isString } from 'lodash'

function clamp(value: number, min = 0, max = 1) {
    return Math.min(Math.max(min, value), max)
}

export function hexToRgb(color: string): string {
    color = color.substr(1)

    const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g')
    let colors = color.match(re)

    if (colors && colors[0].length === 1) {
        colors = colors.map((n: string) => n + n)
    }

    return colors
        ? `rgb${colors.length === 4 ? 'a' : ''}(${colors
              .map((n: string, index: number) => {
                  return index < 3
                      ? parseInt(n, 16)
                      : Math.round((parseInt(n, 16) / 255) * 1000) / 1000
              })
              .join(', ')})`
        : ''
}

function intToHex(int: number) {
    const hex = int.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
}

export function rgbToHex(color: string): string {
    if (color.indexOf('#') === 0) {
        return color
    }

    const { values } = decomposeColor(color)
    return `#${(values || []).map((n: number) => intToHex(n)).join('')}`
}

export function hslToRgb(color: DecomposedColor | string): string {
    color = decomposeColor(color)
    const { values } = color
    const h = values[0]
    const s = +values[1] / 100
    const l = +values[2] / 100
    const a = s * Math.min(l, 1 - l)
    const f = (n: number, k = (n + +h / 30) % 12) =>
        l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)

    let type = 'rgb'
    const rgb = [
        Math.round(f(0) * 255),
        Math.round(f(8) * 255),
        Math.round(f(4) * 255)
    ]

    if (color.type === 'hsla') {
        type += 'a'
        rgb.push(+values[3])
    }

    return recomposeColor({ type, values: rgb })
}

export type DecomposedColor = {
    type?: string
    values?: (number | string)[]
    colorSpace?: string
}

export function decomposeColor(
    color: DecomposedColor | string
): DecomposedColor {
    if (!isString(color)) {
        return color
    }

    if (color.charAt(0) === '#') {
        return decomposeColor(hexToRgb(color))
    }

    const marker = color.indexOf('(')
    const type = color.substring(0, marker)

    if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(type) === -1) {
        throw new Error(
            `Unsupported ${color} color. The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
        )
    }

    const value = color.substring(marker + 1, color.length - 1)
    let parts!: string[]
    let colorSpace

    if (type === 'color') {
        parts = value.split(' ')
        colorSpace = parts.shift()
        if (parts.length === 4 && parts[3].charAt(0) === '/') {
            parts[3] = parts[3].substr(1)
        }
        if (
            [
                'srgb',
                'display-p3',
                'a98-rgb',
                'prophoto-rgb',
                'rec-2020'
            ].indexOf(colorSpace) === -1
        ) {
            throw new Error(
                `Material-UI: unsupported ${colorSpace} color space. The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`
            )
        }
    } else {
        parts = value.split(',')
    }
    const values = parts.map((value: string) => parseFloat(value))

    return { type, values, colorSpace }
}

export function recomposeColor(color: DecomposedColor): string {
    const { type, colorSpace } = color
    let { values } = color
    let parts: string[]
    let response: string

    if (type.indexOf('rgb') !== -1) {
        // Only convert the first 3 values to int (i.e. not alpha)
        values = values.map((n: number, i: number) =>
            i < 3 ? parseInt(n.toString(), 10) : n
        )
    } else if (type.indexOf('hsl') !== -1) {
        parts[1] = `${values[1]}%`
        parts[2] = `${values[2]}%`
    }
    if (type.indexOf('color') !== -1) {
        response = `${colorSpace} ${values.join(' ')}`
    } else {
        response = `${values.join(', ')}`
    }

    return `${type}(${response})`
}

export function getContrastRatio(
    foreground: string,
    background: string
): number {
    const lumA = getLuminance(foreground)
    const lumB = getLuminance(background)
    return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05)
}

export function getLuminance(color: DecomposedColor | string): number {
    color = decomposeColor(color)

    let rgb =
        color.type === 'hsl'
            ? decomposeColor(hslToRgb(color)).values
            : color.values
    rgb = rgb.map((val: number) => {
        if (!isString(color) && color.type !== 'color') {
            val /= 255
        }
        return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4
    })

    return Number(
        (0.2126 * +rgb[0] + 0.7152 * +rgb[1] + 0.0722 * +rgb[2]).toFixed(3)
    )
}

export function emphasize(color: string, coefficient = 0.15): string {
    return getLuminance(color) > 0.5
        ? darken(color, coefficient)
        : lighten(color, coefficient)
}

export function alpha(color: string | DecomposedColor, value: number): string {
    color = decomposeColor(color)
    value = clamp(value)

    if (color.type === 'rgb' || color.type === 'hsl') {
        color.type += 'a'
    }
    if (color.type === 'color') {
        color.values[3] = `/${value}`
    } else {
        color.values[3] = value
    }

    return recomposeColor(color)
}

export function darken(
    color: string | DecomposedColor,
    coefficient = 0.2 * 1.5
): string {
    color = decomposeColor(color)
    coefficient = clamp(coefficient)

    if (color.type.indexOf('hsl') !== -1) {
        color.values[2] = +color.values[2] * 1 - coefficient
    } else if (
        color.type.indexOf('rgb') !== -1 ||
        color.type.indexOf('color') !== -1
    ) {
        for (let i = 0; i < 3; i += 1) {
            color.values[i] = +color.values[i] * 1 - coefficient
        }
    }
    return recomposeColor(color)
}

export function lighten(
    color: string | DecomposedColor,
    coefficient = 0.2
): string {
    color = decomposeColor(color)
    coefficient = clamp(coefficient)

    if (color.type.indexOf('hsl') !== -1) {
        color.values[2] =
            +color.values[2] + (100 - +color.values[2]) * coefficient
    } else if (color.type.indexOf('rgb') !== -1) {
        for (let i = 0; i < 3; i += 1) {
            color.values[i] =
                +color.values[i] + (255 - +color.values[i]) * coefficient
        }
    } else if (color.type.indexOf('color') !== -1) {
        for (let i = 0; i < 3; i += 1) {
            color.values[i] =
                +color.values[i] + (1 - +color.values[i]) * coefficient
        }
    }

    return recomposeColor(color)
}
