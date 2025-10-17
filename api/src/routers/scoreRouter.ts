import { Router } from 'express'
import { ScoreController } from '~controllers/ScoreController'

export const scoreRouter = Router()

scoreRouter.get('/:scenarioId', ScoreController.getAllByScenarioId)
scoreRouter.post('/', ScoreController.post)
