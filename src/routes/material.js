import express from 'express'
import MaterialController from '../controllers/material'
import Material from '../models/material'

const router = express.Router()
const materialController = new MaterialController(Material)

router.post('/', (req, res) => materialController.create(req, res))
router.get('/', (req, res) => materialController.search(req, res))
export default router
