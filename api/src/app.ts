import express from 'express'
import config from '~/config'
import charactersRouter from './routers/characters.router'
import scenariosRouter from './routers/scenarios.router'

const app = express()
app.use(express.json())

app.get('/', (_, res) => {
	res.send('Hello World!')
})

app.use('/api/scenarios', scenariosRouter)
app.use('/api/characters', charactersRouter)

app.listen(config.port, () => {
	console.log(`Server is running on http://localhost:${config.port}`)
})
