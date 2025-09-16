import type { AsyncFunction } from '~tests/types'

export class AsyncServiceMocker<T extends Record<string, AsyncFunction>> {
	constructor(private obj: T) {}

	mock<K extends keyof T>(
		methodName: K,
		returnValue: Awaited<ReturnType<T[K]>>
	) {
		vi.mocked(this.obj[methodName]).mockResolvedValueOnce(returnValue)
	}
}
