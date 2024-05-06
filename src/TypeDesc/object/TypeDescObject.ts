import { TypeDesc, type TypeMeta } from '../core/TypeDesc'
import type { ValidationResultContext } from '~/Validator/ValidationResultContext'

type Unwrap<T> = T
interface DDMVModel { [k: string]: TypeDesc<any, any, any> }
type DDMVModelInputType<
  RawModel extends DDMVModel,
> = Unwrap<{ [k in keyof RawModel]: RawModel[k]['_input'] }>
type DDMVModelOutputType<
  RawModel extends DDMVModel,
> = Unwrap<{ [k in keyof RawModel]: RawModel[k]['_output'] }>

export type DDMVModelInput<T extends TypeDesc<any, any, any>> = T['_input']
export type DDMVModelOutput<T extends TypeDesc<any, any, any>> = T['_output']

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
