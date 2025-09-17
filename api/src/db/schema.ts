import type { InferSelectModel } from 'drizzle-orm'
import { pgTable, real, uuid, varchar } from 'drizzle-orm/pg-core'

export const scenarios = pgTable('scenarios', {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull(),
	imgUrl: varchar({ length: 255 }).notNull(),
})

export const characters = pgTable('characters', {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull(),
	maxX: real().notNull(),
	minX: real().notNull(),
	maxY: real().notNull(),
	minY: real().notNull(),
	scenarioId: uuid('scenario_id')
		.references(() => scenarios.id)
		.notNull(),
})

export type Scenario = InferSelectModel<typeof scenarios>
export type Character = InferSelectModel<typeof characters>
