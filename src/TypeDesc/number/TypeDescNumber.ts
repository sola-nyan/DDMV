import type { TypeMeta } from '../object/TypeDescObject'
import { TypeDesc } from '../object/TypeDescObject'
import type { ValidationResultContext } from '~/Validator/ValidationResultContext'

export interface TypeMetaNumber extends TypeMeta {
    number?: {
        maxRange?: number
    }
}

export class TypeDescNumber extends TypeDesc<number, TypeMetaNumber, string | number> {
    public convertIO(input: string | number): number {
        return Number(input)
    }

    public validateInternal(ctx: ValidationResultContext, prop: string, input: number) {
        if (this._meta?.number?.maxRange && Number(input) > this._meta?.number.maxRange)
            return ctx.addError('number.maxRange', prop, this._meta!.label)
        return true
    }

    static create(meta: TypeMetaNumber = {}) {
        return new TypeDescNumber(meta)
    }
}
