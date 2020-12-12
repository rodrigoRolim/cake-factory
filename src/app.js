import express from 'express'
import database from '../config/database'
import routes from './routes'

const configureExpress = () => {

  const app = express()
  app.use(express.json())
  app.use(express.urlencoded())
  app.use('/', routes)
  return app
}

export default () => database.connect().then(configureExpress)
