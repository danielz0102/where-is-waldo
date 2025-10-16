import type { Request, Response } from 'express'
import { ScenarioRepository } from '~/repositories/ScenarioRepository'

export const ScenariosController = {
	getAll,
	get,
}

async function getAll(_: Request, res: Response) {
	const scenarios = await ScenarioRepository.getAll()
	res.json(scenarios)
}

async function get(req: Request<{ id: string }>, res: Response) {
	const { id } = req.params
	const scenario = await ScenarioRepository.getById(id)

	if (!scenario) {
		return res.status(404).json({ error: 'Scenario not found' })
	}

	res.json(scenario)
}
