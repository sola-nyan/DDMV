import type { TypeMeta } from '../'
import { TypeDesc } from '../'

export interface TypeMetaString extends TypeMeta {
  maxLength?: number
  minLength?: number
}

export class TypeDescString extends TypeDesc<string, TypeMetaString, string> {
  public validate(input: string) {
    if (this._meta?.maxLength && input.length > this._meta?.maxLength)
      return false

    return true
  }

  static create(meta: TypeMetaString = {}) {
    return new TypeDescString(meta)
  }
}
