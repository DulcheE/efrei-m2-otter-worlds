import { Router } from 'express'

import isConnected from '../../middlewares/is-connected.js'
import passwordConfirmation from '../../middlewares/password-confirmation.js'
import { tryTo, emptyError } from '../../middlewares/errors.js'
import CharacterPolicy from '../../policies/character.policy.js'

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

const {
  canGetUniverse,
  canGetUniverseIndirect,
  canEditUniverseIndirect,
  isUser,
  isUserIndirect,
  verifyStat
} = require('../../middlewares/access-rights.js')

const canGet = canGetUniverseIndirect(CharacterPolicy.getUniverseId, 'id', 'params')
const canEditUniverse = canEditUniverseIndirect(CharacterPolicy.getUniverseId, 'id', 'params')
const canEditCharacter = isUserIndirect(CharacterPolicy.getUserId, 'id', 'params')

const router = Router()

// Get
router.get('/', tryTo(getCharacters, emptyError))
router.get('/:id', canGet, tryTo(getCharacter, emptyError))
router.get('/:id/groups', isConnected, canEditUniverse, tryTo(getCharacterGroups, emptyError))
router.get('/:id/inventories', canGet, tryTo(getCharacterInventories, emptyError))
router.get('/:id/stats', canGet, tryTo(getCharacterStats, emptyError))

// Post
router.post('/', isConnected, canGetUniverse('idUniverse', 'body'), isUser('idUser', 'body'), tryTo(postCharacter, emptyError))
router.post('/:id/groups', isConnected, canEditUniverse, tryTo(postCharacterGroup, emptyError))

// Put
router.put('/:id', isConnected, canEditCharacter, tryTo(putCharacter, emptyError))
router.put('/:id/stats', isConnected, canEditCharacter, verifyStat, tryTo(putCharacterStats, emptyError))

// Delete
router.delete('/:id', isConnected, canEditCharacter, passwordConfirmation, tryTo(deleteCharacter, emptyError))
router.delete('/:id/groups', isConnected, canEditUniverse, tryTo(deleteCharacterGroup, emptyError))

export default router
