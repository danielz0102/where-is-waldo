import type { InferSelectModel } from 'drizzle-orm'
import type { PgTable } from 'drizzle-orm/pg-core'
import db from '~/db'

export async function getFirstRecord<T extends PgTable>(
	table: T
): Promise<InferSelectModel<T>> {
	const result = await db
		.select()
		// biome-ignore lint/suspicious/noExplicitAny: Drizzle type inference limitation
		.from(table as any)
		.limit(1)
	const record = result[0]

	if (!record) {
		throw new Error('No item found in the table')
	}

	return record as InferSelectModel<T>
}
