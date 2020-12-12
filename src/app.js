import express from 'express'

const configureExpress = () => {

  const app = express()
  app.use(express.json())
  app.use(express.urlencoded())

  return app
}

export default configureExpress()