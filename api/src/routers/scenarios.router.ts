import { Router } from 'express'

export const scenariosRouter = Router()

scenariosRouter.get('/', (_, res) => {
	res.send('List of scenarios')
})

scenariosRouter.get('/:id', (req, res) => {
	const { id } = req.params
	res.send(`Details of scenario with ID: ${id}`)
})
