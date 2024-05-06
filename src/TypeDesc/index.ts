import { ValidationResultContext } from '~/Utils/ValidationResultHelper'

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

  public validate(input: Input, parentPropKey?: string, parentCtx = new ValidationResultContext<Input>(input)): ValidationResult {
    try {
      const res = this.validateInternal(parentCtx, input, parentPropKey)
      if (parentPropKey && res) {
        // custom Validator invoke
        // console.log(parentPropKey, res, ctx.getInput())
      }
    }
    catch (e) {
      parentCtx.addError('ddmv.unhandle_exception', parentPropKey)
    }
    return parentCtx.getResult()
  }

  protected abstract validateInternal(ctx: ValidationResultContext, input: any, parentPropKey?: string): boolean
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
  label?: string
  required?: boolean
}

type Unwrap<T> = T

export type DDMVModelInputType<
  RawModel extends DDMVModel,
> = Unwrap<{ [k in keyof RawModel]?: RawModel[k]['_input'] }>

export type DDMVModelOutputType<
  RawModel extends DDMVModel,
> = Unwrap<{ [k in keyof RawModel]?: RawModel[k]['_output'] }>

export type input<T extends TypeDesc<any, any, any>> = T['_input']
export type output<T extends TypeDesc<any, any, any>> = T['_output']
