import { Router } from 'express'
import { validate } from '~/middlewares/validate'
import {
	clickCharacterSchema,
	getAllCharactersSchema,
	getCharacterSchema,
} from '~/schemas/characterSchemas'
import { CharactersController } from '~controllers/CharactersController'

export const characterRouter = Router()

characterRouter.get(
	'/',
	validate(getAllCharactersSchema),
	CharactersController.getAll
)
characterRouter.get(
	'/:id',
	validate(getCharacterSchema),
	CharactersController.get
)
characterRouter.get(
	'/:id/click',
	validate(clickCharacterSchema),
	CharactersController.checkClick
)
