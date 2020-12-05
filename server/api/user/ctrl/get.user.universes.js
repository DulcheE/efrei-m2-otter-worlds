import Universe from '../../../models/universe.model'
import { baseAPI } from '../../routes.js'

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 */
export default async function getUserUniverses (req, res) {
  const universe = await Universe.getByUser(parseInt(req.params.id))
  res.status(200).json(Universe.asResourceList(baseAPI(req), universe, 'user' + req.url))
}
