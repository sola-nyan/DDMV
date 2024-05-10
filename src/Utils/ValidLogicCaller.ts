import { tryParseArray, tryParseNumber, tryParseString } from './TryParse'
import { arrayMaxLength, arrayMinLength, arrayRequired, numberMaxRange, numberMinRange, numberRequired, stringMaxLength, stringMinLength, stringRequired } from './ValidLogics'

export const V_RULE = {
    STRING: {
        PARSE: 'string.parse',
        REQUIRED: 'string.required',
        MAX_LENGTH: 'string.maxLength',
        MIN_LENGTH: 'string.minLength',
    },
    NUMBER: {
        PARSE: 'number.parse',
        REQUIRED: 'number.required',
        MAX_RANGE: 'number.maxRange',
        MIN_RANGE: 'number.minRange',
    },
    ARRAY: {
        PARSE: 'array.parse',
        REQUIRED: 'array.required',
        MAX_LENGTH: 'array.maxLength',
        MIN_LENGTH: 'array.minLength',
    },
}

export function UnsafeValidatorCaller(
    patternPicker: string | ((p: typeof V_RULE) => string),
    input: any,
    param?: any,
    onError?: (patternId: string, param?: any, input?: any) => void,
): boolean {
    const patternId = patternPicker instanceof Function ? patternPicker(V_RULE) : patternPicker
    const res = Validator(patternId, input, param)
    if (!res && onError)
        onError(patternId, param, input)
    return res
}

function Validator(patternId: string, input: any, param: any) {
    switch (patternId) {
        /**
         * String関連.
         */
        case V_RULE.STRING.PARSE:
            return (tryParseString(input, param) !== undefined)

        case V_RULE.STRING.REQUIRED:
            return stringRequired(input, param)

        case V_RULE.STRING.MAX_LENGTH:
            return stringMaxLength(input, param)

        case V_RULE.STRING.MIN_LENGTH:
            return stringMinLength(input, param)

        /**
         * Number関連.
         */
        case V_RULE.NUMBER.PARSE:
            return (tryParseNumber(input, param) !== undefined)

        case V_RULE.NUMBER.REQUIRED:
            return numberRequired(input, param)

        case V_RULE.NUMBER.MAX_RANGE:
            return numberMaxRange(input, param)

        case V_RULE.NUMBER.MIN_RANGE:
            return numberMinRange(input, param)

        /**
         * Array関連.
         */
        case V_RULE.ARRAY.PARSE:
            return (tryParseArray(input, param) !== undefined)

        case V_RULE.ARRAY.REQUIRED:
            return arrayRequired(input, param)

        case V_RULE.ARRAY.MAX_LENGTH:
            return arrayMaxLength(input, param)

        case V_RULE.ARRAY.MIN_LENGTH:
            return arrayMinLength(input, param)

        /**
         * 未定義エラー.
         */
        default:
            throw new Error(`ValiateUtil: Pattern [${patternId}] is not exists`)
    }
}
