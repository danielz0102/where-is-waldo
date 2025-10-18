import { Router } from 'express'
import { validate } from '~/middlewares/validate'
import { validateCoordinates } from '~/middlewares/validateCoordinates'
import { getAllCharactersSchema } from '~/schemas/characterSchemas'
import { CharactersController } from '~controllers/CharactersController'

export const characterRouter = Router()

characterRouter.get(
	'/',
	validate(getAllCharactersSchema),
	CharactersController.getAll
)
characterRouter.get('/:id', CharactersController.get)
characterRouter.get(
	'/:id/click',
	validateCoordinates,
	CharactersController.checkClick
)
