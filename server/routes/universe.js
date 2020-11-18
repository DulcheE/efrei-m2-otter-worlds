import { Router } from 'express'
import getUniverses from '../controllers/universe/get.universes.js'
import getUniverse from '../controllers/universe/get.universe.js'
import getUniverseCharacters from '../controllers/universe/get.universe.characters.js'
import postUniverse from '../controllers/universe/post.universe.js'
import putUniverse from '../controllers/universe/put.universe.js'
import deleteUniverse from '../controllers/universe/delete.universe.js'
const router = Router()

// Get
router.get('/', getUniverses)
router.get('/:id', getUniverse)
router.get('/:id/characters', getUniverseCharacters)

// Post
router.post('/', postUniverse)

// Put
router.put('/:id', putUniverse)

// Delete
router.delete('/:id', deleteUniverse)

export default router
