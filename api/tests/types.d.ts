// biome-ignore lint/suspicious/noExplicitAny: This is a generic async function type
export type AsyncFunction = (...args: any[]) => Promise<any>
