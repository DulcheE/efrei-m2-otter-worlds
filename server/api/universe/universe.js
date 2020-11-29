import { Router } from 'express'

import isConnected from '../../middlewares/is-connected.js'
import passwordConfirmation from '../../middlewares/password-confirmation.js'
import { tryTo, emptyError } from '../../middlewares/errors.js'

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

const {
  canGetUniverse,
  canEditUniverse,
  isUniverseOwner
} = require('../../middlewares/access-rights.js')

const canGet = canGetUniverse('id')
const canEdit = canEditUniverse('id')

const router = Router()

// Get
router.get('/', tryTo(getUniverses, emptyError))
router.get('/:id', canGet, tryTo(getUniverse, emptyError))
router.get('/:id/characters', canGet, tryTo(getUniverseCharacters, emptyError))
router.get('/:id/users-playing', canGet, isConnected, tryTo(getUniverseUsersPlaying, emptyError))

// Post
router.post('/', isConnected, tryTo(postUniverse, emptyError))
router.post('/:id/users-playing', isConnected, canEdit, tryTo(postUniverseInvitation, emptyError))

// Put
router.put('/:id', isConnected, canEdit, tryTo(putUniverse, emptyError))
router.put('/:id/users-playing', isConnected, canEdit, tryTo(putUniverseUserRole, emptyError))

// Delete
router.delete('/:id', isConnected, isUniverseOwner('id'), tryTo(deleteUniverse, emptyError))
router.delete('/:id/users-playing', isConnected, canEdit, passwordConfirmation, tryTo(deleteUniverseUser, emptyError))

export default router
