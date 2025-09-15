import express from 'express'
import { indexRouter } from '~routers/index'

export const app = express()
app.use(express.json())
app.use(indexRouter)
