import { ObjectWrapper } from '@solanyan/object-wrapper'

export interface ValidationResult<MappedModel = any> {
    valid: boolean
    mapped: MappedModel
    errors: ErrorDetail[]
}

interface ErrorDetail {
    patternId: string
    prop: string | undefined
    label: string | undefined
    cause: any
}

export class ValidationResultContext<INPUT = any, OUTPUT = any> {
    private result: ValidationResult<OUTPUT>
    private input: INPUT
    private mapper: ObjectWrapper

    constructor(input: any) {
        this.input = input
        this.result = {
            valid: true,
            mapped: {} as OUTPUT,
            errors: [],
        }
        this.mapper = new ObjectWrapper(this.result.mapped)
    }

    public mapping(prop: string | undefined, input: any, valid = true) {
        if (prop && valid)
            this.mapper.setPropVal(prop, input)
    }

    public mergeContext(ctx: ValidationResultContext) {
        return this.merge(ctx.getResult())
    }

    public merge(vr: ValidationResult) {
        Object.assign(this.result.mapped as object, vr.mapped)
        if (vr.errors.length === 0)
            return
        this.result.valid = false
        this.result.errors.push(...vr.errors)
        return this
    }

    public addError(patternId: string, prop?: string, label?: string, cause?: any) {
        this.result.valid = false
        this.result.errors.push({
            patternId,
            label,
            prop,
            cause,
        })
        return false
    }

    public isValid() {
        return this.result.valid
    }

    public getResult() {
        return this.result
    }

    public getInput() {
        return (() => this.input)()
    }
}
