import { eq } from 'drizzle-orm'
import db from '~/db'
import { scenarios } from '~/db/schema'

export const ScenarioModel = {
	getAll,
	getById,
	getBySlug,
}

async function getAll() {
	return db.select().from(scenarios)
}

async function getById(id: string) {
	const result = await db.select().from(scenarios).where(eq(scenarios.id, id))
	return result[0] ?? null
}

async function getBySlug(slug: string) {
	const result = await db
		.select()
		.from(scenarios)
		.where(eq(scenarios.slug, slug))
	return result[0] ?? null
}
