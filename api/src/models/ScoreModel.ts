import type { Score } from '~/db/schema'
import { BusinessError } from '~/errors'
import { timeToMs } from '~/lib/timeUtils'
import { ScoreRepository as repo } from '~/repositories/ScoreRepository'

export const ScoreModel = {
	getTop10,
	new: newScore,
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
