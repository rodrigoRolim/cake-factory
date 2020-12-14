import express from 'express'
import MaterialController from '../controllers/material'
import Material from '../models/material'
import Order from '../models/order'
import OrderController from '../controllers/order'

const router = express.Router()
const orderController = new OrderController(Order)
const materialController = new MaterialController(Material, orderController)

router.post('/', (req, res) => materialController.create(req, res))
router.get('/', (req, res) => materialController.search(req, res))
router.put('/:id/request', (req, res) => materialController.check(req, res))

export default router
