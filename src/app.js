import express from 'express'
import database from '../config/database'

const configureExpress = () => {

  const app = express()
  app.use(express.json())
  app.use(express.urlencoded())

  return app
}

export default () => database.connect().then(configureExpress)
