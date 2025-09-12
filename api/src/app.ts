import express from 'express'
import config from '~config'

const app = express()
app.use(express.json())

app.get('/', (_, res) => {
	res.send('Hello World!')
})

app.listen(config.port, () => {
	console.log(`Server is running on http://localhost:${config.port}`)
})
