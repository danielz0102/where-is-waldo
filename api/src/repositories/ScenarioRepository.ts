import { eq } from 'drizzle-orm'
import db from '~/db'
import { scenarios } from '~/db/schema'

export const ScenarioRepository = {
	getAll,
	getById,
}

async function getAll() {
	return db.select().from(scenarios)
}

async function getById(id: string) {
	const result = await db.select().from(scenarios).where(eq(scenarios.id, id))
	return result[0] ?? null
}
