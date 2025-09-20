import type { Request, Response } from 'express'
import { ScenariosModel } from '~models/ScenariosModel'

export const ScenariosController = {
	getAll,
	get,
}

async function getAll(_: Request, res: Response) {
	const scenarios = await ScenariosModel.get()
	res.json(scenarios)
}

async function get(req: Request<{ id: string }>, res: Response) {
	const { id } = req.params
	const scenarios = await ScenariosModel.get({ id })

	if (scenarios.length === 0) {
		return res.status(404).json({ error: 'Scenario not found' })
	}

	res.json(scenarios[0])
}
