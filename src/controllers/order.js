class OrderController {

  constructor (Order) {
    this.Order = Order
  }
  addOrder (req, res) {
    return new Promise((resolve, reject) => {
    
      let objOrder = {
        quantity: req.body.quantity,
        user: req.body.user,
        material: req.params.id
      }
      let order = new this.Order(objOrder)
      order.save()
        .then(resolve(true))
        .catch(reject(false))
    })
   
  }
 
  getOrderByUser (user) {
    let reg = new RegExp(user)
    return this.Order.aggregate([
      {
        $lookup: {
          localField: "material",
          from: "materials",
          foreignField: "_id",
          as: "materials"  
        }
      },
      {
        $match: {
          "user": { $regex: reg }
        }
      },
      {
        $unwind: "$materials"
      },
      {
        $addFields: {
          name: "$materials.name" 
        }
      },
      {
        $project: {
          "__v": 0,
          "material": 0,
          "materials": 0
        }
      }
    ])
  }
}

export default OrderController