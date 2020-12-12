import mongoose from 'mongoose'

mongoose.Promise = Promise
const mongodURL = process.env.MONGODB_URL || 'mongodb://localhost/cake-factory'
const connect = () => mongoose.connect(mongodURL, { userNewUrlParser: true })

export default {
  connect
}