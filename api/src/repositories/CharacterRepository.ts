import { and, eq, gte, lte } from 'drizzle-orm'
import db from '~/db'
import { characters } from '~/db/schema'

export const CharacterRepository = {
	getAll,
	getById,
	getByScenarioId,
	getByCoordinates,
}

function getAll() {
	return db.select().from(characters)
}

async function getById(id: string) {
	const result = await db.select().from(characters).where(eq(characters.id, id))
	return result[0] ?? null
}

function getByScenarioId(id: string) {
	return db.select().from(characters).where(eq(characters.scenarioId, id))
}

function getByCoordinates({ id, x, y }: { id: string; x: number; y: number }) {
	return db
		.select()
		.from(characters)
		.where(
			and(
				eq(characters.id, id),
				lte(characters.minX, x),
				gte(characters.maxX, x),
				lte(characters.minY, y),
				gte(characters.maxY, y)
			)
		)
}
