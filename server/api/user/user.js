import { Router } from 'express'
import getUsers from './ctrl/get.users.js'
import getUser from './ctrl/get.user.js'
import getUserCharacters from './ctrl/get.user.characters'
import getUserGroups from './ctrl/get.user.groups'
import getUserUniverses from './ctrl/get.user.universes'
import getUserUniversesPlays from './ctrl/get.user.universesPlays'
import postUser from './ctrl/post.user.js'
import deleteUser from './ctrl/delete.user.js'
const router = Router()

router.get('/', getUsers) // no policy
router.get('/:id', getUser) // no policy
router.get('/:id/characters', getUserCharacters) // can see private universes
router.get('/:id/groups', getUserGroups) // can see universe
router.get('/:id/universes', getUserUniverses) // can see private universes
router.get('/:id/universes-plays', getUserUniversesPlays) // can see private universes
router.post('/', postUser)
router.delete('/', deleteUser)

export default router
