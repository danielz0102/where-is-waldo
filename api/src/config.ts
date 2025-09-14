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
const nodeEnv = envSchema.parse(process.env.NODE_ENV)

function getDbUrl(env: z.infer<typeof envSchema>) {
	if (env === 'development') return process.env.DEV_DB_URL
	if (env === 'testing') return process.env.TEST_DB_URL

	return process.env.PROD_DB_URL
}

export default configSchema.parse({
	port: process.env.PORT,
	nodeEnv,
	dbUrl: getDbUrl(nodeEnv),
})
