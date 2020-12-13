import mongoose from 'mongoose'

const writeOff = new mongoose.Schema({
  quantity: Number,
  
}) 
const material = new mongoose.Schema({
  id: Number,
  name: String,
  quantity: Number,
  user: String,
  writeOffs: [],
  createdDate: { type: Date, default: Date.now }
})

/* schema.pre('save', function (next) {
  this.createDate = Date.now()
  next()
}) */
const Material = mongoose.model('Material', schema)

export default Material
