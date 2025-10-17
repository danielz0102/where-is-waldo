import type { Score } from '~/db/schema'
import { BusinessError, UnexpectedError } from '~/errors'
import { timeToMs } from '~/lib/timeUtils'
import { ScoreRepository as repo } from '~/repositories/ScoreRepository'

export const ScoreModel = {
	getTop10,
	new: newScore,
	isTop10,
}

async function getTop10(id: string): Promise<Score[]> {
	return repo.getByScenario(id, 10)
}

async function newScore(score: Omit<Score, 'id'>): Promise<Score> {
	const existingScore = await repo.getByUsername(score.username)

	if (!existingScore) {
		return repo.create(score)
	}

	const isBetter = timeToMs(score.time) < timeToMs(existingScore.time)

	if (!isBetter) {
		throw new BusinessError('The score is not better than the existing one')
	}

	return repo.update({ ...existingScore, ...score })
}

async function isTop10(time: string, scenarioId: string): Promise<boolean> {
	const scores = await getTop10(scenarioId)

	if (scores.length < 10) return true

	const worstTop10 = scores.at(-1)

	if (!worstTop10) {
		throw new UnexpectedError('Could not determine the worst top 10 score', {
			cause: scores,
		})
	}

	return timeToMs(time) < timeToMs(worstTop10.time)
}
