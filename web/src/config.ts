import * as z from 'zod'

const envSchema = z.object({
	API_URL: z.url(),
})

export const { API_URL } = envSchema.parse({
	API_URL: import.meta.env.VITE_API_URL,
})
