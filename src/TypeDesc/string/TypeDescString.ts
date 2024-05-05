import { TypeDesc, TypeMeta } from "../"

export interface TypeMetaString extends TypeMeta {
    maxLength?: number
    minLength?: number
}

export class TypeDescString extends TypeDesc<string, TypeMetaString, string> {
    static create(meta: TypeMetaString = {}) {
        return new TypeDescString(meta)
    }
}

