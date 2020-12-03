import Universe from '../../../models/universe.model'
import User from '../../../models/user.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUserUniverse (req, res) {
  const universe = await User.getUniverses(parseInt(req.params.id))
  res.status(200).json(Universe.asResourceList(baseAPI(req), universe, 'user' + req.url))
}
