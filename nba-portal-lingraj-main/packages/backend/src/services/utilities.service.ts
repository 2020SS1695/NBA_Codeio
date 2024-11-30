/* eslint-disable @typescript-eslint/no-explicit-any */

type ObjectKeyType = string | number | symbol

// TODO: remove this if not used
export function createReverseMap<
    K extends ObjectKeyType,
    V extends ObjectKeyType
>(obj: Record<K, V>): Record<V, K> {
    const reverseMap: any = {}
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            reverseMap[obj[key]] = key
        }
    }
    return reverseMap
}