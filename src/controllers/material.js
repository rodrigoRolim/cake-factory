class MaterialController {
  
  constructor (Material, OrderController) {
    this.Material = Material
    this.OrderController = OrderController
  }
  search (req, res) {
    let name = req.query.name;
    let user = req.query.user;
    if (name) {
      return this.getOrderByName(name)
        .then((resp) => res.send(resp))
        .catch(err => res.send(err))
    }
    if (user) {
      return this.OrderController.getOrderByUser(user)
        .then((resp) => res.send(resp))
        .catch(err => res.send(err))
    }
  }
  create (req, res) {
    const material = new this.Material(req.body)
    return material.save()
      .then(() => res.status(201).send({ message: "criado com sucesso"}))
      .catch(err => res.status(422).send(err.message))
  }
  async check (req, res) {

    if (await this.OrderController.addOrder(req, res)) {
      let query = {
        _id: req.params.id,
        quantity: { $gt: 0 }
      }
      let update = {     
        $inc: { quantity: -req.body.quantity }
      }
      let options = {
        returnNewDocument: true,
        useFindAndModify: false
      }
      return this.Material.findOneAndUpdate(query, update, options)
        .then((resp) => {
          if (!resp) {
            return res.status(400).send({ message: "this material not exist anymore"})
          }
          return res.status(200).send(resp)
        })
        .catch(err => res.status(500).send(err.message))
    } 
    return res.status(422)
  }
  getOrderByName (name) {
    let reg  = new RegExp(name)
    return this.Material.find({ name: { $regex: reg } }, { name: 1, quantity: 1, user: 1, _id: 0 })
            //.then((resp) => res.send(resp))
            //.catch(err => res.status(404).send(err.message))
  }
}

export default MaterialController