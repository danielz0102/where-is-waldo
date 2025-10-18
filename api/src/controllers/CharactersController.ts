import type { Request, Response } from 'express'
import { CharacterModel } from '~models/CharacterModel'

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
			return CharacterModel.getAllFromScenario(scenarioId)
		}
		return CharacterModel.getAll()
	})()

	res.json(characters)
}

async function get(req: Request<{ id: string }>, res: Response) {
	const { id } = req.params
	const character = await CharacterModel.getById(id)

	if (!character) {
		return res.status(404).json({ error: 'Character not found' })
	}

	res.json(character)
}

async function checkClick(req: Request, res: Response) {
	const { x, y } = req.query
	const { id } = req.params

	if (!id) {
		return res.status(400).json({ error: 'Character ID is required' })
	}

	const hasBeenClicked = await CharacterModel.click({
		id,
		x: Number(x),
		y: Number(y),
	})

	res.json(hasBeenClicked)
}
