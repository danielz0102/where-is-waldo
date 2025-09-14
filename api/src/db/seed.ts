import { reset, seed } from 'drizzle-seed'
import db from '.'
import { characters, scenarios } from './schema'

async function main() {
	console.log('🌱 Seeding database...')

	await reset(db, { characters, scenarios })
	await seed(db, { scenarios, characters }).refine((f) => ({
		characters: {
			columns: {
				minX: f.int({ minValue: 50, maxValue: 100 }),
				maxX: f.int({ minValue: 101, maxValue: 550 }),
				minY: f.int({ minValue: 50, maxValue: 100 }),
				maxY: f.int({ minValue: 101, maxValue: 550 }),
			},
		},
	}))

	console.log('🌱 Database seeded successfully!')
	process.exit(0)
}

main().catch((error) => {
	console.error('❌ Seeding failed:', error)
	process.exit(1)
})
