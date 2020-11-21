import { Router } from 'express'
import getCharacters from '../controllers/character/get.characters.js'
import getCharacter from '../controllers/character/get.character.js'
import getCharacterGroups from '../controllers/character/get.character.groups.js'
import getCharacterInventories from '../controllers/character/get.character.inventories.js'
import getCharacterStats from '../controllers/character/get.character.stats.js'
import postCharacter from '../controllers/character/post.character.js'
import postCharacterGroup from '../controllers/character/post.character.group.js'
import putCharacter from '../controllers/character/put.character.js'
import putCharacterStats from '../controllers/character/put.character.stats.js'
import deleteCharacter from '../controllers/character/delete.character.js'
import deleteCharacterGroup from '../controllers/character/delete.character.group.js'
const router = Router()

// Get
router.get('/', getCharacters)
router.get('/:id', getCharacter)
router.get('/:id/groups', getCharacterGroups)
router.get('/:id/inventories', getCharacterInventories)
router.get('/:id/stats', getCharacterStats)

// Post
router.post('/', postCharacter)
router.post('/:id/groups', postCharacterGroup)

// Put
router.put('/:id', putCharacter)
router.put('/:id/stats', putCharacterStats)

// Delete
router.delete('/:id', deleteCharacter)
router.delete('/:id/groups', deleteCharacterGroup)

export default router
