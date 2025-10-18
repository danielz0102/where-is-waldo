import type { NextFunction, Request, Response } from 'express'
import type { Score } from '~/db/schema'
import { BusinessError } from '~/errors'
import { ScoreModel } from '~models/ScoreModel'

export const ScoreController = {
	getAllByScenarioId,
	post,
	isInTop10,
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

	const score = await ScoreModel.new({ username, time, scenarioId }).catch(
		(err) => {
			if (err instanceof BusinessError) {
				return res.status(409).json({ message: err.message })
			}

			return next(err)
		}
	)

	res.status(201).json(score)
}

async function isInTop10(
	req: Request<null, null, { time: string; scenarioId: string }>,
	res: Response<boolean>
) {
	const { time, scenarioId } = req.body
	const isTop10 = await ScoreModel.isTop10(time, scenarioId)
	res.send(isTop10)
}
