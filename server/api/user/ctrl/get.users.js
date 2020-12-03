import User from '../../../models/user.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUsers (req, res) {
  const users = await User.getAll()
  res.status(200).json(User.asResourceList(baseAPI(req), users))
}
