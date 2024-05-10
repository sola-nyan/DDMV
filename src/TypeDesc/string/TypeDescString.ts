import type { TypeMeta, ValidationErrorThrower } from '../object/TypeDescObject'
import { TypeDesc } from '../object/TypeDescObject'
import { UnsafeValidatorCaller, V_RULE } from '~/Utils/ValidLogicCaller'
import { tryParseString } from '~/Utils/TryParse'

export interface TypeMetaString extends TypeMeta {
    string?: {
        required?: boolean
        maxLength?: number
        minLength?: number
    }
}

export class TypeDescString extends TypeDesc<string, TypeMetaString, string> {
    protected tryParse(property: string | undefined, input: string) {
        return tryParseString(input, { property, label: this._meta?.label })
    }

    protected validateInternal(property: string | undefined, parsed: string, validationErrorThrower: ValidationErrorThrower) {
        /**
         * 必須
         */
        UnsafeValidatorCaller(
            V_RULE.STRING.REQUIRED,
            parsed,
            this._meta?.string?.required,
            validationErrorThrower,
        )

        /**
         * 最大文字長
         */
        UnsafeValidatorCaller(
            V_RULE.STRING.MAX_LENGTH,
            parsed,
            this._meta?.string?.maxLength,
            validationErrorThrower,
        )

        /**
         * 最小文字長
         */
        UnsafeValidatorCaller(
            V_RULE.STRING.MIN_LENGTH,
            parsed,
            this._meta?.string?.minLength,
            validationErrorThrower,
        )

        return true
    }

    static create(meta: TypeMetaString = {}) {
        return new TypeDescString(meta)
    }
}
