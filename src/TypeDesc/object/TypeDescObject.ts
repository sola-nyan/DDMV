import { ValidationResultContext } from '../../Utils/ValidationResultContext'
import { TryParseError, ValidationError } from '../../Utils/ValidErrors'
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
    params: any
    patternIdSuffix: string
}

export type ValidationErrorThrower = (patternId: string, params?: any, input?: any) => void

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

    protected abstract tryParse(property: string | undefined, input: any): Output | undefined
    protected abstract validateInternal(property: string | undefined, parsed: any, validationErrorThrower: ValidationErrorThrower): boolean

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
                    const parsed = this.tryParse(property, input)
                    const validationErrorThrower = (patternId: string, params: any) => { throw new ValidationError(patternId, property, params, this._meta?.label, parsed) }
                    const res = this.validateInternal(property, parsed, validationErrorThrower)
                    if (res && property && this._meta?.validators) {
                        for (const vConfig of this._meta?.validators) {
                            if (!vConfig.validator(input, property, { ctx }))
                                throw new ValidationError(`ddmv.validator.${vConfig.patternIdSuffix}`, property, vConfig.params, this._meta.label, parsed)
                        }
                    }
                    ctx.mapping(property, parsed, res)
                }
                catch (e) {
                    if (e instanceof TryParseError || e instanceof ValidationError) {
                        ctx.addError(e.getPatternId(), property, this._meta?.label, e)
                        ctx.mapping(property, undefined)
                    }
                    else {
                        throw e
                    }
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
    protected tryParse(_property: any, _input: any): Output | undefined {
        throw new Error('DDMV: No implements TypeDescObject::tryParse')
    }

    protected validateInternal(_input: any, _parseErrorThrower: ValidationErrorThrower): boolean {
        throw new Error('DDMV: No implements TypeDescObject::validateInternal')
    }

    public static create<T extends DDMVModel>(model: T) {
        return new TypeDescObject({
            DDMV: () => model,
        })
    }
}
