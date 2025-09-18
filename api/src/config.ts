import dotenv from 'dotenv'
import z from 'zod'

dotenv.config({ quiet: true })

const envSchema = z
	.enum(['development', 'production', 'testing'])
	.default('development')

const configSchema = z.object({
	PORT: z.coerce.number().default(3000),
	NODE_ENV: envSchema,
	DB_URL: z.url(),
})

const nodeEnv = envSchema.parse(process.env.NODE_ENV)

export const { PORT, DB_URL, NODE_ENV } = configSchema.parse({
	PORT: process.env.PORT,
	NODE_ENV: nodeEnv,
	DB_URL: getDbUrl(nodeEnv),
})

function getDbUrl(env: z.infer<typeof envSchema>) {
	if (env === 'development') return process.env.DEV_DB_URL
	if (env === 'testing') return process.env.TEST_DB_URL

	return process.env.PROD_DB_URL
}
