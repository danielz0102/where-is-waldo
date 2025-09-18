import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import { DB_URL } from './src/config'

export default defineConfig({
	out: './drizzle',
	schema: './src/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: DB_URL,
	},
})
