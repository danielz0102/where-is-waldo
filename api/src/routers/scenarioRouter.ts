import { Router } from 'express'
import { ScenariosController } from '~controllers/ScenariosController'

export const scenarioRouter = Router()

scenarioRouter.get('/', ScenariosController.getAll)
scenarioRouter.get('/:id', ScenariosController.get)
