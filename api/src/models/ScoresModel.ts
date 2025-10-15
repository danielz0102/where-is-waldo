import { eq } from 'drizzle-orm'
import db from '~/db'
import { type Score, scores } from '~/db/schema'
import { timeToMs } from '~/lib/timeUtils'

export const ScoresModel = {
	getAllFromScenario,
	new: newScore,
	isTop10,
}

async function getAllFromScenario(id: string, limit = 10) {
	return db
		.select()
		.from(scores)
		.where(eq(scores.scenarioId, id))
		.limit(limit)
		.orderBy(scores.time)
}

async function newScore(score: Omit<Score, 'id'>) {
	const existingScores = await db
		.select()
		.from(scores)
		.where(eq(scores.username, score.username))

	if (existingScores.length === 0) {
		return db.insert(scores).values(score)
	}

	const existingScore = existingScores[0]

	if (!existingScore) {
		throw new Error('Could not find existing score')
	}

	if (timeToMs(score.time) >= timeToMs(existingScore.time)) {
		return
	}

	return db
		.update(scores)
		.set({ time: score.time })
		.where(eq(scores.id, existingScore.id))
}

async function isTop10(time: string, scenarioId: string) {
	const scores = await getAllFromScenario(scenarioId)

	if (scores.length < 10) return true

	const worstTop10 = scores.at(-1)

	if (worstTop10 === undefined) {
		throw new Error('Could not determine the worst top 10 score')
	}

	return timeToMs(time) < timeToMs(worstTop10.time)
}
