import { Router } from 'express'
import { baseAPI } from '../routes.js'

import isConnected from '../../middlewares/is-connected.js'
import { tryTo, emptyError } from '../../middlewares/errors.js'

import getMe from './ctrl/get.auth.me.js'
import login from './ctrl/post.auth.login'
import logout from './ctrl/post.auth.logout'
import changePassword from './ctrl/put.auth.password.js'

const router = Router()

router.get('/', (req, res) => {
  res.json({
    _links: {
      me: `${baseAPI(req)}auth/me`,
      login: `${baseAPI(req)}auth/login`,
      logout: `${baseAPI(req)}auth/logout`,
      'change-password': `${baseAPI(req)}auth/change-password`
    }
  })
}) // no policy

router.get('/me', isConnected, tryTo(getMe, emptyError)) // is connected
router.post('/login', tryTo(login, emptyError))
router.post('/logout', isConnected, tryTo(logout, emptyError)) // is connected
router.post('/password/:id&:code', isConnected, tryTo(changePassword, emptyError)) // is connected

export default router
