import { Router } from 'express'
import getUsers from './ctrl/get.users.js'
import getMe from './ctrl/get.user.me.js'
import getUser from './ctrl/get.user.js'
import getUserCharacters from './ctrl/get.user.characters'
import getUserGroups from './ctrl/get.user.groups'
import getUserUniverses from './ctrl/get.user.universes'
import getUserUniversesPlays from './ctrl/get.user.universesPlays'
import postUser from './ctrl/post.user.js'
import putUser from './ctrl/put.user.js'
import deleteUser from './ctrl/delete.user.js'
import putPassword from './ctrl/put.user.password.js'
import login from './ctrl/post.login'
const router = Router()

router.get('/', getUsers)
router.get('/me', getMe)
router.get('/:id', getUser)
router.get('/:id/characters', getUserCharacters)
router.get('/:id/groups', getUserGroups)
router.get('/:id/universes', getUserUniverses)
router.get('/:id/universes-plays', getUserUniversesPlays)
router.post('/', postUser)
router.post('/login', login)
router.put('/:id', putUser)
router.put('/password/:id&:code', putPassword)
router.delete('/', deleteUser)

export default router
