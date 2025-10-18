import z from 'zod'

export const getScenarioSchema = z.object({
	params: z.object({
		id: z.uuid(),
	}),
})
