import type { InferSelectModel } from 'drizzle-orm'
import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const scenarios = pgTable('scenarios', {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull(),
	imgUrl: varchar({ length: 255 }).notNull(),
})

export const characters = pgTable('characters', {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull(),
	maxX: integer().notNull(),
	minX: integer().notNull(),
	maxY: integer().notNull(),
	minY: integer().notNull(),
	scenarioId: uuid('scenario_id')
		.references(() => scenarios.id)
		.notNull(),
})

export type Scenario = InferSelectModel<typeof scenarios>
export type Character = InferSelectModel<typeof characters>
