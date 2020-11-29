import { Router } from 'express'
import getGroups from './ctrl/get.groups.js'
import getGroup from './ctrl/get.group.js'
import getGroupCharacters from './ctrl/get.group.characters.js'
import postGroup from './ctrl/post.group.js'
import putGroup from './ctrl/put.group.js'
import deleteGroup from './ctrl/delete.group.js'
const router = Router()

// Get
router.get('/', getGroups)
router.get('/:id', getGroup)
router.get('/:id/characters', getGroupCharacters)

// Post
router.post('/', postGroup)

// Put
router.put('/:id', putGroup)

// Delete
router.delete('/:id', deleteGroup)

export default router
