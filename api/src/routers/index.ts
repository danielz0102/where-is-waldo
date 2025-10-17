import { Router } from 'express'
import { handle404 } from '~/middlewares/handle404'
import { handle500 } from '~/middlewares/handle500'
import { characterRouter } from './characterRouter'
import { scenarioRouter } from './scenarioRouter'
import { scoreRouter } from './scoreRouter'

export const indexRouter = Router()

indexRouter.use('/api/characters', characterRouter)
indexRouter.use('/api/scenarios', scenarioRouter)
indexRouter.use('/api/scores', scoreRouter)
indexRouter.use(handle404)
indexRouter.use(handle500)
