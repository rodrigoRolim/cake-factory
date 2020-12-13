import express from 'express'
import MaterialController from '../controllers/material'
import Material from '../models/material'

const router = express.Router()
const materialController = new MaterialController(Material)

