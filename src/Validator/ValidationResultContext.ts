import { ObjectWrapper } from '@solanyan/object-wrapper'

export class ValidationResultContext<T = any> {
    private result: ValidationResult
    private input: T
    private mapper: ObjectWrapper

    constructor(input: any) {
        this.input = input
        this.result = {
            valid: true,
            mapped: {},
            errors: [],
        }
        this.mapper = new ObjectWrapper(this.result.mapped)
    }

    public mapping(prop: string | undefined, input: any) {
        if (prop)
            this.mapper.setPropVal(prop, input)
    }

    public mergeContext(ctx: ValidationResultContext) {
        return this.merge(ctx.getResult())
    }

    public merge(vr: ValidationResult) {
        Object.assign(this.result.mapped, vr.mapped)
        if (vr.errors.length === 0)
            return
        this.result.valid = false
        this.result.errors.push(...vr.errors)
        return this
    }

    public addError(patternId: string, prop?: string, label?: string) {
        this.result.valid = false
        this.result.errors.push({
            patternId,
            label,
            prop,
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

export interface ValidationResult {
    valid: boolean
    mapped: any
    errors: ErrorDetail[]
}

interface ErrorDetail {
    patternId: string
    prop: string | undefined
    label: string | undefined
}
