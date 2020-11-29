import { Router } from 'express'

import isConnected from '../../middlewares/is-connected.js'
import passwordConfirmation from '../../middlewares/password-confirmation.js'
import { tryTo, emptyError } from '../../middlewares/errors.js'

import getUsers from './ctrl/get.users.js'
import getUser from './ctrl/get.user.js'
import getUserCharacters from './ctrl/get.user.characters'
import getUserGroups from './ctrl/get.user.groups'
import getUserUniverses from './ctrl/get.user.universes'
import getUserUniversesPlays from './ctrl/get.user.universesPlays'
import postUser from './ctrl/post.user.js'
import deleteUser from './ctrl/delete.user.js'

const {
  canGetUniverse,
  isUser
} = require('../../middlewares/access-rights.js')

const router = Router()

router.get('/', tryTo(getUsers, emptyError)) // no policy
router.get('/:id', tryTo(getUser, emptyError)) // no policy
router.get('/:id/characters', tryTo(getUserCharacters, emptyError)) // can see private universes
router.get('/:id/groups', canGetUniverse('idUniverse', 'body'), tryTo(getUserGroups, emptyError)) // can see universe
router.get('/:id/universes', tryTo(getUserUniverses, emptyError)) // can see private universes
router.get('/:id/universes-plays', tryTo(getUserUniversesPlays, emptyError)) // can see private universes
router.post('/', tryTo(postUser, emptyError))
router.delete('/:id', isConnected, isUser('id'), passwordConfirmation, tryTo(deleteUser, emptyError))

export default router
