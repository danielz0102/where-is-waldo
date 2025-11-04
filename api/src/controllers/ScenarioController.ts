import type { Request, Response } from 'express'
import { ScenarioModel } from '~models/ScenarioModel'

export const ScenarioController = {
	getAll,
	get,
}

async function getAll(_: Request, res: Response) {
	const scenarios = await ScenarioModel.getAll()
	res.json(scenarios)
}

async function get(req: Request<{ slug: string }>, res: Response) {
	const { slug } = req.params
	const scenario = await ScenarioModel.getBySlug(slug)

	if (!scenario) {
		return res.status(404).json({ error: 'Scenario not found' })
	}

	res.json(scenario)
}
