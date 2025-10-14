import { Router } from 'express'
import { handle404 } from '~/middlewares/handle404'
import { handle500 } from '~/middlewares/handle500'
import { charactersRouter } from './charactersRouter'
import { scenariosRouter } from './scenariosRouter'
import { scoresRouter } from './scoresRouter'

export const indexRouter = Router()

indexRouter.use('/api/characters', charactersRouter)
indexRouter.use('/api/scenarios', scenariosRouter)
indexRouter.use('/api/scores', scoresRouter)
indexRouter.use(handle404)
indexRouter.use(handle500)
