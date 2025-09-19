import cors from 'cors'
import express from 'express'
import { CLIENT_ORIGIN, PORT } from './config'
import { indexRouter } from './routers'

const app = express()
app.use(express.json())
app.use(cors({ origin: CLIENT_ORIGIN }))

app.use(indexRouter)

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
