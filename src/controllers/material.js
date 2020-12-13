class MaterialController {
  
  constructor (Material) {
    this.Material = Material
  }
  search (req, res) {
    let name = req.query.name;
    let reg  = new RegExp(name)
    this.Material.find({ name: { $regex: reg } }, { name: 1, quantity: 1, user: 1, _id: 0 })
      .then((resp) => res.send(resp))
      .catch(err => res.status(404).send(err.message))
  }
  create (req, res) {
    const material = new this.Material(req.body)
    return material.save()
      .then(() => res.status(201).send(material))
      .catch(err => res.status(422).send(err.message))
  }
  writeOff (req, res) {

  }
  quantitySpendingByBaker (req, res) {

  }
}

export default MaterialController