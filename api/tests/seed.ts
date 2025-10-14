import { reset, seed } from 'drizzle-seed'
import db from '~/db'
import { characters, scenarios, scores } from '~/db/schema'

async function main() {
	console.log('🌱 Seeding database...')

	await reset(db, { characters, scenarios, scores })
	await seed(db, { scenarios, characters, scores }).refine((f) => ({
		scenarios: {
			count: 3,
		},
		characters: {
			columns: {
				minX: f.int({ minValue: 50, maxValue: 100 }),
				maxX: f.int({ minValue: 101, maxValue: 550 }),
				minY: f.int({ minValue: 50, maxValue: 100 }),
				maxY: f.int({ minValue: 101, maxValue: 550 }),
			},
		},
		scores: {
			count: 30,
		},
	}))

	console.log('🌱 Database seeded successfully!')
	process.exit(0)
}

main().catch((error) => {
	console.error('❌ Seeding failed:', error)
	process.exit(1)
})
