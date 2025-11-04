import z from 'zod'

export const getScenarioSchema = z.object({
	params: z.object({
		slug: z.string(),
	}),
})
