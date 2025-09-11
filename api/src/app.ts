import express from 'express'

const app = express()
app.use(express.json())

app.get('/', (_, res) => {
	res.send('Hello World!')
})

app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000')
})
