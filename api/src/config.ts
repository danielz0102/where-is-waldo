import dotenv from 'dotenv'
import z from 'zod'

dotenv.config()

const envSchema = z
	.enum(['development', 'production', 'testing'])
	.default('development')

const configSchema = z.object({
	port: z.coerce.number().default(3000),
	nodeEnv: envSchema,
	dbUrl: z.url(),
})

export default configSchema.parse({
	port: process.env.PORT,
	nodeEnv: process.env.NODE_ENV,
	dbUrl: process.env.DATABASE_URL,
})
