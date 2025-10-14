import { Router } from 'express'
import { ScoreController } from '~controllers/ScoreController'

export const scoresRouter = Router()

scoresRouter.get('/:scenarioId', ScoreController.getAllFromScenario)
scoresRouter.post('/', ScoreController.newScore)
