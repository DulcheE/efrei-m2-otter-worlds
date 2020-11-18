import { Router } from 'express'
import getUsers from '../controllers/user/get/get.users.js'
import getUser from '../controllers/user/get/get.user.js'
import postUser from '../controllers/user/post/post.user.js'
import putUser from '../controllers/user/put/put.user.js'
import deleteUser from '../controllers/user/delete/delete.user.js'
import putPassword from '../controllers/user/put/put.user.password.js'
import getUserCharacter from '../controllers/user/get/get.user.characters'
import login from '../controllers/user/post/post.login'
import getUserUniverse from '../controllers/user/get/get.user.universes'
const router = Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/:id/characters', getUserCharacter)
router.get('/:id/universes', getUserUniverse)
router.post('/', postUser)
router.post('/login', login)
router.put('/', putUser)
router.put('/password/:id&:code', putPassword)
router.delete('/', deleteUser)

export default router
