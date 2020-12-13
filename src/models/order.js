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
var counter = mongoose.model('CounterMaterial', counterSchema)

const orders = new mongoose.Schema({
  quantity: Number,
  user: String,
  material: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Material'
  },
  createdDate: { type: Date, default: Date.now }
})

orders.pre('save', function (next) {
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

const Orders = mongoose.model('Order', orders)

export default Orders