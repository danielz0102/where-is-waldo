import { Router } from 'express'
import { ScenariosController } from '~controllers/ScenariosController'

export const scenariosRouter = Router()

scenariosRouter.get('/', ScenariosController.getAll)
scenariosRouter.get('/:id', ScenariosController.get)
