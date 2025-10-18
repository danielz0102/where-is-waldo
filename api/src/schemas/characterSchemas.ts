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

export const clickCharacterSchema = z.object({
	params: z.object({
		id: z.uuid(),
	}),
	query: z.object({
		x: z.coerce.number().positive(),
		y: z.coerce.number().positive(),
	}),
})
