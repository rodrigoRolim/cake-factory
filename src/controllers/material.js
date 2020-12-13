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

  }
  quantitySpendingByBaker (req, res) {

  }
}

export default MaterialController