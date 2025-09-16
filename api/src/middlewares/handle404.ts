import type { Request, Response } from 'express'

export function handle404(_: Request, res: Response) {
	res.status(404).json({ error: 'Not Found' })
}
