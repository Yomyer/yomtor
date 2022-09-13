import { cloneDeep, mergeWith, isArray, isEqual, uniqWith } from 'lodash'

export const mergeObjects = (...objects: any[]) => {
    if (objects.length === 1) {
        objects.push(cloneDeep(objects[0]))
    }

    return mergeWith({}, ...objects, (obj: object, src: object): object => {
        if (isArray(obj)) {
            return uniqWith(obj.concat(src), isEqual)
        }
    })
}
