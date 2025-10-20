import { Router } from 'express'
import { validate } from '~/middlewares/validate'
import {
	clickCharacterSchema,
	getAllCharactersSchema,
	getCharacterSchema,
} from '~/schemas/characterSchemas'
import { CharacterController } from '~controllers/CharacterController'

export const characterRouter = Router()

characterRouter.get(
	'/',
	validate(getAllCharactersSchema),
	CharacterController.getAll
)
characterRouter.get(
	'/:id',
	validate(getCharacterSchema),
	CharacterController.get
)
characterRouter.get(
	'/:id/click',
	validate(clickCharacterSchema),
	CharacterController.checkClick
)
