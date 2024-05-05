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

  public abstract validate(input: any, prop: string): ValidationResult
}

export interface ValidationResult {
  valid: boolean
  errors: ErrorDetail[]
}

interface ErrorDetail {
  errorId: string
  prop: string | undefined
  label: string | undefined
}

export interface DDMVModel { [k: string]: TypeDesc<any, any, any> }
export interface TypeMeta {
  required?: boolean
}

type unwrap<T> = T
type ModelTypeSummary<T> = unwrap<{ [k in keyof T]: T[k] }>

export type objectOutputType<
  RawModel extends DDMVModel,
> = ModelTypeSummary<Partial<DDMVOutputType<RawModel>>>

export type objectInputType<
  RawModel extends DDMVModel,
> = ModelTypeSummary<Partial<DDMVInputType<RawModel>>>

type DDMVOutputType<RawModel extends DDMVModel> = {
  [k in keyof RawModel]: RawModel[k]['_output']
}

type DDMVInputType<RawModel extends DDMVModel> = {
  [k in keyof RawModel]: RawModel[k]['_input']
}

export type input<T extends TypeDesc<any, any, any>> = T['_input']
export type output<T extends TypeDesc<any, any, any>> = T['_output']
