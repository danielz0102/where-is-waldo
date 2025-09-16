import { eq } from 'drizzle-orm'
import db from '~/db'
import { type Scenario, scenarios } from '~/db/schema'

export const ScenariosModel = {
	getAll,
	get,
}

function getAll(): Promise<Scenario[]> {
	return db.select().from(scenarios)
}

async function get(id: string): Promise<Scenario | null> {
	const result = await db.select().from(scenarios).where(eq(scenarios.id, id))
	return result[0] ?? null
}
