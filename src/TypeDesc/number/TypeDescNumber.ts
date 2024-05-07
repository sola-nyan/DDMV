import type { TypeMeta } from '../core/TypeDesc'
import { TypeDesc } from '../core/TypeDesc'
import type { ValidationResultContext } from '~/Validator/ValidationResultContext'

export interface TypeMetaNumber extends TypeMeta {
    number?: {
        maxRange?: number
    }
}

export class TypeDescNumber extends TypeDesc<number, TypeMetaNumber, string | number> {
    public validateInternal(ctx: ValidationResultContext, prop: string, input: string) {
        if (this._meta?.number?.maxRange && Number(input) > this._meta?.number.maxRange)
            return ctx.addError('number.maxRange', prop, this._meta!.label)
        return true
    }

    static create(meta: TypeMetaNumber = {}) {
        return new TypeDescNumber(meta)
    }
}
