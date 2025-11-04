import { Router } from 'express'
import { validate } from '~/middlewares/validate'
import { getScenarioSchema } from '~/schemas/scenarioSchemas'
import { ScenarioController } from '~controllers/ScenarioController'

export const scenarioRouter = Router()

scenarioRouter.get('/', ScenarioController.getAll)
scenarioRouter.get(
	'/:slug',
	validate(getScenarioSchema),
	ScenarioController.get
)
