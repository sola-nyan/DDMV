import type { ModelRawShape, TypeMeta, objectInputType, objectOutputType } from '../'
import { TypeDesc } from '../'

export interface TypeMetaObject<
  T extends ModelRawShape = ModelRawShape,
> extends TypeMeta {
  shape: () => T
}

export class TypeDescObject<
    T extends ModelRawShape,
    Output = objectOutputType<T>,
    Input = objectInputType<T>,
  >
  extends TypeDesc<
  Output,
    TypeMetaObject<T>,
    Input
  > {
  public static create<T extends ModelRawShape>(model: T) {
    return new TypeDescObject({
      shape: () => model,
    })
  }
}
