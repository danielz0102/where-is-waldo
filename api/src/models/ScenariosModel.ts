import { and, eq } from 'drizzle-orm'
import db from '~/db'
import { type Scenario, scenarios } from '~/db/schema'

export const ScenariosModel = {
	get,
}

async function get(
	filters?: {
		[K in keyof Scenario]?: Scenario[K]
	}
): Promise<Scenario[]> {
	if (!filters || Object.keys(filters).length === 0) {
		const allScenarios = await db.select().from(scenarios)
		return allScenarios
	}

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

	return result
}
