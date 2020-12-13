import mongoose from 'mongoose'

const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    default: 0
  }
})
var counter = mongoose.model('Counter', counterSchema)

const writeOff = new mongoose.Schema({
  _id: false,
  quantity: Number,
  user: String,
})

const material = new mongoose.Schema({
  _id: Number,
  name: String,
  quantity: Number,
  user: String,
  writeOffs: [writeOff],
  createdDate: { type: Date, default: Date.now }
})
material.pre('save', function (next) {
  var doc = this
  counter.findByIdAndUpdate({ _id: 'materialId' }, { $inc: { seq: 1 } }, { new: true, upsert: true, useFindAndModify: false })
    .then(function (count) {
      console.log()
      doc._id = count.seq
      next()
    })
    .catch(function (err) {
      throw err
    })
})
const Material = mongoose.model('Material', material)

export default Material
