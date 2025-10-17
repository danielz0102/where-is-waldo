import type { NextFunction, Request, Response } from 'express'
import z from 'zod'

export const validate =
	(schema: z.ZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req)

		if (!result.success) {
			return res.status(400).json(z.flattenError(result.error).fieldErrors)
		}

		next()
	}
