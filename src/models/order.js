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

var counter = mongoose.model('CounterOrder', counterSchema)

const orders = new mongoose.Schema({
  _id: Number,
  quantity: Number,
  user: String,
  material: {
    type: mongoose.Schema.Types.Number, ref: 'Material', unique: false
  },
  createdDate: { type: String, default: new Date().toISOString().split('T')[0] }
})

orders.pre('save', function (next) {
  var doc = this
  counter.findByIdAndUpdate({ _id: 'orderId' }, { $inc: { seq: 1 } }, { new: true, upsert: true, useFindAndModify: false })
    .then(function (count) {
      doc._id = count.seq
      next()
    })
    .catch(function (err) {
      throw err
    })
})

const Orders = mongoose.model('Orders', orders)

export default Orders
