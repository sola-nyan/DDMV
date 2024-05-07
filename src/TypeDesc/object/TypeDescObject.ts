import { TypeDesc, type TypeMeta } from '../core/TypeDesc'
import { ValidationResultContext } from '~/Validator/ValidationResultContext'

export interface DDMVModel { [k: string]: TypeDesc<any, any, any> }
export type DDMVModelInput<T extends TypeDesc<any, any, any>> = T['_input']
export type DDMVModelOutput<T extends TypeDesc<any, any, any>> = T['_output']

type Unwrap<T> = T
type DDMVModelInputType<
  RawModel extends DDMVModel,
> = Unwrap<{ [k in keyof RawModel]: RawModel[k]['_input'] }>
type DDMVModelOutputType<
  RawModel extends DDMVModel,
> = Unwrap<{ [k in keyof RawModel]: RawModel[k]['_output'] }>

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
  public validateInternal(parentCtx: ValidationResultContext, parentPropKey: string, input: Input) {
    const model = this._meta!.DDMV()
    const keys = Object.keys(model)
    for (const thisKey of keys) {
      const thisProp = model[thisKey]
      const thisPropKey = parentPropKey ? `${parentPropKey}.${thisKey}` : thisKey
      const thisPropVal = (input as any)[thisKey]
      const thisCtx = new ValidationResultContext<Input>(parentCtx.getInput())
      const res = thisProp.validate(thisPropVal, thisPropKey, thisCtx)
      // Input mapping (Terminal node only)
      if (!(thisProp instanceof TypeDescObject)) {
        if (res.valid)
          thisCtx.mapping(thisPropKey, thisPropVal)
        else
          thisCtx.mapping(thisPropKey, undefined)
      }
      parentCtx.mergeContext(thisCtx)
    }
    return true
  }

  public static create<T extends DDMVModel>(model: T) {
    return new TypeDescObject({
      DDMV: () => model,
    })
  }
}
