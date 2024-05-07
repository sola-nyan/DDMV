import { TypeDesc } from '../object/TypeDescObject'
import type { TypeMetaString } from './TypeDescString'
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
        if (this._meta?.array?.maxLength && this._meta.array.maxLength < input.length) {
            ctx.addError('array.maxLength', prop, this._meta.label)
            return { valid: false, parsed: input }
        }

        for (const idx in input) {
            if (this._meta?.string?.maxLength && this._meta.string.maxLength < input[idx].length) {
                if (this._meta.array?.reportIndex !== 'only')
                    ctx.addError('string.maxLength', `${prop}`, this._meta.label)
                if (this._meta.array?.reportIndex === true)
                    ctx.addError('string.maxLength', `${prop}[${idx}]`, this._meta.label)

                return { valid: false, parsed: input }
            }
        }

        return { valid: true, parsed: input }
    }

    static create(meta: TypeMetaArrayString = {}) {
        return new TypeDescArrayString(meta)
    }
}
