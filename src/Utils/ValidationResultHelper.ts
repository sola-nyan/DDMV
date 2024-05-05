import type { ValidationResult } from '~/TypeDesc'

export class ValidationResultHelper {
    private result: ValidationResult

    constructor() {
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
    }

    public addError(errorId: string, prop?: string, label?: string) {
        this.result.valid = false
        this.result.errors.push({
            errorId,
            label,
            prop,
        })
        return this.result
    }

    public getResult() {
        return this.result
    }
}
