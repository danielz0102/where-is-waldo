import { and, eq, gte, lte } from 'drizzle-orm'
import db from '~/db'
import { characters } from '~/db/schema'

export const CharactersModel = {
	getAll,
	get,
	getAllFromScenario,
	hasBeenClicked,
}

function getAll() {
	return db.select().from(characters)
}

function get(id: string) {
	return db.select().from(characters).where(eq(characters.id, id))
}

function getAllFromScenario(id: string) {
	return db.select().from(characters).where(eq(characters.scenarioId, id))
}

function hasBeenClicked(id: string, { x, y }: { x: number; y: number }) {
	return db
		.select()
		.from(characters)
		.where(
			and(
				eq(characters.id, id),
				gte(characters.minX, x),
				lte(characters.maxX, x),
				gte(characters.minY, y),
				lte(characters.maxY, y)
			)
		)
}
