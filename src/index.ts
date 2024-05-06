import type { output } from './TypeDesc'
import { TypeDescObject } from './TypeDesc/object/TypeDescObject'
import type { TypeMetaString } from './TypeDesc/string/TypeDescString'
import { TypeDescString } from './TypeDesc/string/TypeDescString'

export const h = {
  string: (meta?: TypeMetaString) => TypeDescString.create(meta),
}

const DDMV = TypeDescObject.create

export { DDMV }
export type { output as ModelRawType }
