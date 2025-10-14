import type { Request, Response } from 'express'
import type { Score } from '~/db/schema'
import { ScoresModel } from '~models/ScoresModel'

export const ScoreController = {
	getAllFromScenario,
	newScore,
	isInTop10,
}

async function getAllFromScenario(
	req: Request<{ scenarioId: string }, null, null, { limit: string }>,
	res: Response
) {
	const { scenarioId } = req.params
	const { limit } = req.query

	const scores = await ScoresModel.getAllFromScenario(
		scenarioId,
		Number(limit) ?? undefined
	)

	res.json(scores)
}

async function newScore(
	req: Request<null, null, Omit<Score, 'id'>>,
	res: Response
) {
	const { username, time, scenarioId } = req.body
	const score = await ScoresModel.new({ username, time, scenarioId })

	if (!score) {
		return res
			.status(400)
			.json({ message: 'The score is not better than the existing one' })
	}

	res.status(200).json(score)
}

async function isInTop10(
	req: Request<null, null, { time: string; scenarioId: string }>,
	res: Response<boolean>
) {
	const { time, scenarioId } = req.body
	const isTop10 = await ScoresModel.isTop10(time, scenarioId)
	res.send(isTop10)
}
