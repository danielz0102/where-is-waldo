export class ValidationError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options)
		this.name = 'ValidationError'
	}
}

export class UnexpectedError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options)
		this.name = 'UnexpectedError'
	}
}
