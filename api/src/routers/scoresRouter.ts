import { Router } from 'express'
import { ScoreController } from '~controllers/ScoreController'

export const scoresRouter = Router()

scoresRouter.get('/:scenarioId', ScoreController.getAllByScenarioId)
scoresRouter.post('/', ScoreController.post)
