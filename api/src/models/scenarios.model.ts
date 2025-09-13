import { eq } from 'drizzle-orm'
import db from '~/db'
import { scenarios } from '~/db/schema'

function getAll() {
	return db.select().from(scenarios)
}

function get(id: string) {
	return db.select().from(scenarios).where(eq(scenarios.id, id))
}

export default {
	getAll,
	get,
}
