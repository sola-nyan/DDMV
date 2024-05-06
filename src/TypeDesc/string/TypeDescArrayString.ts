import { TypeDesc } from '../core/TypeDesc'
import type { TypeMetaString } from './TypeDescString'
import type { ValidationResultContext } from '~/Validator/ValidationResultContext'

export interface TypeMetaArrayString extends TypeMetaString {
    array?: {
        maxLength?: number
        reportIndex?: true | 'only'
    }
}

export class TypeDescArrayString extends TypeDesc<string[], TypeMetaArrayString, string[]> {
    public validateInternal(ctx: ValidationResultContext, input: string[], prop?: string) {
        if (this._meta?.array?.maxLength && this._meta.array.maxLength < input.length)
            return ctx.addError('array.maxLength', prop, this._meta.label)

        for (const idx in input) {
            if (this._meta?.string?.maxLength && this._meta.string.maxLength < input[idx].length) {
                if (this._meta.array?.reportIndex !== 'only')
                    ctx.addError('string.maxLength', `${prop}`, this._meta.label)
                if (this._meta.array?.reportIndex === true)
                    ctx.addError('string.maxLength', `${prop}[${idx}]`, this._meta.label)

                return false
            }
        }

        return true
    }

    static create(meta: TypeMetaArrayString = {}) {
        return new TypeDescArrayString(meta)
    }
}
