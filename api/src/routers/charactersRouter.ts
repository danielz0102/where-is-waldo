import { Router } from 'express'
import { CharactersController } from '~controllers/CharactersController'

export const charactersRouter = Router()

charactersRouter.get('/', CharactersController.getAll)
charactersRouter.get('/:id', CharactersController.get)
charactersRouter.get('/:id/click', CharactersController.checkClick)
