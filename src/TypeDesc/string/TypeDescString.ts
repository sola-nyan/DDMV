import type { TypeMeta } from '../'
import { TypeDesc } from '../'
import type { ValidationResultContext } from '~/Utils/ValidationResultHelper'

export interface TypeMetaString extends TypeMeta {
    maxLength?: number
    minLength?: number
}

export class TypeDescString extends TypeDesc<string, TypeMetaString, string> {
    public validateInternal(ctx: ValidationResultContext, input: string, prop?: string) {
        if (this._meta?.maxLength && input.length > this._meta?.maxLength)
            return ctx.addError('string.maxLength', prop, this._meta!.label)

        return true
    }

    static create(meta: TypeMetaString = {}) {
        return new TypeDescString(meta)
    }
}
