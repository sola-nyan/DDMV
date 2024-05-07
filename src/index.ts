import type { TypeMetaArrayString } from './TypeDesc/string/TypeDescArrayString'
import { TypeDescArrayString } from './TypeDesc/string/TypeDescArrayString'
import type { TypeMetaString } from './TypeDesc/string/TypeDescString'
import { TypeDescString } from './TypeDesc/string/TypeDescString'
import type { TypeMetaNumber } from './TypeDesc/number/TypeDescNumber'
import { TypeDescNumber } from './TypeDesc/number/TypeDescNumber'
import type { DDMVModelInput, DDMVModelOutput } from './TypeDesc/object/TypeDescObject'
import { TypeDescObject } from './TypeDesc/object/TypeDescObject'

export const h = {
  string: (meta?: TypeMetaString) => TypeDescString.create(meta),
  number: (meta?: TypeMetaNumber) => TypeDescNumber.create(meta),
  arrayString: (meta?: TypeMetaArrayString) => TypeDescArrayString.create(meta),
}

const DDMV = TypeDescObject.create
const DTO = DDMV
const Model = DDMV

export { DDMV, DTO, Model }
export type { DDMVModelOutput as InferOutType, DDMVModelInput as InferInType }
