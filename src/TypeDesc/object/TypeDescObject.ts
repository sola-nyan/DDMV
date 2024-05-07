import { ValidationResultContext } from '~/Validator/ValidationResultContext'
import { ValidationError } from '~/Validator/Validator'
/**
 * ============================================================
 * TypeDesc refs
 * ===========================================================
 */
export interface TypeMeta {
    label?: string
    validators?: CustomValidatorConfig[]
}

export interface CustomValidatorConfig {
    validator: (value: any, property: string, unsafe: { ctx: ValidationResultContext }) => boolean
    patternIdSuffix: string
}

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

    protected abstract validateInternal(ctx: ValidationResultContext, property: string | undefined, input: any): { valid: boolean, parsed: Output | undefined }

    public validate(
        input: any,
        property?: string,
        ctx = new ValidationResultContext<Input, Output>(input),
    ) {
        try {
            if (this instanceof TypeDescObject) {
                const model = this._meta!.DDMV()
                const keys = Object.keys(model)
                for (const thisKey of keys) {
                    const thisProp = model[thisKey]
                    const thisPropKey = property ? `${property}.${thisKey}` : thisKey
                    const thisPropVal = input[thisKey]
                    thisProp.validate(thisPropVal, thisPropKey, ctx)
                }
            }
            else {
                try {
                    const res = this.validateInternal(ctx, property, input)
                    if (res && property && this._meta?.validators) {
                        for (const vConfig of this._meta?.validators) {
                            const cvRes = vConfig.validator(input, property, { ctx })
                            if (!cvRes) {
                                // TODO: add Error
                                res.valid = false
                            }
                        }
                    }
                    ctx.mapping(property, res.parsed)
                }
                catch (e) {
                    if (e instanceof ValidationError)
                        ctx.mapping(property, undefined)
                    else
                        throw e
                }
            }
        }
        catch (e) {
            ctx.addError('ddmv.unhandle_exception', property)
            console.error('ddmv.unhandle_exception', e)
        }
        return ctx.getResult()
    }
}

/**
 * ============================================================
 * TypeDescObject refs
 * ===========================================================
 */
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
    protected convertIO(input: Input): Output {
        return input as unknown as Output // No convert :Model Root
    }

    protected validateInternal(_parentCtx: ValidationResultContext, _parentPropKey: string, input: any) {
        return { valid: true, parsed: this.convertIO(input) } // No implements :Model Root
    }

    public static create<T extends DDMVModel>(model: T) {
        return new TypeDescObject({
            DDMV: () => model,
        })
    }
}
