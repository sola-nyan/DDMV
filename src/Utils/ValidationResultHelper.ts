import type { ValidationResult } from '~/TypeDesc'

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
