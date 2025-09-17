import { and, eq, gte, lte } from 'drizzle-orm'
import db from '~/db'
import { type Character, characters } from '~/db/schema'
import { uuidIsValid } from '~/lib/uuidIsValid'

export const CharactersModel = {
	getAll,
	get,
	getAllFromScenario,
	hasBeenClicked,
}

function getAll(): Promise<Character[]> {
	return db.select().from(characters)
}

async function get(id: string): Promise<Character | null> {
	if (!uuidIsValid(id)) {
		return null
	}

	const result = await db.select().from(characters).where(eq(characters.id, id))
	return result[0] ?? null
}

function getAllFromScenario(id: string): Promise<Character[]> {
	return db.select().from(characters).where(eq(characters.scenarioId, id))
}

async function hasBeenClicked(
	id: string,
	{ x, y }: { x: number; y: number }
): Promise<boolean> {
	if (!uuidIsValid(id)) {
		return false
	}

	const result = await db
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

	return result.length > 0
}
