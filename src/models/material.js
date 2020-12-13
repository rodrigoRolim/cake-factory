import mongoose from 'mongoose'

const writeOff = new mongoose.Schema({
  quantity: Number,
  user: String
})

const material = new mongoose.Schema({
  id: Number,
  name: String,
  quantity: Number,
  user: String,
  writeOffs: [writeOff],
  createdDate: { type: Date, default: Date.now }
})

const Material = mongoose.model('Material', schema)

export default Material
