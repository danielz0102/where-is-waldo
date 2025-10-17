import { Router } from 'express'
import { validateCoordinates } from '~/middlewares/validateCoordinates'
import { CharactersController } from '~controllers/CharactersController'

export const characterRouter = Router()

characterRouter.get('/', CharactersController.getAll)
characterRouter.get('/:id', CharactersController.get)
characterRouter.get(
	'/:id/click',
	validateCoordinates,
	CharactersController.checkClick
)
