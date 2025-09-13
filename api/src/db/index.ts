import { drizzle } from 'drizzle-orm/node-postgres'
import config from '~/config'

export default drizzle(config.dbUrl)
