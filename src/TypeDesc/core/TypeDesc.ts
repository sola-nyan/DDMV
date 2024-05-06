import type { ValidationResult } from '~/Validator/ValidationResultContext'
import { ValidationResultContext } from '~/Validator/ValidationResultContext'

export interface TypeMeta {
    label?: string
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
            console.error('ddmv.unhandle_exception', e)
        }
        return parentCtx.getResult()
    }

    protected abstract validateInternal(ctx: ValidationResultContext, input: any, parentPropKey?: string): boolean
}
