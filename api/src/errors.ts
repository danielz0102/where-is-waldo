export const ValidationError = createCustomError('ValidationError')
export const UnexpectedError = createCustomError('UnexpectedError')
export const BusinessError = createCustomError('BusinessError')

function createCustomError(name: string) {
	return class extends Error {
		constructor(message: string, options?: ErrorOptions) {
			super(message, options)
			this.name = name
		}
	}
}
