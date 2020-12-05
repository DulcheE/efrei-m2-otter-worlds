import { Router } from 'express'

import isConnected from '../../middlewares/is-connected.js'
import passwordConfirmation from '../../middlewares/password-confirmation.js'
import { tryTo, emptyError } from '../../middlewares/errors.js'
import GroupPolicy from '../../policies/group.policy.js'

import getGroups from './ctrl/get.groups.js'
import getGroup from './ctrl/get.group.js'
import getGroupCharacters from './ctrl/get.group.characters.js'
import postGroup from './ctrl/post.group.js'
import putGroup from './ctrl/put.group.js'
import deleteGroup from './ctrl/delete.group.js'

const {
  canEditUniverse,
  canEditUniverseIndirect
} = require('../../middlewares/access-rights.js')

const canEdit = canEditUniverseIndirect(GroupPolicy.getUniverseId, 'id', 'params')

const router = Router()

// Get
router.get('/', tryTo(getGroups, emptyError))
router.get('/:id', isConnected, canEdit, tryTo(getGroup, emptyError))
router.get('/:id/characters', isConnected, canEdit, tryTo(getGroupCharacters, emptyError))

// Post
router.post('/', isConnected, canEditUniverse('idUniverse', 'body'), tryTo(postGroup, emptyError))

// Put
router.put('/:id', isConnected, canEdit, tryTo(putGroup, emptyError))

// Delete
router.delete('/:id', isConnected, canEdit, passwordConfirmation, tryTo(deleteGroup, emptyError))

export default router
