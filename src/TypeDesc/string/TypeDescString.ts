import type { TypeMeta } from '../object/TypeDescObject'
import { TypeDesc } from '../object/TypeDescObject'
import { ValidatorUtil } from '~/Validator/Validator'
import type { ValidationResultContext } from '~/Validator/ValidationResultContext'

export interface TypeMetaString extends TypeMeta {
    string?: {
        required?: boolean
        maxLength?: number
        minLength?: number
    }
}

export class TypeDescString extends TypeDesc<string, TypeMetaString, string> {
    protected convertIO(input: string | undefined) {
        return input ? String(input) : undefined
    }

    public validateInternal(ctx: ValidationResultContext, prop: string, input: any) {
        const ErrorApplier = (patternId: string) => {
            ctx.addError(patternId, prop, this._meta?.label)
        }

        /**
         * 必須
         */
        ValidatorUtil(
            RULE => RULE.STRING.REQUIRED,
            input,
            this._meta?.string?.required,
            ErrorApplier,
        )

        /**
         * 最大文字長
         */
        ValidatorUtil(
            RULE => RULE.STRING.MAX_LENGTH,
            input,
            this._meta?.string?.maxLength,
            ErrorApplier,
        )

        /**
         * 最小文字長
         */
        ValidatorUtil(
            RULE => RULE.STRING.MIN_LENGTH,
            input,
            this._meta?.string?.minLength,
            ErrorApplier,
        )

        return { valid: true, parsed: input }
    }

    static create(meta: TypeMetaString = {}) {
        return new TypeDescString(meta)
    }
}
