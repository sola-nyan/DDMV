import type { ValidationErrorThrower } from '../object/TypeDescObject'
import { TypeDesc } from '../object/TypeDescObject'
import type { TypeMetaString } from './TypeDescString'
import { tryParseArray, tryParseString } from '~/Utils/TryParse'
import { UnsafeValidatorCaller, V_RULE } from '~/Utils/ValidLogicCaller'

export interface TypeMetaArrayString extends TypeMetaString {
    array?: {
        required?: boolean
        maxLength?: number
        minLength?: number
    }
}

export class TypeDescArrayString extends TypeDesc<string[], TypeMetaArrayString, string[]> {
    protected tryParse(property: string | undefined, input: any) {
        const anyArray = tryParseArray(input, { property, label: this._meta?.label })
        if (anyArray === undefined)
            return undefined
        for (const idx in anyArray)
            anyArray[idx] = tryParseString(anyArray[idx], { property, label: this._meta?.label })
        return input
    }

    protected validateInternal(property: string | undefined, parsed: string[], validationErrorThrower: ValidationErrorThrower) {
        /**
         * 配列必須
         */
        UnsafeValidatorCaller(
            V_RULE.ARRAY.REQUIRED,
            parsed,
            this._meta?.array?.required,
            validationErrorThrower,
        )

        /**
         * 最大配列数
         */
        UnsafeValidatorCaller(
            V_RULE.ARRAY.MAX_LENGTH,
            parsed,
            this._meta?.array?.maxLength,
            validationErrorThrower,
        )

        /**
         * 最小配列数
         */
        UnsafeValidatorCaller(
            V_RULE.ARRAY.MIN_LENGTH,
            parsed,
            this._meta?.array?.minLength,
            validationErrorThrower,
        )

        for (const idx in parsed) {
            /**
             * 必須
             */
            UnsafeValidatorCaller(
                V_RULE.STRING.REQUIRED,
                parsed[idx],
                this._meta?.string?.required,
                validationErrorThrower,
            )

            /**
             * 最大文字長
             */
            UnsafeValidatorCaller(
                V_RULE.STRING.MAX_LENGTH,
                parsed[idx],
                this._meta?.string?.maxLength,
                validationErrorThrower,
            )

            /**
             * 最小文字長
             */
            UnsafeValidatorCaller(
                V_RULE.STRING.MIN_LENGTH,
                parsed[idx],
                this._meta?.string?.minLength,
                validationErrorThrower,
            )
        }

        return true
    }

    static create(meta: TypeMetaArrayString = {}) {
        return new TypeDescArrayString(meta)
    }
}
