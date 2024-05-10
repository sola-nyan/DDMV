/**
 * 汎用
 */
export function empty(input: any) {
    return input === undefined || input === ''
}

/**
 * String関連.
 */
export function stringRequired(input: string, param: boolean) {
    if (!param)
        return true
    return !!((input && input.trim().length > 0))
}

export function stringMaxLength(input: string, param: number) {
    if (empty(input) || empty(param))
        return true
    return (input.length <= param)
}

export function stringMinLength(input: string, param: number) {
    if (empty(input) || empty(param))
        return true
    return (input.length >= param)
}

/**
 * Number関連.
 */
export function numberRequired(input: number, param: boolean) {
    if (!param)
        return true
    return !!(input)
}

export function numberMaxRange(input: number, param: number) {
    if (empty(input) || empty(param))
        return true
    return (Number(input) <= Number(param))
}

export function numberMinRange(input: number, param: number) {
    if (empty(input) || empty(param))
        return true
    return (Number(input) >= Number(param))
}

/**
 * Array関連.
 */
export function arrayRequired(input: any[], param: boolean) {
    if (!param)
        return true
    return !!(input)
}

export function arrayMaxLength(input: any[], param: number) {
    if (empty(input) || empty(param))
        return true
    return (input.length <= Number(param))
}

export function arrayMinLength(input: any[], param: number) {
    if (empty(input) || empty(param))
        return true
    return (input.length >= Number(param))
}
