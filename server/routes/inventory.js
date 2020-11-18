import { Router } from 'express'
import getInventories from '../controllers/inventory/get.inventories.js'
import getInventory from '../controllers/inventory/get.inventory.js'
import postInventory from '../controllers/inventory/post.inventory.js'
import putInventory from '../controllers/inventory/put.inventory.js'
import deleteInventory from '../controllers/inventory/delete.inventory.js'
const router = Router()

// Get
router.get('/', getInventories)
router.get('/:id', getInventory)

// Post
router.post('/', postInventory)

// Put
router.put('/:id', putInventory)

// Delete
router.delete('/:id', deleteInventory)

export default router
