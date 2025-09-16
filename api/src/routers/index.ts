import { Router } from 'express'
import { charactersRouter } from './charactersRouter'
import { scenariosRouter } from './scenariosRouter'

export const indexRouter = Router()

indexRouter.use('/api/characters', charactersRouter)
indexRouter.use('/api/scenarios', scenariosRouter)
