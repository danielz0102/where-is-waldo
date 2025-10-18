import { Router } from 'express'
import { validate } from '~/middlewares/validate'
import { getAllScoresSchema, postScoreSchema } from '~/schemas/scoreSchemas'
import { ScoreController } from '~controllers/ScoreController'

export const scoreRouter = Router()

scoreRouter.get(
	'/:scenarioId',
	validate(getAllScoresSchema),
	ScoreController.getAllByScenarioId
)
scoreRouter.post('/', validate(postScoreSchema), ScoreController.post)
