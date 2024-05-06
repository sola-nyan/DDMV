import type { ValidationResultContext } from './ValidationResultContext'

export const VALIDATE_PATTERN = {
    STRING: {
        MAX_LENGTH: 'string.maxLength',
        MIN_LENGTH: 'string.minLength',
    },
}

export function Validator(
    ctx: ValidationResultContext,
    patternId: string,
    param: any,
    input: any,
    prop?: string,
    label?: string,
) {
    switch (patternId) {
        case VALIDATE_PATTERN.STRING.MAX_LENGTH:
            return ctx.apply(stringMaxLength(input, param), patternId, prop, label)
    }
}

function stringMaxLength(input: string, param: number) {
    if (!input || !param)
        return true
    return (input.length <= param)
}
