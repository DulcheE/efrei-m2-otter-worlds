import { Router } from 'express'
import getInventories from './ctrl/get.inventories.js'
import getInventory from './ctrl/get.inventory.js'
import postInventory from './ctrl/post.inventory.js'
import putInventory from './ctrl/put.inventory.js'
import deleteInventory from './ctrl/delete.inventory.js'
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
