import { eq } from 'drizzle-orm'
import db from '~/db'
import { type Score, scores } from '~/db/schema'
import { UnexpectedError } from '~/errors'

export const ScoreRepository = {
	getByScenario,
	getByUsername,
	create,
	update,
}

async function getByScenario(id: string, limit = 0): Promise<Score[]> {
	return db
		.select()
		.from(scores)
		.where(eq(scores.scenarioId, id))
		.limit(limit)
		.orderBy(scores.time)
}

async function getByUsername(username: string): Promise<Score | null> {
	const result = await db
		.select()
		.from(scores)
		.where(eq(scores.username, username))

	return result[0] || null
}

async function create(score: Omit<Score, 'id'>): Promise<Score> {
	const result = await db.insert(scores).values(score).returning()
	const inserted = result[0]

	if (!inserted) {
		throw new UnexpectedError('Failed to insert score', { cause: score })
	}

	return inserted
}

async function update(score: Score): Promise<Score> {
	const result = await db
		.update(scores)
		.set(score)
		.where(eq(scores.id, score.id))
		.returning()

	const updated = result[0]

	if (!updated) {
		throw new UnexpectedError('Failed to update score', { cause: score })
	}

	return updated
}
