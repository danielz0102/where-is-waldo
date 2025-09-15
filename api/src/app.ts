import express from 'express'
import config from './config'
import { indexRouter } from './routers'

const app = express()
app.use(express.json())

app.use(indexRouter)

app.listen(config.port, () => {
	console.log(`Server is running on http://localhost:${config.port}`)
})
