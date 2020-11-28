import { Router } from 'express'
import getUsers from '../controllers/user/get.users.js'
import getMe from '../controllers/user/get.user.me.js'
import getUser from '../controllers/user/get.user.js'
import getUserCharacters from '../controllers/user/get.user.characters'
import getUserGroups from '../controllers/user/get.user.groups'
import getUserUniverses from '../controllers/user/get.user.universes'
import getUserUniversesPlays from '../controllers/user/get.user.universesPlays'
import postUser from '../controllers/user/post.user.js'
import putUser from '../controllers/user/put.user.js'
import deleteUser from '../controllers/user/delete.user.js'
import putPassword from '../controllers/user/put.user.password.js'
import login from '../controllers/user/post.login'
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
