import type { InferSelectModel } from 'drizzle-orm'
import { pgTable, real, time, uuid, varchar } from 'drizzle-orm/pg-core'

export const scenarios = pgTable('scenarios', {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull(),
	slug: varchar({ length: 255 }).notNull().unique(),
	imgUrl: varchar({ length: 255 }).notNull(),
})

export const characters = pgTable('characters', {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull(),
	imgUrl: varchar({ length: 255 }).notNull(),
	maxX: real().notNull(),
	minX: real().notNull(),
	maxY: real().notNull(),
	minY: real().notNull(),
	scenarioId: uuid('scenario_id')
		.references(() => scenarios.id)
		.notNull(),
})

export const scores = pgTable('scores', {
	id: uuid().primaryKey().defaultRandom(),
	username: varchar({ length: 255 }).unique().notNull(),
	time: time().notNull(),
	scenarioId: uuid('scenario_id')
		.references(() => scenarios.id)
		.notNull(),
})

export type Scenario = InferSelectModel<typeof scenarios>
export type Character = InferSelectModel<typeof characters>
export type Score = InferSelectModel<typeof scores>
