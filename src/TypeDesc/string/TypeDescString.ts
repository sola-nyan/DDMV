import type { TypeMeta } from '../'
import { TypeDesc } from '../'
import { ValidationResultHelper } from '~/Utils/ValidationResultHelper'

export interface TypeMetaString extends TypeMeta {
    maxLength?: number
    minLength?: number
}

export class TypeDescString extends TypeDesc<string, TypeMetaString, string> {
    public validate(input: string, prop?: string, label?: string) {
        const h = new ValidationResultHelper()
        if (this._meta?.maxLength && input.length > this._meta?.maxLength)
            h.addError('string.maxLength', prop, label)
        return h.getResult()
    }

    static create(meta: TypeMetaString = {}) {
        return new TypeDescString(meta)
    }
}
