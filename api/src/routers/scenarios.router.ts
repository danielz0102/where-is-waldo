import { Router } from 'express'
import { ScenariosController } from '~controllers/scenarios.controller'

export const scenariosRouter = Router()

scenariosRouter.get('/', ScenariosController.getAll)
scenariosRouter.get('/:id', ScenariosController.get)
