import mongoose from 'mongoose'

const counter = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    default: 0
  }
})
const writeOff = new mongoose.Schema({
  quantity: Number,
  user: String
})

const material = new mongoose.Schema({
  _id: Number,
  name: String,
  quantity: Number,
  user: String,
  writeOffs: [writeOff],
  createdDate: { type: Date, default: Date.now }
})

const Material = mongoose.model('Material', material)

export default Material
