import type { NextFunction, Request, Response } from 'express'
import * as z from 'zod'

export async function validateCoordinates(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const schema = z.object({ x: z.coerce.number(), y: z.coerce.number() })
	const result = schema.safeParse(req.query)

	if (!result.success) {
		return res.status(400).json({ error: 'Invalid coordinates' })
	}

	next()
}
