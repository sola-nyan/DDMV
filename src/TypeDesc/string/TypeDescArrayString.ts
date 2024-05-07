import { TypeDesc } from '../object/TypeDescObject'
import type { TypeMetaString } from './TypeDescString'
import { ValidatorUtil } from '~/Validator/Validator'
import type { ValidationResultContext } from '~/Validator/ValidationResultContext'

export interface TypeMetaArrayString extends TypeMetaString {
    array?: {
        maxLength?: number
        reportIndex?: true | 'only'
    }
}

export class TypeDescArrayString extends TypeDesc<string[], TypeMetaArrayString, string[]> {
    protected convertIO(input: string[]): string[] {
        return input
    }

    public validateInternal(ctx: ValidationResultContext, prop: string, input: any) {
        // const ArrayErrorReporter = (patternId: string) => {
        //     ctx.addError(patternId, prop, this._meta?.label)
        // }

        // if (this._meta?.array?.maxLength && this._meta.array.maxLength < input.length) {
        //     ctx.addError('array.maxLength', prop, this._meta.label)
        //     return { valid: false, parsed: input }
        // }

        for (const idx in input) {
            const StrigErrorReporter = (patternId: string) => {
                ctx.addError(patternId, prop, this._meta?.label)
                if (this._meta?.array?.reportIndex !== 'only')
                    ctx.addError('string.maxLength', `${prop}`, this._meta?.label)
                if (this._meta?.array?.reportIndex === true)
                    ctx.addError('string.maxLength', `${prop}[${idx}]`, this._meta.label)
            }

            /**
             * 必須
             */
            ValidatorUtil(
                RULE => RULE.STRING.REQUIRED,
                input,
                this._meta?.string?.required,
                StrigErrorReporter,
            )

            /**
             * 最大文字長
             */
            ValidatorUtil(
                RULE => RULE.STRING.MAX_LENGTH,
                input,
                this._meta?.string?.maxLength,
                StrigErrorReporter,
            )

            /**
             * 最小文字長
             */
            ValidatorUtil(
                RULE => RULE.STRING.MIN_LENGTH,
                input,
                this._meta?.string?.minLength,
                StrigErrorReporter,
            )
        }

        return { valid: true, parsed: input }
    }

    static create(meta: TypeMetaArrayString = {}) {
        return new TypeDescArrayString(meta)
    }
}
