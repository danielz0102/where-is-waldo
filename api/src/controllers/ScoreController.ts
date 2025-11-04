import type { NextFunction, Request, Response } from 'express'
import type { Score } from '~/db/schema'
import { BusinessError } from '~/errors'
import { ScoreModel } from '~models/ScoreModel'

export const ScoreController = {
	getAllByScenarioId,
	post,
}

async function getAllByScenarioId(
	req: Request<{ scenarioId: string }, unknown, unknown, { limit: string }>,
	res: Response
) {
	const { scenarioId } = req.params
	const scores = await ScoreModel.getTop10(scenarioId)
	res.json(scores)
}

async function post(
	req: Request<unknown, unknown, Omit<Score, 'id'>>,
	res: Response,
	next: NextFunction
) {
	const { username, time, scenarioId } = req.body

	try {
		const score = await ScoreModel.new({ username, time, scenarioId })
		res.status(201).json(score)
	} catch (error) {
		if (error instanceof BusinessError) {
			return res.status(409).json({ message: error.message })
		}

		return next(error)
	}
}
