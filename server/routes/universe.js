import { Router } from 'express'
import getUniverses from '../controllers/universe/get.universes.js'
import getUniverse from '../controllers/universe/get.universe.js'
import getUniverseCharacters from '../controllers/universe/get.universe.characters.js'
import getUniverseUsersPlaying from '../controllers/universe/get.universe.usersPlaying.js'
import postUniverse from '../controllers/universe/post.universe.js'
import postUniverseInvitation from '../controllers/universe/post.universe.invitation.js'
import putUniverse from '../controllers/universe/put.universe.js'
import putUniverseUserRole from '../controllers/universe/put.universe.userRole.js'
import deleteUniverse from '../controllers/universe/delete.universe.js'
import deleteUniverseUser from '../controllers/universe/delete.universe.kickUser.js'
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
