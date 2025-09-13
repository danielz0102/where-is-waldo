import { and, eq, gte, lte } from 'drizzle-orm'
import db from '~/db'
import { characters } from '~/db/schema'

export function getAll() {
	return db.select().from(characters)
}

export function get(id: string) {
	return db.select().from(characters).where(eq(characters.id, id))
}

export function getAllFromScenario(id: string) {
	return db.select().from(characters).where(eq(characters.scenarioId, id))
}

export function hasBeenClicked(id: string, { x, y }: { x: number; y: number }) {
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

export default {
	getAll,
	get,
	getAllFromScenario,
	hasBeenClicked,
}
