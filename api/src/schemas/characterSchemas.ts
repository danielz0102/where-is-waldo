import z from 'zod'

export const getAllCharactersSchema = z.object({
	query: z.object({
		scenarioId: z.uuid().optional(),
	}),
})

export const getCharacterSchema = z.object({
	params: z.object({
		id: z.uuid(),
	}),
})
