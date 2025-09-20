import { and, eq } from 'drizzle-orm'
import db from '~/db'
import { type Scenario, scenarios } from '~/db/schema'

export const ScenariosModel = {
	getAll,
	get,
}

function getAll(): Promise<Scenario[]> {
	return db.select().from(scenarios)
}

async function get(
	filters: {
		[K in keyof Scenario]?: Scenario[K]
	}
): Promise<Scenario | null> {
	const entries = Object.entries(filters) as Array<
		[keyof Scenario, Scenario[keyof Scenario]]
	>

	const equalStatements = entries.map(([key, value]) =>
		eq(scenarios[key], value)
	)

	const result = await db
		.select()
		.from(scenarios)
		.where(and(...equalStatements))
	return result[0] ?? null
}
