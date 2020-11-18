import express from 'express'
import session from 'express-session'
import logger from 'morgan'
import config from './server.config.js'
// import mariadbStore from './mariadb-store.js'
import { apiRoute, apiRouter } from './routes/routes'

const app = express()
// mariadbStore.init(config.MARIADB)

app.use(logger('dev'))
app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(apiRoute, apiRouter)

export default app
