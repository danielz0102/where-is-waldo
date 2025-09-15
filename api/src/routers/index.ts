import { Router } from 'express'
import { charactersRouter } from './characters.router'
import { scenariosRouter } from './scenarios.router'

export const indexRouter = Router()

indexRouter.use('/api/characters', charactersRouter)
indexRouter.use('/api/scenarios', scenariosRouter)
