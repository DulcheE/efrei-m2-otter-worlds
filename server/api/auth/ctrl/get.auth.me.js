import User from '../../../models/user.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getMe (req, res) {
  const id = req.session.idUser
  if (id === undefined || id <= 0) {
    res.status(404).send('user not connected !')
  } else {
    try {
      const user = await User.get(id)
      res.status(200).send(user.asResource(baseAPI(req)))
    } catch {
      res.sendStatus(500)
    }
  }
}
