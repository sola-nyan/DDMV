export class ValidationResultContext<T = any> {
    private result: ValidationResult
    private input: T

    constructor(input: any) {
        this.input = input
        this.result = {
            valid: true,
            errors: [],
        }
    }

    public merge(vr: ValidationResult) {
        if (vr.errors.length === 0)
            return
        this.result.valid = false
        this.result.errors.push(...vr.errors)
        return this
    }

    public apply(valid: boolean, patternId: string, prop?: string, label?: string) {
        if (!valid)
            return this.addError(patternId, prop, label)
        return true
    }

    public addError(errorId: string, prop?: string, label?: string) {
        this.result.valid = false
        this.result.errors.push({
            errorId,
            label,
            prop,
        })
        return false
    }

    public getResult() {
        return this.result
    }

    public getInput() {
        return this.input
    }
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
