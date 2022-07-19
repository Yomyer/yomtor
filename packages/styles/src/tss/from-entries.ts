export function fromEntries(entries: object) {
    const o: object = {}

    Object.keys(entries).forEach((key) => {
        const [k, v] = entries[key]
        o[k] = v
    })

    return o
}
