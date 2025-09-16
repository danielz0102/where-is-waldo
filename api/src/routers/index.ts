import { Router } from 'express'
import { handle404 } from '~/middlewares/handle404'
import { charactersRouter } from './charactersRouter'
import { scenariosRouter } from './scenariosRouter'

export const indexRouter = Router()

indexRouter.use('/api/characters', charactersRouter)
indexRouter.use('/api/scenarios', scenariosRouter)
indexRouter.use(handle404)
