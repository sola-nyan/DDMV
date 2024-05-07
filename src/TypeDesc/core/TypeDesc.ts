import { ValidationResultContext } from '~/Validator/ValidationResultContext'

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

    protected abstract validateInternal(ctx: ValidationResultContext, property: string | undefined, input: any): boolean

    public validate(input: Input, property?: string, ctx = new ValidationResultContext<Input>(input)) {
        try {
            const res = this.validateInternal(ctx, property, input)
            if (res && property && this._meta?.validators) {
                for (const vConfig of this._meta?.validators) {
                    const cvRes = vConfig.validator(input, property, { ctx })
                    if (!cvRes) {
                        // TODO: add Error
                    }
                }
            }
        }
        catch (e) {
            ctx.addError('ddmv.unhandle_exception', property)
            // TODO: ValidateSkipErrorObject
            // eslint-disable-next-line no-console
            console.log('ddmv.unhandle_exception', e)
        }
        return ctx.getResult()
    }

    // protected validateObjectProps(ctx: ValidationResultContext, model: DDMVModel, input: Input, parentPropKey?: string) {
    //     const keys = Object.keys(model)
    //     for (const thisKey of keys) {
    //         const thisProp = model[thisKey]
    //         const thisPropKey = parentPropKey ? `${parentPropKey}.${thisKey}` : thisKey
    //         try {
    //             const thisPropVal = (input as any)[thisKey]
    //             const res = thisProp.validateInternal(ctx, thisPropKey, thisPropVal)
    //             if (thisProp instanceof TypeDescObject === false)
    //                 ctx.mapping(thisPropKey, res ? thisPropVal : undefined)
    //         }
    //         catch (e) {
    //             ctx.mapping(thisPropKey, undefined)
    //             throw e
    //         }
    //     }
    // }
}
