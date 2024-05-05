import type { DDMVModel, TypeMeta, ValidationResult, objectInputType, objectOutputType } from '../'
import { TypeDesc } from '../'
import { ValidationResultHelper } from '~/Utils/ValidationResultHelper'

export interface TypeMetaObject<
  T extends DDMVModel = DDMVModel,
> extends TypeMeta {
  DDMV: () => T
}

export class TypeDescObject<
  T extends DDMVModel,
  Output = objectOutputType<T>,
  Input = objectInputType<T>,
>
  extends TypeDesc<
    Output,
    TypeMetaObject<T>,
    Input
  > {
  public validate(input: any, prop?: string, label?: string): ValidationResult {
    const h = new ValidationResultHelper()
    if (input instanceof Object === false)
      return h.addError('object.nest_not_supported', prop, label)

    const model = this._meta!.DDMV()
    const keys = Object.keys(model)

    for (const key of keys) {
      const prop = model[key]
      h.merge(prop.validate(input[key], key))
    }

    return h.getResult()
  }

  public static create<T extends DDMVModel>(model: T) {
    return new TypeDescObject({
      DDMV: () => model,
    })
  }
}
