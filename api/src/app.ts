import express from 'express'
import { PORT } from './config'
import { indexRouter } from './routers'

const app = express()
app.use(express.json())

app.use(indexRouter)

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
