/* eslint-disable ts/no-namespace */
export class TypeDesc<
Output = any,
InjectedTypeMeta extends TypeMeta = any,
Input = Output,
> {
  public readonly _input?: Input
  public readonly _meta?: InjectedTypeMeta
  public readonly _output?: Output

  constructor(meta: InjectedTypeMeta) {
    this._meta = meta
  }
}

export class TypeDescAny extends TypeDesc<any, any, any> {}
export interface ModelRawShape { [k: string]: TypeDescAny }
export type input<T extends TypeDescAny> = T['_input']
export type output<T extends TypeDescAny> = T['_output']

export interface TypeMeta {
  required?: boolean
}

export type objectOutputType<
  Shape extends ModelRawShape,
> = objectUtil.flatten<objectUtil.addQuestionMarks<baseObjectOutputType<Shape>>>

export type baseObjectOutputType<Shape extends ModelRawShape> = {
  [k in keyof Shape]: Shape[k]['_output']
}

type optionalKeys<T extends object> = {
  [k in keyof T]: undefined extends T[k] ? k : never
}[keyof T]
type requiredKeys<T extends object> = {
  [k in keyof T]: undefined extends T[k] ? never : k
}[keyof T]

export type objectInputType<
    Shape extends ModelRawShape,
  > = objectUtil.flatten<baseObjectInputType<Shape>>
export type baseObjectInputType<Shape extends ModelRawShape> =
    objectUtil.addQuestionMarks<{
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
