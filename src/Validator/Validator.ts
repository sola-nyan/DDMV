export const VALIDATE_PATTERN = {
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
}

export function ValidatorUtil(
    patternPicker: string | ((p: typeof VALIDATE_PATTERN) => string),
    input: any,
    param: any,
    onError?: (patternId: string) => void,
): boolean {
    const patternId = patternPicker instanceof Function ? patternPicker(VALIDATE_PATTERN) : patternPicker
    const res = Validator(patternId, input, param)
    if (!res && onError)
        onError(patternId)
    return res
}

export class ValidationError extends Error {
    private inputValue: any
    constructor(inputValue?: any) {
        super()
        this.name = 'ValidationError'
        this.inputValue = inputValue
    }

    public getInputValue() {
        return this.inputValue
    }
}

function Validator(patternId: string, input: any, param: any) {
    switch (patternId) {
        /**
         * String関連.
         */
        case VALIDATE_PATTERN.STRING.REQUIRED:
            return stringRequired(input, param)

        case VALIDATE_PATTERN.STRING.MAX_LENGTH:
            return stringMaxLength(input, param)

        case VALIDATE_PATTERN.STRING.MIN_LENGTH:
            return stringMinLength(input, param)
        /**
         * Number関連.
         */
        case VALIDATE_PATTERN.NUMBER.PARSE:
            return numberParse(input)

        case VALIDATE_PATTERN.NUMBER.REQUIRED:
            return numberRequired(input, param)

        case VALIDATE_PATTERN.NUMBER.MAX_RANGE:
            return numberMaxRange(input, param)

        case VALIDATE_PATTERN.NUMBER.MIN_RANGE:
            return numberMinRange(input, param)
        default:
            throw new Error(`ValiateUtil: Pattern [${patternId}] is not exists`)
    }
}

/**
 * 汎用
 */
function empty(input: any) {
    return input === undefined || input === ''
}

/**
 * String関連.
 */
function stringRequired(input: string, param: boolean) {
    if (!param)
        return true
    return !!((input && input.trim().length > 0))
}

function stringMaxLength(input: string, param: number) {
    if (empty(input) || empty(param))
        return true
    return (input.length <= param)
}

function stringMinLength(input: string, param: number) {
    if (empty(input) || empty(param))
        return true
    return (input.length >= param)
}

/**
 * Number関連.
 */
function numberParse(input: any) {
    if (input === undefined || input === '' || typeof input === 'number')
        return true
    if (typeof input !== 'string')
        return false
    return !Number.isNaN(Number(input))
}

function numberRequired(input: number, param: boolean) {
    if (!param)
        return true
    return !!(input)
}

function numberMaxRange(input: number, param: number) {
    if (empty(input) || empty(param))
        return true
    return (Number(input) <= Number(param))
}

function numberMinRange(input: number, param: number) {
    if (empty(input) || empty(param))
        return true
    return (Number(input) >= Number(param))
}
