import type { DDMVModel, TypeMeta, objectInputType, objectOutputType } from '../'
import { TypeDesc } from '../'

// const objectKeys: ObjectConstructor['keys']
//   = typeof Object.keys === 'function'
//     ? (obj: any) => Object.keys(obj)
//     : (object: any) => {
//         const keys = []
//         for (const key in object) {
//           if (Object.prototype.hasOwnProperty.call(object, key))
//             keys.push(key)
//         }
//         return keys
//       }

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
  public validate(input: any): any {
    if (input instanceof Object === false)
      return false

    const model = this._meta!.DDMV()
    const keys = Object.keys(model)

    for (const key of keys) {
      const prop = model[key]
      const res = prop.validate(input[key])
      console.log(res)
    }

    return true
  }

  public static create<T extends DDMVModel>(model: T) {
    return new TypeDescObject({
      DDMV: () => model,
    })
  }
}
