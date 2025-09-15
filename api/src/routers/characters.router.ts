import { Router } from 'express'

export const charactersRouter = Router()

charactersRouter.get('/', (_, res) => {
	res.send('List of characters')
})

charactersRouter.get('/:id', (req, res) => {
	const { id } = req.params
	const { x, y } = req.query

	if (x && y) {
		return res.send(
			`Character with ID: ${id} clicked at coordinates (${x}, ${y})`
		)
	}

	res.send(`Details of character with ID: ${id}`)
})
