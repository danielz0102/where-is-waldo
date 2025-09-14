import { seed } from 'drizzle-seed'
import db from '.'
import { characters, scenarios } from './schema'

async function main() {
	await seed(db, { scenarios, characters })
}

main()
