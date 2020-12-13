import express from 'express'
import materialRoutes from './material'
const  router = express.Router()

router.use('/rawMaterials', materialRoutes)

export default router
