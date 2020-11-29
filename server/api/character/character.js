import { Router } from 'express'
import getCharacters from './ctrl/get.characters.js'
import getCharacter from './ctrl/get.character.js'
import getCharacterGroups from './ctrl/get.character.groups.js'
import getCharacterInventories from './ctrl/get.character.inventories.js'
import getCharacterStats from './ctrl/get.character.stats.js'
import postCharacter from './ctrl/post.character.js'
import postCharacterGroup from './ctrl/post.character.group.js'
import putCharacter from './ctrl/put.character.js'
import putCharacterStats from './ctrl/put.character.stats.js'
import deleteCharacter from './ctrl/delete.character.js'
import deleteCharacterGroup from './ctrl/delete.character.group.js'
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
