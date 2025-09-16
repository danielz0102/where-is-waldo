import { Router } from 'express'
import { validateCoordinates } from '~/middlewares/validateCoordinates'
import { CharactersController } from '~controllers/CharactersController'

export const charactersRouter = Router()

charactersRouter.get('/', CharactersController.getAll)
charactersRouter.get('/:id', CharactersController.get)
charactersRouter.get(
	'/:id/click',
	validateCoordinates,
	CharactersController.checkClick
)
