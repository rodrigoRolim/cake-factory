class MaterialController {
  
  constructor (Material) {
    this.Material = Material
  }
  search (req, res) {
    let name = req.query.name;
  }
  create (req, res) {
    const material = new this.Material(req.body)
    return material.save()
      .then(() => res.status(201).send(material))
      .catch(err => res.status(422))
  }
  writeOff (req, res) {

  }
  quantitySpendingByBaker (req, res) {

  }
}

export default MaterialController