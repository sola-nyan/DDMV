import { TryParseError } from './ValidErrors'
import { V_RULE } from './ValidLogicCaller'

/**
 * 数値.
 */
export function tryParseNumber(input: any, onFailThrow: false | { property?: string, label?: string } = false) {
    if (input === undefined)
        return undefined
    if (typeof input === 'number')
        return input
    if (typeof input === 'string' && input.trim() === '')
        return undefined
    try {
        const n = Number(input)
        return Number.isNaN(n) ? undefined : n
    }
    catch (e) {
        if (onFailThrow)
            throw new TryParseError(V_RULE.ARRAY.PARSE, onFailThrow?.property, onFailThrow?.label, input)
        return undefined
    }
}

/**
 * 文字.
 */
export function tryParseString(input: any, onFailThrow: false | { property?: string, label?: string } = false) {
    if (input === undefined)
        return undefined
    if (typeof input === 'string')
        return input
    try {
        const s = String(input)
        return s
    }
    catch (e) {
        if (onFailThrow)
            throw new TryParseError(V_RULE.ARRAY.PARSE, onFailThrow?.property, onFailThrow?.label, input)
        return undefined
    }
}

/**
 * 配列.
 */
export function tryParseArray(input: any, onFailThrow: false | { property?: string, label?: string } = false) {
    if (input === undefined)
        return undefined
    try {
        if (!Array.isArray(input))
            throw new Error('Input is not Array')
        return input
    }
    catch (e) {
        if (onFailThrow)
            throw new TryParseError(V_RULE.ARRAY.PARSE, onFailThrow?.property, onFailThrow?.label, input)
        return undefined
    }
}
