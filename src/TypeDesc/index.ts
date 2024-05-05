/* eslint-disable ts/no-namespace */
export abstract class TypeDesc<
Output = any,
Meta extends TypeMeta = any,
Input = Output,
> {
  public readonly _input?: Input
  public readonly _meta?: Meta
  public readonly _output?: Output

  constructor(meta: Meta) {
    this._meta = meta
  }

  public abstract validate(input: Input): any
}

export interface DDMVModel { [k: string]: TypeDesc<any, any, any> }

export type input<T extends TypeDesc<any, any, any>> = T['_input']
export type output<T extends TypeDesc<any, any, any>> = T['_output']

export interface TypeMeta {
  required?: boolean
}

export type objectOutputType<
  RawModel extends DDMVModel,
> = objectUtil.flatten<objectUtil.addQuestionMarks<baseObjectOutputType<RawModel>>>

export type baseObjectOutputType<Shape extends DDMVModel> = {
  [k in keyof Shape]: Shape[k]['_output']
}

type optionalKeys<T extends object> = {
  [k in keyof T]: undefined extends T[k] ? k : never
}[keyof T]
type requiredKeys<T extends object> = {
  [k in keyof T]: undefined extends T[k] ? never : k
}[keyof T]

export type objectInputType<
    Shape extends DDMVModel,
  > = objectUtil.flatten<baseObjectInputType<Shape>>
export type baseObjectInputType<Shape extends DDMVModel> =
    Partial<{
      [k in keyof Shape]: Shape[k]['_input']
    }>

namespace objectUtil{
  export type identity<T> = T
  export type addQuestionMarks<T extends object, _O = any> = {
    [K in requiredKeys<T>]: T[K]
  } & {
    [K in optionalKeys<T>]?: T[K]
  } & {
    [k in keyof T]?: unknown
  }
  export type flatten<T> = identity<{ [k in keyof T]: T[k] }>
}
