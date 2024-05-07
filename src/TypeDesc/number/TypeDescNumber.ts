import type { TypeMeta } from '../object/TypeDescObject'
import { TypeDesc } from '../object/TypeDescObject'
import { ValidationError, ValidatorUtil } from '~/Validator/Validator'
import type { ValidationResultContext } from '~/Validator/ValidationResultContext'

function asNumber(input: any) {
    if (!input === undefined)
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
        return undefined
    }
}

export interface TypeMetaNumber extends TypeMeta {
    number?: {
        parse?: 'Int' | 'Float'
        required?: boolean
        maxRange?: number
        minRange?: number
    }
}

export class TypeDescNumber extends TypeDesc<number, TypeMetaNumber, string | number> {
    public validateInternal(ctx: ValidationResultContext, prop: string, input: any) {
        const ErrorApplier = (patternId: string) => {
            ctx.addError(patternId, prop, this._meta?.label)
            throw new ValidationError()
        }

        /**
         * 数値変換検証.
         */
        ValidatorUtil(
            RULE => RULE.NUMBER.PARSE,
            input,
            undefined,
            ErrorApplier,
        )

        // Numberに変換
        const inputNumber = asNumber(input)

        /**
         * 必須.
         */
        ValidatorUtil(
            RULE => RULE.NUMBER.REQUIRED,
            inputNumber,
            this._meta?.number?.required,
            ErrorApplier,
        )

        /**
         * 最大値
         */
        ValidatorUtil(
            RULE => RULE.NUMBER.MAX_RANGE,
            inputNumber,
            this._meta?.number?.maxRange,
            ErrorApplier,
        )

        /**
         * 最小値
         */
        ValidatorUtil(
            RULE => RULE.NUMBER.MIN_RANGE,
            inputNumber,
            this._meta?.number?.minRange,
            ErrorApplier,
        )

        return { valid: true, parsed: inputNumber }
    }

    static create(meta: TypeMetaNumber = {}) {
        return new TypeDescNumber(meta)
    }
}
