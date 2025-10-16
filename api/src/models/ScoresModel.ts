import type { Score } from '~/db/schema'
import { timeToMs } from '~/lib/timeUtils'
import { ScoreRepository as repo } from '~/repositories/ScoreRepository'

export const ScoresModel = {
	getAllFromScenario,
	new: newScore,
	isTop10,
}

async function getAllFromScenario(id: string, limit = 10): Promise<Score[]> {
	return repo.getByScenario(id, limit)
}

async function newScore(score: Omit<Score, 'id'>): Promise<Score | null> {
	const existingScore = await repo.getByUsername(score.username)

	if (!existingScore) {
		return repo.create(score)
	}

	const isBetter = timeToMs(score.time) < timeToMs(existingScore.time)

	if (!isBetter) {
		return null
	}

	return repo.update({ ...existingScore, ...score })
}

async function isTop10(time: string, scenarioId: string) {
	const scores = await getAllFromScenario(scenarioId)

	if (scores.length < 10) return true

	const worstTop10 = scores.at(-1)

	if (worstTop10 === undefined) {
		throw new Error('Could not determine the worst top 10 score', {
			cause: scores,
		})
	}

	return timeToMs(time) < timeToMs(worstTop10.time)
}
