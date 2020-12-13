class MaterialController {
  
  constructor (Material) {
    this.Material = Material
  }
  findNecessaryMaterial (req, res, name) {
    let reg  = new RegExp(name)
    return this.Material.find({ name: { $regex: reg } }, { name: 1, quantity: 1, user: 1, _id: 0 })
            .then((resp) => res.send(resp))
            .catch(err => res.status(404).send(err.message))
  }
  search (req, res) {
    let name = req.query.name;
    let user = req.query.user;
    if (name) {
      return this.findNecessaryMaterial(req, res, name)
    }
  }
  create (req, res) {
    const material = new this.Material(req.body)
    return material.save()
      .then(() => res.status(201).send(material))
      .catch(err => res.status(422).send(err.message))
  }
  writeOff (req, res) {
    let query = {
      _id: req.params.id,
      quantity: { $gt: 0 }
    }
    let update = {
      "$push": { 
        writeOffs: {
          "quantity": req.body.quantity,
          "user": req.body.user
        } 
      },
      "$set": {
        $inc: { quantity: -req.body.quantity }
      }
      
    }
    let options = {
      returnNewDocument: true,
      useFindAndModify: false,
      upsert: true
    }
    return this.Material.findOneAndUpdate(query, update, options)
      .then((uptadedStock) => {
        console.log(uptadedStock)
        return res.send(uptadedStock)
      })
      .catch(err => res.status(404).send(err.message))
  }
  quantitySpendingByBaker (req, res, user) {
    let reg = new RegExp(user)
    return this.Material.find({ 'writeOffs.user': { $regex: reg } }, { name: 1, 'writeOffs.quantity': 1, quantity: 0, 'writeOffs.user': 1, _id: 1 })
            .then((resp) => res.send(resp))
            .catch(err => res.status(404).send(err.message))
  }
}

export default MaterialController