import { eq } from 'drizzle-orm'
import db from '~/db'
import { type Score, scores } from '~/db/schema'

export const ScoresModel = {
	getAllFromScenario,
	create,
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
