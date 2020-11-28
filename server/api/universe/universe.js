import { Router } from 'express'
import getUniverses from './ctrl/get.universes.js'
import getUniverse from './ctrl/get.universe.js'
import getUniverseCharacters from './ctrl/get.universe.characters.js'
import getUniverseUsersPlaying from './ctrl/get.universe.usersPlaying.js'
import postUniverse from './ctrl/post.universe.js'
import postUniverseInvitation from './ctrl/post.universe.invitation.js'
import putUniverse from './ctrl/put.universe.js'
import putUniverseUserRole from './ctrl/put.universe.userRole.js'
import deleteUniverse from './ctrl/delete.universe.js'
import deleteUniverseUser from './ctrl/delete.universe.kickUser.js'
const router = Router()

// Get
router.get('/', getUniverses)
router.get('/:id', getUniverse)
router.get('/:id/characters', getUniverseCharacters)
router.get('/:id/users-playing', getUniverseUsersPlaying)

// Post
router.post('/', postUniverse)
router.post('/:id/users-playing', postUniverseInvitation)

// Put
router.put('/:id', putUniverse)
router.put('/:id/users-playing', putUniverseUserRole)

// Delete
router.delete('/:id', deleteUniverse)
router.delete('/:id/users-playing', deleteUniverseUser)

export default router
