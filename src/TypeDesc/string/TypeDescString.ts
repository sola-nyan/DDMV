import { TypeDesc, type TypeMeta } from '../core/TypeDesc'
import { VALIDATE_PATTERN, Validator } from '~/Validator/Validator'
import type { ValidationResultContext } from '~/Validator/ValidationResultContext'

export interface TypeMetaString extends TypeMeta {
    string?: {
        maxLength?: number
        minLength?: number
    }
}

export class TypeDescString extends TypeDesc<string, TypeMetaString, string> {
    public validateInternal(ctx: ValidationResultContext, input: string, prop?: string) {
        Validator(
            ctx,
            VALIDATE_PATTERN.STRING.MAX_LENGTH,
            this._meta?.string?.maxLength,
            input,
            prop,
            this._meta!.label,
        )
        Validator(
            ctx,
            VALIDATE_PATTERN.STRING.MIN_LENGTH,
            this._meta?.string?.minLength,
            input,
            prop,
            this._meta!.label,
        )
        return true
    }

    static create(meta: TypeMetaString = {
        string: {},
    }) {
        return new TypeDescString(meta)
    }
}
