import type { Request, Response } from 'express'
import { CharactersModel } from '~models/CharactersModel'

export const CharactersController = {
	getAll,
	get,
	checkClick,
}

async function getAll(
	req: Request<unknown, unknown, unknown, { scenarioId?: string }>,
	res: Response
) {
	const { scenarioId } = req.query

	const characters = await (() => {
		if (scenarioId) {
			return CharactersModel.getAllFromScenario(scenarioId)
		}
		return CharactersModel.getAll()
	})()

	res.json(characters)
}

async function get(req: Request, res: Response) {
	const { id } = req.params
	const character = await CharactersModel.get(id)

	if (!character) {
		return res.status(404).json({ error: 'Character not found' })
	}

	res.json(character)
}

async function checkClick(req: Request, res: Response) {
	const { x, y } = req.query
	const { id } = req.params

	const hasBeenClicked = await CharactersModel.hasBeenClicked(id, {
		x: Number(x),
		y: Number(y),
	})

	res.json(hasBeenClicked)
}
