import { drizzle } from 'drizzle-orm/node-postgres'
import { DB_URL } from '~/config'

export default drizzle(DB_URL)
