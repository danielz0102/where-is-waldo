// biome-ignore lint/suspicious/noExplicitAny: This is a utility for mocking any async service
export type AsyncFunction = (...args: any[]) => Promise<any>
