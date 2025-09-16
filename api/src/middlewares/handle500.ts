import type { NextFunction, Request, Response } from 'express'

export function handle500(
	err: Error,
	_: Request,
	res: Response,
	_next: NextFunction
) {
	console.error(err)
	res.status(500).json({ error: 'Internal Server Error' })
}
