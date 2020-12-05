import { Router } from 'express'

import isConnected from '../../middlewares/is-connected.js'
import { tryTo, emptyError } from '../../middlewares/errors.js'
import InventoryPolicy from '../../policies/inventory.policy.js'
import CharacterPolicy from '../../policies/character.policy.js'

import getInventories from './ctrl/get.inventories.js'
import getInventory from './ctrl/get.inventory.js'
import postInventory from './ctrl/post.inventory.js'
import putInventory from './ctrl/put.inventory.js'
import deleteInventory from './ctrl/delete.inventory.js'

const {
  canGetUniverseIndirect,
  isUserIndirect
} = require('../../middlewares/access-rights.js')

const canGet = canGetUniverseIndirect(InventoryPolicy.getUniverseId, 'id', 'params')
const canAdd = isUserIndirect(CharacterPolicy.getUserId, 'idCharacter', 'body')
const canEdit = isUserIndirect(InventoryPolicy.getUserId, 'id', 'params')

const router = Router()

// Get
router.get('/', tryTo(getInventories, emptyError))
router.get('/:id', canGet, tryTo(getInventory, emptyError))

// Post
router.post('/', isConnected, canAdd, tryTo(postInventory, emptyError))

// Put
router.put('/:id', isConnected, canEdit, tryTo(putInventory, emptyError))

// Delete
router.delete('/:id', isConnected, canEdit, tryTo(deleteInventory, emptyError))

export default router
