export const VALIDATE_PATTERN = {
    STRING: {
        REQUIRED: 'string.required',
        MAX_LENGTH: 'string.maxLength',
        MIN_LENGTH: 'string.minLength',
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

function Validator(patternId: string, input: any, param: any) {
    switch (patternId) {
        case VALIDATE_PATTERN.STRING.REQUIRED:
            return stringRequired(input, param)

        case VALIDATE_PATTERN.STRING.MAX_LENGTH:
            return stringMaxLength(input, param)

        case VALIDATE_PATTERN.STRING.MIN_LENGTH:
            return stringMinLength(input, param)

        default:
            throw new Error(`ValiateUtil: Pattern [${patternId}] is not exists`)
    }
}

function stringRequired(input: string, param: boolean) {
    if (!param)
        return true
    return !!((input && input.trim().length > 0))
}

function stringMaxLength(input: string, param: number) {
    if (!input || !param)
        return true
    return (input.length <= param)
}

function stringMinLength(input: string, param: number) {
    if (!input || !param)
        return true
    return (input.length >= param)
}
