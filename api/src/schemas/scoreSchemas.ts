import z from 'zod'

export const getAllScoresSchema = z.object({
	params: z.object({
		scenarioSlug: z.string(),
	}),
})

export const postScoreSchema = z.object({
	body: z.object({
		username: z.string(),
		scenarioId: z.uuid(),
		time: z
			.string()
			.regex(/^\d{2}:\d{2}:\d{2}$/, 'Time must be in HH:MM:SS format'),
	}),
})
