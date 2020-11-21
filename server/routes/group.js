import { Router } from 'express'
import getGroups from '../controllers/group/get.groups.js'
import getGroup from '../controllers/group/get.group.js'
import getGroupCharacters from '../controllers/group/get.group.characters.js'
import postGroup from '../controllers/group/post.group.js'
import putGroup from '../controllers/group/put.group.js'
import deleteGroup from '../controllers/group/delete.group.js'
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
