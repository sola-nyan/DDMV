export class TryParseError extends Error {
    private patternId: string
    private property?: string | undefined
    private label?: string | undefined
    private input?: string | undefined

    constructor(patternId: string, property?: string, label?: string, input?: any) {
        super()
        this.name = 'TryParseError'
        this.patternId = patternId
        this.property = property
        this.label = label
        this.input = input
    }

    public getPatternId() {
        return this.patternId
    }

    public getProperty() {
        return this.property
    }

    public getlabel() {
        return this.label
    }

    public getInput() {
        return this.input
    }
}

export class ValidationError extends Error {
    private patternId: string
    private property?: string | undefined
    private params?: any
    private label: string | undefined
    private input?: string | undefined

    constructor(patternId: string, property: string | undefined, params?: any, label?: string, input?: any) {
        super()
        this.name = 'ValidationError'
        this.patternId = patternId
        this.property = property
        this.params = params
        this.label = label
        this.input = input
    }

    public getPatternId() {
        return this.patternId
    }

    public getProperty() {
        return this.property
    }

    public getparams() {
        return this.params
    }

    public getlabel() {
        return this.label
    }

    public getInput() {
        return this.input
    }
}
