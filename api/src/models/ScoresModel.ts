import { eq } from 'drizzle-orm'
import db from '~/db'
import { type Score, scores } from '~/db/schema'
import { timeToMs } from '~/lib/timeUtils'

export const ScoresModel = {
	getAllFromScenario,
	create,
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

async function create(score: Omit<Score, 'id'>) {
	return db.insert(scores).values(score)
}

async function isTop10(time: string, scenarioId: string) {
	const scores = await getAllFromScenario(scenarioId)

	if (scores.length < 10) return true

	const worstTop10 = scores[scores.length - 1]

	if (worstTop10 === undefined) {
		throw new Error('Could not determine the worst top 10 score')
	}

	return timeToMs(time) < timeToMs(worstTop10.time)
}
