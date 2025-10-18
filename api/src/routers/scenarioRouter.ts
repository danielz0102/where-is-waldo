import { Router } from 'express'
import { validate } from '~/middlewares/validate'
import { getScenarioSchema } from '~/schemas/scenarioSchemas'
import { ScenariosController } from '~controllers/ScenariosController'

export const scenarioRouter = Router()

scenarioRouter.get('/', ScenariosController.getAll)
scenarioRouter.get('/:id', validate(getScenarioSchema), ScenariosController.get)
