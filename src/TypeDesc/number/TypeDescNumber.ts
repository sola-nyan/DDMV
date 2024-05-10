import type { TypeMeta, ValidationErrorThrower } from '../object/TypeDescObject'
import { TypeDesc } from '../object/TypeDescObject'
import { UnsafeValidatorCaller, V_RULE } from '~/Utils/ValidLogicCaller'
import { tryParseNumber } from '~/Utils/TryParse'

export interface TypeMetaNumber extends TypeMeta {
    number?: {
        required?: boolean
        maxRange?: number
        minRange?: number
    }
}

export class TypeDescNumber extends TypeDesc<number, TypeMetaNumber, string | number> {
    protected tryParse(property: string | undefined, input: string) {
        return tryParseNumber(input, { property, label: this._meta?.label })
    }

    protected validateInternal(property: string | undefined, parsed: number, validationErrorThrower: ValidationErrorThrower) {
        /**
         * 必須.
         */
        UnsafeValidatorCaller(
            V_RULE.NUMBER.REQUIRED,
            parsed,
            this._meta?.number?.required,
            validationErrorThrower,
        )

        /**
         * 最大値
         */
        UnsafeValidatorCaller(
            V_RULE.NUMBER.MAX_RANGE,
            parsed,
            this._meta?.number?.maxRange,
            validationErrorThrower,
        )

        /**
         * 最小値
         */
        UnsafeValidatorCaller(
            V_RULE.NUMBER.MIN_RANGE,
            parsed,
            this._meta?.number?.minRange,
            validationErrorThrower,
        )

        return true
    }

    static create(meta: TypeMetaNumber = {}) {
        return new TypeDescNumber(meta)
    }
}
