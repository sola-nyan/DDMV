import type { DDMVModel, DDMVModelInputType, DDMVModelOutputType, TypeMeta } from '../'
import { TypeDesc } from '../'
import type { ValidationResultContext } from '~/Utils/ValidationResultHelper'

export interface TypeMetaObject<
  T extends DDMVModel = DDMVModel,
> extends TypeMeta {
  DDMV: () => T
}

export class TypeDescObject<
  T extends DDMVModel,
  Output = DDMVModelOutputType<T>,
  Input = DDMVModelInputType<T>,
>
  extends TypeDesc<
    Output,
    TypeMetaObject<T>,
    Input
  > {
  public validateInternal(ctx: ValidationResultContext, input: Input, parentPropKey?: string) {
    const model = this._meta!.DDMV()
    const keys = Object.keys(model)

    for (const thisKey of keys) {
      const thisProp = model[thisKey]
      const thisPropKey = parentPropKey ? `${parentPropKey}.${thisKey}` : thisKey
      const thisPropVal = (input as any)[thisKey]
      thisProp.validate(thisPropVal, thisPropKey, ctx)
    }

    return true
  }

  public static create<T extends DDMVModel>(model: T) {
    return new TypeDescObject({
      DDMV: () => model,
    })
  }
}
